import { Component } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color, ThemeService } from 'ng2-charts';
import { AnalyticsService } from 'src/services/analytics.service';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import { CommonService } from 'src/services/common.service';
import { ParticipantsService } from 'src/services/participants.service';
import { GradYearStats, UniversityStats } from './model';
import { DatePipe } from '@angular/common';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'registration-statistics',
  templateUrl: './registration-statistics.component.html',
  styleUrls: ['./analytics-overview.component.css']
})
export class RegistrationStatisticsComponent {
  gridApi: GridApi;
  defaultColDef;
  columnDefs: ColDef[];
  rowData: UniversityStats[];
  gridOptions: GridOptions;
  regions: string[];

  ContestantsPerGradYearBarChartData: ChartDataSets[] = [];
  ContestantsPerGradYearBarChartLabels: Label[] = [];
  ContestantsPerGradYearBarChartOptions: ChartOptions;
  ContestantsPerGradYearBarChartColors: Color[];

  ParticipationPerRegionBarChartData: ChartDataSets[] = [];
  ParticipationPerRegionBarChartLabels: Label[] = [];
  ParticipationPerRegionBarChartOptions: ChartOptions;
  ParticipationPerRegionBarChartColors: Color[] = [
    { 
      backgroundColor: '#829dff',
    }
  ];

  ChartPlugins: Chart.ChartPluginsOptions[];
  result: UniversityStats[];

  constructor(
    private analyticsService: AnalyticsService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    private participantsService: ParticipantsService) { }

  ngOnInit() {
    this.regions = this.commonService.loadRegions();
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
    this.prepareBarChartForContestantsPerGradYear();
    this.prepareBarChartForParticipationPerRegion();
    this.configureGrid();
    this.CalculateRegistrationsPerUniversity();
  }

  filterData(region: string) {
    if (region === 'GLOBAL') {
      this.rowData = this.result;
    } else {
      this.rowData = this.result.filter(univ => univ.Region === region);
      this.rowData = this.rowData.sort((a, b) => (a.University < b.University) ? -1 : 1);
    }
  }

  async CalculateRegistrationsPerUniversity() {
    const participantsList = await this.participantsService.getParticipants().toPromise();
    const uniqueEntry = participantsList.filter(
      (thing, i, arr) => arr.findIndex(t => t.team === thing.team) === i);
    this.result = [];
    uniqueEntry.forEach((entry) => {
      this.result.push({
        University: entry.team,
        Region: entry.region,
        Value: participantsList.filter(cont => cont.team === entry.team).length
      } as UniversityStats);
    });

    this.result = this.result.sort((a, b) => (a.Region < b.Region) ? -1 : 1);
    this.rowData = this.result;
  }

  async prepareBarChartForParticipationPerRegion() {
    const output = await this.analyticsService.getParticipantsPerRegion().toPromise();
    const regions = this.commonService.loadRegions().filter(reg => reg !== 'GLOBAL');
    const result2 = [];
    regions.forEach(region => {
      result2.push({ Region: region, Value: Object.keys(output).findIndex(reg => reg === region) >= 0 
        ? output[region] : 0});
    });
    console.log(result2);
    this.ParticipationPerRegionBarChartData.push({ data: result2.map(region => region.Value), label: 'No. of participants'});
    result2.forEach(region => {
      this.ParticipationPerRegionBarChartLabels.push(region.Region);
    });
    this.ParticipationPerRegionBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: result2.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 >= 0 ?
              result2.map(region => region.Value).reduce((a, b)=>Math.min(a, b)) - 10 : 0,
            suggestedMax: result2.map(region => region.Value).reduce((a, b)=>Math.max(a, b)) + 20
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

  async prepareBarChartForContestantsPerGradYear() {
    const participantsList = await this.participantsService.getParticipants().toPromise();
    var result = [];
    const uniqueEntry = participantsList.filter(
      (thing, i, arr) => arr.findIndex(t => t.graduationYear === thing.graduationYear) === i);
    uniqueEntry.forEach((graduationYear) => {
      result.push({
        GradYear: graduationYear.graduationYear,
        Value: participantsList.filter(cont => cont.graduationYear === graduationYear.graduationYear).length
      });
    });

    result = result.sort((a, b) => (a.GradYear < b.GradYear) ? -1 : 1);

    this.ContestantsPerGradYearBarChartData = [{ data: result.map(gradYear => gradYear.Value), label: 'No. of Participants' }];
    this.ContestantsPerGradYearBarChartLabels = [];
    result.forEach(gradYear => {
      this.ContestantsPerGradYearBarChartLabels.push(gradYear.GradYear);
    });
    this.ContestantsPerGradYearBarChartColors = [
      { backgroundColor: '#c4fb6d' }
    ];
    this.ContestantsPerGradYearBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: result.map(grad => grad.Value).reduce((a, b) => Math.min(a, b)) - 10 >= 0 ?
              result.map(grad => grad.Value).reduce((a, b) => Math.min(a, b)) - 10 : 0,
            suggestedMax: result.map(grad => grad.Value).reduce((a, b) => Math.max(a, b)) + 10
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

  configureGrid() {
    this.gridOptions = {
      cacheQuickFilter: true,
      floatingFilter: true,
      onGridReady: params => this.onGridReady(params)
    }
    this.columnDefs = this.getColumnDefs();
    this.defaultColDef = {
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      autoHeight: true
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'University Name',
        field: 'University',
        width: 400,
        filter: 'agTextColumnFilter',
        headerTooltip: 'University',
      },
      {
        headerName: 'Region',
        field: 'Region',
        width: 200,
        filter: 'agTextColumnFilter',
        headerTooltip: 'Region',
      },
      {
        headerName: 'Number of Registrations',
        field: 'Value',
        width: 200,
        filter: 'agTextColumnFilter',
      }
    ];
  }

  downloadParticipationPerRegion(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL("image/png");
    anchor.download = 'ParticipationPerRegion' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }

  downloadRegistrationsVsGradYrs(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
    anchor.download = 'RegistrationsVsGradYrs' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + '.png';
  }
}
