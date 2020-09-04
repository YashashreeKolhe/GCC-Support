import { Component } from '@angular/core';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { LIST } from './score-model';
import { studentlist } from 'src/services/student.list';

@Component({
  selector: 'score',
  templateUrl: './score-overview.component.html',

})
export class scoreOverviewComponent {
  gridApi: GridApi;
  defaultColDef;
  columnDefs: ColDef[];
  rowData: LIST[];
  gridOptions: GridOptions;
  studentdata: LIST[];
  selectedDropdown: string;

  dropdowns = [
    'Global',
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

  constructor(
    private studentlist: studentlist,
  ) { }

  ngOnInit() {
    this.configureGrid();
    this.filterData('Global');
  }

  async loaddata() {
    this.studentdata = await this.studentlist.getdata().toPromise();
    this.rowData = this.studentdata;
  }

  async refreshData() {
    this.filterData(this.selectedDropdown);
  }

  exportGrid() {
    this.gridApi.exportDataAsCsv({ fileName: 'scores.csv'});
  }

  async filterData(dropdowntitle: string) {
    this.selectedDropdown = dropdowntitle;
    this.configureGrid();
    await this.loaddata();
    if (dropdowntitle === 'Global') {
      const uniqueEntry: LIST[] = this.studentdata.filter(
        (thing, i, arr) => arr.findIndex(t => t.contestantId === thing.contestantId) === i);
      uniqueEntry.forEach((contestant) => {
        contestant.total = this.studentdata.filter(cont => cont.contestantId === contestant.contestantId)
        .map(x => x.total).reduce((a, b) => a + b);
      });
      this.rowData = uniqueEntry.sort((a, b) => (a.total > b.total) ? -1 : 1);
    } else {
      this.rowData = this.studentdata.
      filter(contestant => contestant.questionNumber === parseInt(dropdowntitle.replace('Question ', '')))
      .sort((a, b) => a.total > b.total ? -1 : 1 );
    }
  };

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
      // {
      //   headerName: 'Rank',
      //   cellRenderer : function (params) {
      //     return (parseInt(params.node.id) + 1).toString();
      //   },
      //   width: 100,
      //   filter: 'agTextColumnFilter',
      // },
      {
        headerName: 'Contestant',
        field: 'name',
        width: 300,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Region',
        field: 'region',
        width: 100,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'University',
        field: 'teamName',
        width: 350,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Total Score',
        field: 'total',
        width: 200,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Correct Submissions',
        field: 'correct',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
      {
        headerName: 'Incorrect Submissions',
        field: 'incorrect',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
      {
        headerName: 'Execution Score',
        field: 'executionTimeScore',
        width: 150,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
      {
        headerName: 'Memory Score',
        field: 'memoryScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
      {
        headerName: 'Test case Score',
        field: 'testCaseScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
      {
        headerName: 'Cyclo. complexity Score',
        field: 'cycloComplexityScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global'
      },
    ];

  }
}





