import { Component, ViewChild, TemplateRef } from '@angular/core';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Ticket, ITab, Category, Status } from './model';
import { TicketsService } from 'src/services/tickets.service';
import { Name } from 'src/faqs/model';
import { CommonService } from 'src/services/common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tickets-overview',
  templateUrl: './tickets-overview.component.html',
})
export class TicketsOverviewComponent {
  selectedTicket: Ticket;
  columnDefs: ColDef[];
  rowData: Ticket[];
  gridOptions: GridOptions;
  gridApi: GridApi;
  modalRef: BsModalRef;
  defaultColDef;
  mode: number;
  names: Name[];
  statusValues: string[] = [ 'OPEN', 'IN_PROGRESS', 'ESCALATED', 'CLOSED' ];
  tabData: Ticket[];
  ticketsList: Ticket[];
  selectedTabId: number;

  isStatusCleared: boolean = true;
  isAssignedCleared: boolean = true;
  isEscalatedCleared: boolean = true;

  tabs: ITab[] = [
    {
      id: 1,
      title: 'Questions'
    },
    {
      id: 2,
      title: 'Scores/Evaluation'
    },
    {
      id: 3,
      title: 'Submissions'
    },
    {
      id: 4,
      title: 'Registration'
    },
    {
      id: 5,
      title: 'Others'
    },
    {
      id: 6,
      title: 'Unassigned'
    }
  ];

  @ViewChild('TicketDetails') TicketDetails: TemplateRef<any>;
  
  constructor(
    private modalService: BsModalService,
    private ticketsService: TicketsService,
    private commonService: CommonService,
    private datePipe: DatePipe) { }

  async ngOnInit() {
    this.names = this.commonService.loadNames();
    this.configureGrid();
    this.onTabChange(1, true);
  }

  async loadTickets() {
    this.ticketsList = await this.ticketsService.getTickets().toPromise();
  }

  onChangeAssignedTo(name: string) {
    this.rowData = JSON.parse(JSON.stringify(this.tabData.filter(ticket => ticket.assignee === name)));
    this.isEscalatedCleared = true;
    this.isAssignedCleared = false;
    this.isStatusCleared = true;
  }

  onChangeEscalatedTo(name: string) {
    this.rowData = JSON.parse(JSON.stringify(this.tabData.filter(ticket => ticket.escalatedTo === name)));
    this.isEscalatedCleared = false;
    this.isAssignedCleared = true;
    this.isStatusCleared = true;
  }

  onChangeStatus(status: string) {
    this.rowData = JSON.parse(JSON.stringify(this.tabData.filter(ticket => ticket.ticketStatus === status)));
    this.isEscalatedCleared = true;
    this.isAssignedCleared = true;
    this.isStatusCleared = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  showDetails(ticket: Ticket) {
    this.selectedTicket = JSON.parse(JSON.stringify(ticket));
    this.mode = 2; // update
    this.modalRef = this.modalService.show(this.TicketDetails, { class: 'modal-xl' });
  }

  newFaq() {
    this.selectedTicket = null;
    this.mode = 1;
    this.modalRef = this.modalService.show(this.TicketDetails, { class: 'modal-xl' });
  }

  async onTabChange(tabId: number, reload: boolean) {
    const tabTitle = this.tabs.find(element => element.id === tabId).title;
    this.selectedTabId = tabId;

    if (reload) {
      await this.loadTickets();
    }
    switch (tabTitle) {
      case 'Questions': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Questions');
        break;
      }
      case 'Registration': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Registration');
        break;
      }
      case 'Scores/Evaluation': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Scores/Evaluation');
        break;
      }
      case 'Submissions': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Submissions');
        break;
      }
      case 'Others': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Others');
        break;
      }
      case 'Unassigned': {
        this.rowData = this.ticketsList.filter(ticket => ticket.category === 'Unassigned' || 
        ticket.category === null || ticket.category === '');
        break;
      }
    }
    this.tabData = JSON.parse(JSON.stringify(this.rowData));
  }

  clearFilters(tab: number) {
    this.onTabChange(tab, false);
    this.isEscalatedCleared = true;
    this.isAssignedCleared = true;
    this.isStatusCleared = true;
  }

  configureGrid() {
    this.gridOptions = {
      onGridReady: params => this.onGridReady(params),
      onRowDoubleClicked: params => this.showDetails(params.data),
      cacheQuickFilter: true,
      floatingFilter: true,
      getRowHeight: params => {
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
        headerName: 'Ticket Id',
        field: 'id',
        width: 170,
        filter: false
      },
      // {
      //   headerName: 'Subject',
      //   field: 'subject',
      //   width: 150,
      //   filter: 'agTextColumnFilter',
      //   cellStyle: { 'white-space': 'normal' }
      // },
      {
        headerName: 'Submitted By',
        field: 'email',
        width: 160,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Submitted On',
        field: 'submittedDate',
        width: 120,
        cellRenderer: params => 
        { 
          return this.datePipe.transform(params.value,'yyyy-MM-dd')
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 120,
        filter: 'agTextColumnFilter',
        valueFormatter: params => {
          return Status[params.value]
        }
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 300,
        filter: 'agTextColumnFilter',
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: 'Answer',
        field: 'answer',
        width: 300,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Assigned To',
        field: 'assignee',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'EscalatedTo',
        field: 'escalatedTo',
        width: 150,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Status',
        field: 'ticketStatus',
        width: 100,
        filter: 'agTextColumnFilter',
        valueFormatter: params => {
          return Status[params.value]
        },
      },
    ];
  }
}
