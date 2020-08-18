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
  selectedTab: string;
  
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
  faqsList: FAQ[];

  @ViewChild('FAQDetails') FAQDetails: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private faqsService: FaqsService) {}

  ngOnInit() {
    this.configureGrid();
    this.onTabChange('Questions');
  }

  async loadFAQs() {
    this.faqsList = await this.faqsService.getFaqs().toPromise();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  showDetails(faq: FAQ) {
    this.selectedFaq = JSON.parse(JSON.stringify(faq));
    this.mode = 2//update;
    this.modalRef = this.modalService.show(this.FAQDetails, { class: 'modal-lg' });
  }

  newFaq() {
    this.selectedFaq = null;
    this.mode = 1;
    this.modalRef = this.modalService.show(this.FAQDetails, { class: 'modal-lg' });
  }

  async onTabChange(tabTitle: string) {
    await this.loadFAQs();
    this.selectedTab = tabTitle;
    switch (tabTitle) {
      case 'Questions': {
        this.rowData = this.faqsList.filter(faq => faq.category === 'Questions');
        break;
      }
      case 'Registration': {
        this.rowData = this.faqsList.filter(faq => faq.category === 'Registration');
        break;
      }
      case 'Scores/Evaluation': {
        this.rowData = this.faqsList.filter(faq => faq.category === 'Scores/Evaluation');
        break;
      }
      case 'Others': {
        this.rowData = this.faqsList.filter(faq => faq.category === null || faq.category === '' || faq.category === 'Others');
        break;
      }
    }
    this.gridApi.setRowData(this.rowData);
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
        field: 'id',
        width: 100,
        hide: true,
        filter: false
      },
      {
        headerName: 'Question',
        field: 'question',
        width: 590,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'Answer',
        field: 'answer', 
        width: 590,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Category',
        field: 'category', 
        width: 170,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'AnsweredBy',
        field: 'answeredBy', 
        width: 250,
        filter: 'agTextColumnFilter',
      },
    ];
  }
}
