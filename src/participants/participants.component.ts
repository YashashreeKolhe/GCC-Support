import { Component } from '@angular/core';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';

import { Participant } from './model';
import { ParticipantsService } from 'src/services/participants.service';
import { CommonService } from 'src/services/common.service';
import { ToastrService } from 'ngx-toastr';

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
 
  constructor(
    private participantsService: ParticipantsService,
    private commonService: CommonService,
    private toastr: ToastrService) { }

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
  }

  async onRegionFilter() {
    this.rowData = this.participantsList.filter(participant => participant.region == this.selectedRegion);
    this.gridApi.setRowData(this.rowData);
    this.universities = await this.commonService.loadUniversities(this.selectedRegion).toPromise();
  }

  onUniversityFilter() {
    if (this.universities.length === 0) {
      this.toastr.error('Please select a region and then you can see universities in that region!', 'Error');
      return;
    }
    this.rowData = this.participantsList.filter(participant => participant.team == this.selectedUniversity);
    this.gridApi.setRowData(this.rowData);
  }

  onBadgeFilter() {
    this.rowData = this.participantsList.filter(participant => participant.badges.includes(this.selectedBadge));
    this.gridApi.setRowData(this.rowData);
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
      //   field: 'contestantId',
      //   width: 200,
      //   filter: 'agTextColumnFilter',
      //   cellStyle: { 'white-space': 'normal' }
      // },
      {
        headerName: 'Contestant/Team Name',
        field: 'name',
        width: 300,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Contestant Type',
        field: 'contestantType',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Region',
        field: 'region',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'University',
        field: 'team',
        width: 300,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Score',
        field: 'total',
        width: 100,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Course',
        field: 'course',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Git UserName',
        field: 'gitUsername',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 200,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Badges',
        cellRenderer: params => {
          return params.data.badges?.join(',');
        },
        width: 200,
        filter: 'agTextColumnFilter',
      },
    ];
  }
}
