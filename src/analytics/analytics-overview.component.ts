import { Component } from '@angular/core';

import { ITab } from './model';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { AnalyticsService } from 'src/services/analytics.service';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class AnalyticsOverviewComponent {
  activeTab: string = 'Global Statistics';
  
  tabs: ITab[] = [
    {
      id: 1,
      title: 'Global Statistics'
    },
    {
      id: 1,
      title: 'Questionwise Statistics'
    },
  ];

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  CorrectSubmissionsPerRegionChartData: MultiDataSet = [];
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
          let percentage = Math.round(value*100 / sum)+"%";
          return value + ' (' + percentage + ')';
        },
        font: {
          size: 14,
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
  ParticipationPerRegionLineChartData: ChartDataSets[] = [];
  ParticipationPerRegionLineChartLabels: Label[] = [];
  ParticipationPerRegionLineChartOptions: ChartOptions;
  ParticipationPerRegionLineChartColors: Color[] = [
    { 
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    }
  ];

  constructor(
    private analyticsService: AnalyticsService) { }
  
  ngOnInit() {
    this.prepareDoughnutChartForSubmissionsPerLanguage();
    this.prepareDoughnutChartForCorrectSubmissionsPerRegion();
    this.prepareBarChartForAttemptsPerQuestion();
    this.prepareBarChartForSubmissionsPerWeek();
    this.prepareLineCharForAcceptedVsRejectedSolutionsPerQuestion();
    this.prepareLineChartForParticipationPerRegion();
  }

  prepareLineChartForParticipationPerRegion() {
    const result = this.analyticsService.getParticipantsPerRegion();
    this.ParticipationPerRegionLineChartData.push({ data: result.map(region => region.Value), label: 'Participants' });
    result.forEach(region => {
      this.ParticipationPerRegionLineChartLabels.push(region.Region);
    });
    this.ParticipationPerRegionLineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
            // ticks: {
            //   suggestedMin: result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
            //     result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
            //   suggestedMax: result.map(week => week.Value).reduce((a, b)=>Math.max(a, b)) + 10
            // }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            size: 14,
          }
        }
      }
    };
  }

  prepareLineCharForAcceptedVsRejectedSolutionsPerQuestion() {
    const successful = this.analyticsService.getSuccessfulAttemptsPerQuestion();
    const rejected = this.analyticsService.getUnsuccessfulAttemptsPerQuestion();
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
            // ticks: {
            //   suggestedMin: result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
            //     result.map(week => week.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
            //   suggestedMax: result.map(week => week.Value).reduce((a, b)=>Math.max(a, b)) + 10
            // }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            size: 14,
          }
        }
      }
    };
  }

  prepareDoughnutChartForSubmissionsPerLanguage() {
    const result = this.analyticsService.getNumberOfSubmissionsPerLanguage();
    this.doughnutChartData.push(result.map(language => (language.Value)));
    result.forEach(language => {
      this.doughnutChartLabels.push(language.Language);
    });
  }

  prepareDoughnutChartForCorrectSubmissionsPerRegion() {
    const result2 = this.analyticsService.getCorrectSubmissionsPerRegion();
    this.CorrectSubmissionsPerRegionChartData.push(result2.map(region => (region.Value)));
    result2.forEach(region => {
      this.CorrectSubmissionsPerRegionChartLabels.push(region.Region);
    });
  }

  prepareBarChartForSubmissionsPerWeek() {
    const result = this.analyticsService.getNumberOfSubmissionsPerWeek();
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
            size: 14,
          }
        }
      }
    };
    this.SubmissionsPerWeekBarChartData.push({ data: result.map(question => question.Value), label: 'No. of Submissions'});
    result.forEach(week => {
      this.SubmissionsPerWeekBarChartLabels.push('Week '+ week.Week);
    });
  }

  prepareBarChartForAttemptsPerQuestion() {
    const result3 = this.analyticsService.getAttemptsPerQuestion();
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
            size: 14,
          }
        }
      }
    };
    this.AttemptsPerQuestionBarChartColors = [
      { backgroundColor: '#30475e' }
    ];
    this.AttemptsPerQuestionBarChartData.push({ data: result3.map(question => question.Value), label: 'No. of Attempts'});
    result3.forEach(question => {
      this.AttemptsPerQuestionBarChartLabels.push('Question '+ question.Question);
    });
  }
}
