import { Component } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import{LIST,Name} from './score-model';
import {studentlist} from 'src/services/student.list'

@Component({
  selector: 'score',
  templateUrl: './score-overview.component.html',
 
})
export class scoreOverviewComponent {
  pageTitle:string='Live Score'
  tableHeader1 = 'Contestant'
  tableHeader2 = 'University'
  tableHeader3 = 'Region'
  tableHeader4 = 'Score'
  score;
  gridOptions: GridOptions;
  gridApi: GridApi;
  mode : number;
  columnDefs= [
    {headerName: 'Contestants', field: 'Contestant'},
    {headerName: 'University', field: 'University'},
    {headerName: 'Region', field: 'Region'},
    {headerName: 'Score', field: 'Score'}
  ];
  rowData:any;

  constructor(
    private studentlist:studentlist) {}

loaddata():LIST[]{
  return this.studentlist.getdata();
}

loadname():Name[]{
  return this.studentlist.getname();
}


loadscores(){
return this.studentlist.getscore();
}

Myfunction(dropdowntitle:string){
  console.log('here');


  switch(dropdowntitle){
  
  case 'Question1':{
    this.rowData = this.loaddata().filter(LIST => LIST.Category==='Question1')
    /*this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json');*/
  break
  }
  case 'Question2':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Question2');
    break
  }
  case 'Question3':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Question3');
    break
  }
  case 'Question4':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Question4');
    break
  }
  case 'Question5':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Question5');
    break
  }
  case 'Question6':{
    this.rowData= this.loaddata().filter(LIST => LIST.Category==='Question6');
    break
  }
  case 'Question7':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Question7');
    break
  }
  case 'Global':{
    this.rowData=this.loaddata().filter(LIST => LIST.Category==='Global');
    break
  }
  
  }

};


  dropdowns=[
  {id:1,
  title: 'Question1'},
  {id:2,
  title: 'Question2'},
  {id:3,
  title: 'Question3'},
  {id:4,
  title: 'Question4'},
  {id:5,
  title: 'Question5'},
  {id:6,
  title: 'Question6'},
  {id:7,
  title: 'Question7'},
  {id:8,
  title: 'Global'}
  ]


}

 



