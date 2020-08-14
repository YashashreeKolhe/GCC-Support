import { Component } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import{ITab} from './news-model';





@Component({
  selector: 'news',
  templateUrl: './news-overview.component.html',
 
})
export class newsOverviewComponent {
  activeTab:string='Latest from GCC';

    tabs: ITab[] = [
        {
          id: 1,
          title: 'Latest from GCC'
        },
        {
          id: 1,
          title: 'Videos'
        },
        {
          id: 1,
          title: 'Features'
        },
        {
            id: 1,
            title: 'Create Article'
          }
      ];
      rowData:any;
    
      MyFunction(checkboxtitle:string){
        console.log('here');

        switch(checkboxtitle){

          case  'Global':{
            this.rowData="https://turcotravel.com/wp-content/uploads/2015/03/cappadocia.jpg"
          }
        }
    

      }
    

  }

  
