import { Component } from '@angular/core';
import { GridOptions, GridApi, ColDef, Module } from 'ag-grid-community';

import { Participant } from './model';
import { ParticipantsService } from 'src/services/participants.service';
import { CommonService } from 'src/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'participants',
  templateUrl: './participants.component.html',
})
export class ParticipantsComponent {
  columnDefs: ColDef[];
  rowData: Participant[];
  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;
  participantsList: Participant[];
  selectedRegion: string;
  selectedUniversity: string;
  selectedBadge: string;
  universities: string[]= [];
  badges: string[];
  regions: string[];
  displayedRowCount: number;
  
  constructor(
    private participantsService: ParticipantsService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.toastr.info('Please select a region and then you can see universities in that region!', 'Info', { timeOut: 10000 });
    this.regions = this.commonService.loadRegions();
    this.badges = this.commonService.loadBadges();
    this.configureGrid();
    this.loadParticipants();
  }

  async loadParticipants() {
    this.participantsList = await this.participantsService.getParticipants().toPromise();
    this.rowData = this.participantsList;
    this.displayedRowCount = this.rowData.length;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  exportGrid() {
    this.gridApi.exportDataAsCsv({ fileName: 'participants.csv' });
  }

  clearFilter() {
    this.selectedRegion = 'None';
    this.selectedUniversity = 'None';
    this.selectedUniversity = 'None';
    this.rowData = this.participantsList;
    this.displayedRowCount = this.rowData.length;
  }

  async onRegionFilter() {
    if (this.selectedRegion === 'GLOBAL' || this.selectedRegion === '0') {
      this.rowData = this.participantsList;
    } else {
      this.rowData = this.participantsList.filter(participant => participant.region == this.selectedRegion);
    }
    //this.gridApi.setRowData(this.rowData);
    this.displayedRowCount = this.rowData.length;
    this.universities = await (await (await this.commonService.loadUniversities(this.selectedRegion).toPromise()).sort((a, b) => a.localeCompare(b)));
  }

  onUniversityFilter() {
    if (this.universities.length === 0) {
      this.toastr.error('Please select a region and then you can see universities in that region!', 'Error');
      return;
    }
    if (this.selectedUniversity === '0') {
      this.rowData = this.participantsList.filter(list => list.region == this.selectedRegion);
    } else {
      this.rowData = this.participantsList.filter(participant => participant.team == this.selectedUniversity);
    }
    //this.gridApi.setRowData(this.rowData);
    this.displayedRowCount = this.rowData.length;
  }

  onBadgeFilter() {
    this.rowData = this.participantsList.filter(participant => participant.badges.includes(this.selectedBadge));
    //this.gridApi.setRowData(this.rowData);
    this.displayedRowCount = this.rowData.length;
  }

  groupByUniversity() {
    this.configureGroupGrid();
  }

  configureGroupGrid() {
    this.gridOptions = {
      onGridReady: params => this.onGridReady(params),
      cacheQuickFilter: true,
      floatingFilter: true,
    }
    this.columnDefs = this.getColumnDefs();
    this.columnDefs.find(col => col.headerName === 'University').rowGroup = true;
    this.columnDefs.find(col => col.headerName === 'University').hide = true;
    this.defaultColDef = {
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      autoHeight: true
    };
  }

  configureGrid() {
    this.gridOptions = {
      onGridReady: params => this.onGridReady(params),
      cacheQuickFilter: true,
      floatingFilter: true,
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

  getColumnDefs(): ColDef[] {
    return [
      // {
      //   headerName: 'Rank',
      //   width: 100,
      //   hide: true,
      //   filter: false
      // },
      // {
      //   headerName: 'Contestant Id',
      //   field: 'id',
      //   width: 180,
      //   filter: 'agTextColumnFilter',
      //   editable: true
      // },
      {
        headerName: 'Contestant Name',
        field: 'name',
        width: 200,
        filter: 'agTextColumnFilter',
      },
      /* {
        headerName: 'Contestant Type',
        field: 'contestantType',
        width: 120,
        filter: 'agTextColumnFilter',
      }, */
      {
        headerName: 'Region',
        field: 'region',
        width: 100,
        filter: 'agTextColumnFilter',
        editable: true
      },
      {
        headerName: 'University',
        field: 'team',
        width: 250,
        filter: 'agTextColumnFilter',
        editable: true
      },
      {
        headerName: 'Course',
        field: 'course',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Graduation Year',
        field: 'graduationYear',
        width: 80,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Registered On',
        field: 'registeredAt',
        width: 150,
        cellRenderer: params => 
        { 
          return this.datePipe.transform(params.value,'yyyy-MM-dd')
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Git UserName',
        field: 'gitUsername',
        width: 120,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'level',
        field: 'level',
        width: 90,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Title',
        field: 'title',
        width: 80,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 220,
        filter: 'agTextColumnFilter',
      },
      // {
      //   headerName: 'Score',
      //   field: 'total',
      //   width: 100,
      //   filter: 'agTextColumnFilter',
      // },
      // {
      //   headerName: 'Badges',
      //   cellRenderer: params => {
      //     return params.value?.join(',');
      //   },
      //   width: 200,
      //   filter: 'agTextColumnFilter',
      // },
    ];
  }
}
