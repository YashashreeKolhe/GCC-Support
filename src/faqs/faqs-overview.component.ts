import { Component, ViewChild, TemplateRef } from '@angular/core';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FAQ, ITab } from './model';
import { FaqsService } from '../services/faqs.service';

@Component({
  selector: 'faqs-overview',
  templateUrl: './faqs-overview.component.html',
})
export class FaqsOverviewComponent {
  selectedFaq: FAQ;
  columnDefs: ColDef[];
  rowData: FAQ[];
  gridOptions: GridOptions;
  gridApi: GridApi;
  modalRef: BsModalRef;
  defaultColDef;
  mode: number;
  
  tabs: ITab[] = [
    {
      id: 1,
      title: 'Questions'
    }, 
    {
      id: 1,
      title: 'Scores/Evaluation'
    },
    {
      id: 1,
      title: 'Registration'
    },
    {
      id: 1,
      title: 'Others'
    }
  ];

  @ViewChild('FAQDetails') FAQDetails: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private faqsService: FaqsService) {}

  ngOnInit() {
    this.configureGrid();
    this.onTabChange('Questions');
  }

  loadFAQs(): FAQ[] {
    return this.faqsService.getFaqs();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  showDetails(faq: FAQ) {
    this.selectedFaq = faq;
    this.mode = 2//update;
    this.modalRef = this.modalService.show(this.FAQDetails, { class: 'modal-lg' });
  }

  newFaq() {
    this.selectedFaq = null;
    this.mode = 1;
    this.modalRef = this.modalService.show(this.FAQDetails, { class: 'modal-lg' });
  }

  onTabChange(tabTitle: string) {
    console.log('here');
    switch (tabTitle) {
      case 'Questions': {
        this.rowData = this.loadFAQs().filter(faq => faq.Category === 'Questions');
        break;
      }
      case 'Registration': {
        this.rowData = this.loadFAQs().filter(faq => faq.Category === 'Registration');
        break;
      }
      case 'Scores/Evaluation': {
        this.rowData = this.loadFAQs().filter(faq => faq.Category === 'Scores/Evaluation');
        break;
      }
      case 'Others': {
        this.rowData = this.loadFAQs().filter(faq => faq.Category === 'Others');
        break;
      }
    }
  }

  configureGrid() {
    this.gridOptions = {
      onGridReady:params => this.onGridReady(params),
      onRowDoubleClicked:params => this.showDetails(params.data),
      cacheQuickFilter: true,
      floatingFilter: true,
      getRowHeight:params => {
        return (
          params.api?.getSizesForCurrentTheme().rowHeight * 3
        );
      }
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
        headerName: 'Sr. No.',
        field: 'Id',
        width: 100,
        filter: false
      },
      {
        headerName: 'Question',
        field: 'Question',
        width: 400,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'Answer',
        field: 'Answer', 
        width: 400,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Category',
        field: 'Category', 
        width: 200,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'AnsweredBy',
        field: 'AnsweredBy', 
        width: 300,
        filter: 'agTextColumnFilter',
      },
    ];
  }
}
