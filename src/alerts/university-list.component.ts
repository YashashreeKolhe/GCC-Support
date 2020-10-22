import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertsService } from 'src/services/alerts.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'university-list',
  templateUrl: './university-list.component.html',
})

export class UniversityListComponent {
  regions: string[];
  universityNames: string[];
  columnDefs: ColDef[];
  rowData;
  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;
  
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.regions = this.commonService.loadRegions().filter(i => i !== 'GLOBAL');
    this.onChangeRegion(this.regions[0]);
    this.configureGrid();
  }

  async onChangeRegion(region: string) {
    this.universityNames = await (await this.commonService.loadUniversities(region).toPromise()).sort((a, b) => a.localeCompare(b));
    this.rowData = this.universityNames.map(i => {
      return { name: i }
    });
  }

  configureGrid() {
    this.gridOptions = {
      onGridReady:params => this.onGridReady(params),
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

  onGridReady(params) {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'Sr. No.',
        valueGetter: "node.rowIndex + 1",
        width: 500,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'University Name',
        field: 'name',
        width: 500,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
    ];
  }
}