import { Component } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color, ThemeService } from 'ng2-charts';
import { AnalyticsService } from 'src/services/analytics.service';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

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
          let percentage = Math.round(value*100 / sum)+"%";
          return value + ' (' + percentage + ')';
        },
        font: {
          size: 14,
        }
      }
    }
  };
  
  CorrectSubmissionsPerRegionBarChartData: ChartDataSets[] = [];
  CorrectSubmissionsPerRegionBarChartLabels: Label[] = [];
  CorrectSubmissionsPerRegionBarChartOptions: ChartOptions;
  CorrectSubmissionsPerRegionBarChartColors: Color[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

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
    private analyticsService: AnalyticsService) { }
  
  ngOnInit() {
    this.loadStatsForQuestion('Question 1');
  }

  loadStatsForQuestion(question: string) {
    this.prepareLineChartForSuccessfulSubmissionsPerWeek(question);
    this.prepareDoughnutChartForNoOfSubmissionsPerLanguage(question);
    this.prepareBarChartForCorrectSubmissionsPerRegion(question);
    
  }

  onQuestionChange(question: string) {
    this.loadStatsForQuestion(question);
  }

  prepareLineChartForSuccessfulSubmissionsPerWeek(question: string) {
    const result = this.analyticsService.getSuccessfulSubmissionsPerWeek(question);
    this.SuccessfulSubmissionsPerWeekLineChartData = [{ data: result.map(week => week.Value), label: 'Successful submissions' }];
    this.SuccessfulSubmissionsPerWeekLineChartLabels = [];
    result.forEach(week => {
      this.SuccessfulSubmissionsPerWeekLineChartLabels.push('Week ' + week.Week);
    });
    this.SuccessfulSubmissionsPerWeekLineChartOptions = {
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

  prepareDoughnutChartForNoOfSubmissionsPerLanguage(question: string) {
    const result2 = this.analyticsService.getNoOfSubmissionsPerLanguage(question);
    this.NoOfSubmissionsPerLanguageChartData = [result2.map(lang => (lang.Value))];
    this.NoOfSubmissionsPerLanguageChartLabels = [];
    result2.forEach(lang => {
      this.NoOfSubmissionsPerLanguageChartLabels.push(lang.Language);
    });
  }

  prepareBarChartForCorrectSubmissionsPerRegion(question: string) {
    const result = this.analyticsService.getCorrectSubmissionsPerRegionForQuestion(question);
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
              suggestedMin: result.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
                result.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
              suggestedMax: result.map(region => region.Value).reduce((a, b)=>Math.max(a, b)) + 10
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
    this.CorrectSubmissionsPerRegionBarChartData = [{ data: result.map(region => region.Value), label: 'Correct Submissions'}];
    this.CorrectSubmissionsPerRegionBarChartLabels = [];
    result.forEach(region => {
      this.CorrectSubmissionsPerRegionBarChartLabels.push(region.Region);
    });
  }
}
