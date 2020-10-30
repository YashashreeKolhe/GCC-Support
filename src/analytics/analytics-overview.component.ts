import { Component } from '@angular/core';

import { ITab } from './model';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { AnalyticsService } from 'src/services/analytics.service';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class AnalyticsOverviewComponent {
  activeTab: number = 1;
  
  tabs: ITab[] = [
    {
      id: 1,
      title: 'Global Statistics'
    },
    {
      id: 2,
      title: 'Questionwise Statistics'
    },
    {
      id: 3,
      title: 'Registration Statistics'
    },
  ];
  ChartPlugins: Chart.ChartPluginsOptions[];

  doughnutChartLabels: Label[] = [];
  doughnutChartData: ChartDataSets[] = [];
  doughnutChartType: ChartType = 'doughnut';

  CorrectSubmissionsPerRegionChartData: ChartDataSets[] = [];
  CorrectSubmissionsPerRegionChartLabels: Label[] = [];
  
  AttemptsPerQuestionBarChartData: ChartDataSets[] = [];
  AttemptsPerQuestionBarChartLabels: Label[] = [];
  AttemptsPerQuestionBarChartOptions: ChartOptions;
  AttemptsPerQuestionBarChartColors: Color[];

  SubmissionsPerWeekBarChartData: ChartDataSets[] = [];
  SubmissionsPerWeekBarChartLabels: Label[] = [];
  SubmissionsPerWeekBarChartOptions: ChartOptions;
  SubmissionsPerWeekBarChartColors: Color[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          //let percentage = Math.round(value*100 / sum)+"%";
          return value //+ ' (' + percentage + ')';
        },
        font: {
          size: 12,
        }
      }
    }
  };

  AcceptedVsRejectedLineChartData: ChartDataSets[] = [];
  AcceptedVsRejectedLineChartLabels: Label[] = [];
  AcceptedVsRejectedLineChartOptions: ChartOptions;
  AcceptedVsRejectedLineChartColors: Color[] = [
    { 
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { 
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];
  ParticipationPerRegionBarChartData: ChartDataSets[] = [];
  ParticipationPerRegionBarChartLabels: Label[] = [];
  ParticipationPerRegionBarChartOptions: ChartOptions;
  ParticipationPerRegionBarChartColors: Color[] = [
    { 
      backgroundColor: '#829dff',
    }
  ];

  constructor(
    private analyticsService: AnalyticsService,
    private datePipe: DatePipe,
    private commonService: CommonService) { }
  
  async ngOnInit() {
    this.ChartPlugins = [{
      beforeDraw(chart, easing) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const top = 0;
  
        ctx.save();
        ctx.fillStyle = 'white';
  
        ctx.fillRect(chartArea.left - 80, top - 40, chartArea.right - chartArea.left + 160, chartArea.bottom - top + 80);
        ctx.restore();
      }
    }];
    this.prepareBarChartForSubmissionsPerWeek();
    this.prepareDoughnutChartForCorrectSubmissionsPerRegion();
    this.prepareBarChartForAttemptsPerQuestion();
    this.prepareDoughnutChartForSubmissionsPerLanguage();
    this.prepareLineCharForAcceptedVsRejectedSolutionsPerQuestion();
  }

  async prepareLineCharForAcceptedVsRejectedSolutionsPerQuestion() {
    const outputSuccess = await this.analyticsService.getSuccessfulAttemptsPerQuestion().toPromise();
    const outputReject = await this.analyticsService.getUnsuccessfulAttemptsPerQuestion().toPromise();

    var successful = [];
    var rejected = [];

    Object.keys(outputSuccess).forEach(question => {
      successful.push({ Question: question, Value: outputSuccess[question] });
    });
    Object.keys(outputReject).forEach(question => {
      rejected.push({ Question: question, Value: outputReject[question] });
    });
    this.AcceptedVsRejectedLineChartData = [];
    this.AcceptedVsRejectedLineChartLabels = [];
    this.AcceptedVsRejectedLineChartData.push({ data: successful.map(question => question.Value), label: 'Accepted Solutions' });
    this.AcceptedVsRejectedLineChartData.push({ data: rejected.map(question => question.Value), label: 'Rejected Solutions' });
    successful.forEach(question => {
      this.AcceptedVsRejectedLineChartLabels.push('Question ' + question.Question)
    });
    this.AcceptedVsRejectedLineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
        }]
      },
      // plugins: {
      //   backgroundColor: 'red',
      //   datalabels: {
      //     anchor: 'end',
      //     align: 'end',
      //     font: {
      //       size: 10,
      //     }
      //   }
      // }
      plugins: {
        datalabels: {
          color: 'grey',
          font: {
            size: 10
          },
          anchor: 'end',
          align: 'right',
        }
      }
    };
  }

  async prepareDoughnutChartForSubmissionsPerLanguage() {
    const output = await this.analyticsService.getNumberOfSubmissionsPerLanguage().toPromise();
    const languages = await this.commonService.loadLanguages();
    var result = [];
    languages.forEach(lang => {
      result.push({ Language: lang === 'CPLUSPLUS' ? 'C++' : (lang === 'CSHARP' ? 'C#' : lang), 
        Value: Object.keys(output).findIndex(language => language === lang) >= 0
      ? output[lang] : 0 });
    });
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    this.doughnutChartData.push({ data: result.map(language => (language.Value)), label: 'Submissions'});
    result.forEach(language => {
      this.doughnutChartLabels.push(language.Language);
    });
  }

  async prepareDoughnutChartForCorrectSubmissionsPerRegion() {
    const output = await this.analyticsService.getCorrectSubmissionsPerRegion().toPromise();
    const regions = this.commonService.loadRegions().filter(reg => reg !== 'GLOBAL');
    const result2 = [];
    regions.forEach(region => {
      result2.push({ Region: region, Value: Object.keys(output).findIndex(reg => reg === region) >= 0 
        ? output[region] : 0});
    });
    console.log(result2);
    this.CorrectSubmissionsPerRegionChartData = [];
    this.CorrectSubmissionsPerRegionChartLabels = [];
    this.CorrectSubmissionsPerRegionChartData.push({ data: result2.map(region => (region.Value)), label: 'Correct submissions' });
    result2.forEach(region => {
      this.CorrectSubmissionsPerRegionChartLabels.push(region.Region);
    });
  }

  async prepareBarChartForSubmissionsPerWeek() {
    const output = await this.analyticsService.getNumberOfSubmissionsPerWeek().toPromise();
    var result = [];
    Object.keys(output).forEach(element => {
      result.push({ Week: element, Value: output[element]});
    });
    if (Object.keys(output).length === 0) {
      result.push({ Week: 1, Value: 0});
      result.push({ Week: 2, Value: 0});
      result.push({ Week: 3, Value: 0});
      result.push({ Week: 4, Value: 0});
    }

    this.SubmissionsPerWeekBarChartColors = [
      { backgroundColor: '#c4fb6d' }
    ];
    this.SubmissionsPerWeekBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
              suggestedMin: result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
                result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
              suggestedMax: result.map(week => week.Value).reduce((a, b)=>Math.max(a, b)) + 10
            }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            size: 12,
          }
        }
      }
    };
    this.SubmissionsPerWeekBarChartData = [];
    this.SubmissionsPerWeekBarChartLabels = [];
    this.SubmissionsPerWeekBarChartData.push({ data: result.map(question => question.Value), label: 'No. of Submissions'});
    result.forEach(week => {
      this.SubmissionsPerWeekBarChartLabels.push('Week '+ week.Week);
    });
  }

  async prepareBarChartForAttemptsPerQuestion() {
    const output = await this.analyticsService.getAttemptsPerQuestion().toPromise();
    const result3 = [];
    for (let i = 0; i < 9; i++) {
      result3.push({ Question: i+1, Value: output[i+1] });
    }
    console.log(result3);
    this.AttemptsPerQuestionBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
              suggestedMin: result3.map(question => question.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
                result3.map(question => question.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
              suggestedMax: result3.map(question => question.Value).reduce((a, b)=>Math.max(a, b)) + 10
            }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            size: 12,
          }
        }
      }
    };
    this.AttemptsPerQuestionBarChartColors = [
      { backgroundColor: '#30475e' }
    ];
    this.AttemptsPerQuestionBarChartData = [];
    this.AttemptsPerQuestionBarChartLabels = [];
    this.AttemptsPerQuestionBarChartData.push({ data: result3.map(question => question.Value), label: 'No. of Attempts'});
    result3.forEach(question => {
      this.AttemptsPerQuestionBarChartLabels.push('Question '+ question.Question);
    });
  }

  downloadAcceptedVsRejected(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
    anchor.download = 'AcceptedVsRejected_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }

  downloadCorrectSubmissionsPerRegion(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL("image/png");
    anchor.download = 'CorrectSubmissionsPerRegion' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
  
  downloadAttemptsPerQuestion(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[2].toDataURL("image/png");
    anchor.download = 'AttemptsPerQuestion' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
  
  downloadNoOfSubmissionsPerLang(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[3].toDataURL("image/png");
    anchor.download = 'NoOfSubmissionsPerLang' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
  
  downloadNoOfSubmissionsPerWeek(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[4].toDataURL("image/png");
    anchor.download = 'NoOfSubmissionsPerWeek' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
}
