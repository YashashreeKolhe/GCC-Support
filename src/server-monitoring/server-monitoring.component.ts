import { Component } from '@angular/core';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';

@Component({
  selector: 'server-monitoring',
  templateUrl: './server-monitoring.component.html',
})
export class ServerMonitoringComponent {
  columnDefs: ColDef[];
  rowData: any[];
  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  ngOnInit() {
    this.configureGrid();
    this.rowData = [
      { 'Server': 'Backend', 'Link': 'https://dashboard.heroku.com/apps/gcc-2-support' },
      { 'Server': 'Web app', 'Link': 'https://dashboard.heroku.com/apps/gcc-2-support' },
      { 'Server': 'Monitoring', 'Link': 'https://dashboard.heroku.com/apps/gcc-2-support' }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
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
      {
        headerName: 'Server',
        field: 'Server',
        width: 400,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'Link to Heroku',
        field: 'Link',
        width: 500,
        cellRenderer: params => {
          return `<a href="${params.value}">${params.value}</a>`
        }
      },
    ];
  }
}
