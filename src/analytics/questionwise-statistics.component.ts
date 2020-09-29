import { Component } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color, ThemeService } from 'ng2-charts';
import { AnalyticsService } from 'src/services/analytics.service';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import { CommonService } from 'src/services/common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'questionwise-statistics',
  templateUrl: './questionwise-statistics.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class QuestionwiseStatisticsComponent {
  questions: string[] = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
  ];

  NoOfSubmissionsPerLanguageChartData: MultiDataSet = [];
  NoOfSubmissionsPerLanguageChartLabels: Label[] = [];
  NoOfSubmissionsPerLanguageChartType: ChartType = 'doughnut';
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
  ChartPlugins: Chart.ChartPluginsOptions[];

  barChartLegend = true;
  CorrectSubmissionsPerRegionBarChartData: ChartDataSets[] = [];
  CorrectSubmissionsPerRegionBarChartLabels: Label[] = [];
  CorrectSubmissionsPerRegionBarChartOptions: ChartOptions;
  CorrectSubmissionsPerRegionBarChartColors: Color[];
  barChartType: ChartType = 'bar';
  
  SuccessfulSubmissionsPerWeekLineChartData: ChartDataSets[] = [];
  SuccessfulSubmissionsPerWeekLineChartLabels: Label[] = [];
  SuccessfulSubmissionsPerWeekLineChartOptions: ChartOptions;
  SuccessfulSubmissionsPerWeekLineChartColors: Color[] = [
    { 
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    }
  ];

  constructor(
    private analyticsService: AnalyticsService,
    private commonService: CommonService,
    private datePipe: DatePipe) { }
  
  ngOnInit() {
    this.loadStatsForQuestion('Question 1');
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
  }

  loadStatsForQuestion(question: string) {
    this.prepareLineChartForSuccessfulSubmissionsPerWeek(question);
    this.prepareDoughnutChartForNoOfSubmissionsPerLanguage(question);
    this.prepareBarChartForCorrectSubmissionsPerRegion(question);
    
  }

  onQuestionChange(question: string) {
    this.loadStatsForQuestion(question);
  }

  async prepareLineChartForSuccessfulSubmissionsPerWeek(question: string) {
    const output = await this.analyticsService.getSuccessfulSubmissionsPerWeek(question.replace('Question ', '')).toPromise();
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
    this.SuccessfulSubmissionsPerWeekLineChartData = [];
    this.SuccessfulSubmissionsPerWeekLineChartData.push({ data: result.map(question => question.Value), label: 'No. of Submissions'});
    this.SuccessfulSubmissionsPerWeekLineChartLabels = [];
    result.forEach(week => {
      this.SuccessfulSubmissionsPerWeekLineChartLabels.push('Week '+ week.Week);
    });
    this.SuccessfulSubmissionsPerWeekLineChartOptions = {
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
          align: 'right',
          font: {
            size: 12,
          }
        }
      }
    };
  }

  async prepareDoughnutChartForNoOfSubmissionsPerLanguage(question: string) {
    const output = await this.analyticsService.getNoOfSubmissionsPerLanguage(question.replace('Question ', '')).toPromise();
    const languages = await this.commonService.loadLanguages();
    var result = [];
    languages.forEach(lang => {
      result.push({ Language: lang === 'CPLUSPLUS' ? 'C++' : (lang === 'CSHARP' ? 'C#' : lang), 
        Value: Object.keys(output).findIndex(language => language === lang) >= 0
      ? output[lang] : 0 });
    });
    this.NoOfSubmissionsPerLanguageChartData = [];
    this.NoOfSubmissionsPerLanguageChartLabels = [];
    this.NoOfSubmissionsPerLanguageChartData.push(result.map(language => (language.Value)));
    result.forEach(language => {
      this.NoOfSubmissionsPerLanguageChartLabels.push(language.Language);
    });
  }

  async prepareBarChartForCorrectSubmissionsPerRegion(question: string) {
    const output = await this.analyticsService.getCorrectSubmissionsPerRegion().toPromise();
    const regions = this.commonService.loadRegions().filter(reg => reg !== 'GLOBAL');
    const result2 = [];
    regions.forEach(region => {
      result2.push({ Region: region, Value: Object.keys(output).findIndex(reg => reg === region) >= 0 
        ? output[region] : 0});
    });
    console.log(result2);
    this.CorrectSubmissionsPerRegionBarChartData = [{ data: result2.map(region => region.Value), label: 'Correct Submissions'}];
    this.CorrectSubmissionsPerRegionBarChartLabels = [];
    result2.forEach(region => {
      this.CorrectSubmissionsPerRegionBarChartLabels.push(region.Region);
    });
    this.CorrectSubmissionsPerRegionBarChartColors = [
      { backgroundColor: '#c4fb6d' }
    ];
    this.CorrectSubmissionsPerRegionBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
              suggestedMin: result2.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
                result2.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
              suggestedMax: result2.map(region => region.Value).reduce((a, b)=>Math.max(a, b)) + 10
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
  }

  downloadSuccSubsPerWeek(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
    anchor.download = 'SuccessfulSubmissionsPerWeek' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
  
  downloadSubsPerLanguage(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL("image/png");
    anchor.download = 'SubmissionsPerLanguage' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
  
  downloadCorrectSubsPerRegion(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[2].toDataURL("image/png");
    anchor.download = 'CorrectSubmissionsPerRegion' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
}
