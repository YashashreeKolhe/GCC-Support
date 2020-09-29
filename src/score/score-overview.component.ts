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
  ) {}



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
    this.gridApi.exportDataAsCsv({ fileName: 'scores.csv' });
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
        .sort((a, b) => a.total > b.total ? -1 : 1);
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
        width: 270,
        filter: 'agTextColumnFilter',
        headerTooltip: 'Contestant',


      },
      {
        headerName: 'Region',
        field: 'region',
        width: 100,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' },
        headerTooltip: 'Region',
      },
      {
        headerName: 'University',
        field: 'teamName',
        width: 300,
        filter: 'agTextColumnFilter',
        headerTooltip: 'University',
      },
      {
        headerName: 'Total Score',
        field: 'total',
        width: 170,
        filter: 'agTextColumnFilter',
        headerTooltip: 'Total Score',

        valueFormatter: params => params.data.total.toFixed(2)
      },
      {
        headerName: 'Correct Submissions',
        field: 'correct',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Correct Submissions',

        valueFormatter: params => params.data.total.toFixed(2)

      },
      {
        headerName: 'Incorrect Submissions',
        field: 'incorrect',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Correct Submissions',
        valueFormatter: params => params.data.incorrect.toFixed(2)

      },
      {
        headerName: 'Execution Score',
        field: 'executionTimeScore',
        width: 150,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Execution Score',
        valueFormatter: params => params.data.executionTimeScore.toFixed(2)


      },
      {
        headerName: 'Memory Score',
        field: 'memoryScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Memory Score',

        valueFormatter: params => params.data.memoryScore.toFixed(2)

      },
      {
        headerName: 'Test case Score',
        field: 'testCaseScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Test case Score',
        valueFormatter: params => params.data.testCaseScore.toFixed(2)

      },
      {
        headerName: 'Cyclo. complexity Score',
        field: 'cycloComplexityScore',
        width: 100,
        filter: 'agTextColumnFilter',
        hide: this.selectedDropdown === 'Global',
        headerTooltip: 'Cyclomatic complexity Score',
        valueFormatter: params => params.data.cycloComplexityScore.toFixed(2)

      },
    ];
  }
}








