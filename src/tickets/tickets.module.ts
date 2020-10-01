import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ServicesModule } from '../services/services.module';
import { TicketsOverviewComponent } from './tickets-overview.component';
import { TicketDetailsComponent } from './ticket-details.component';

@NgModule({
  declarations: [
    TicketsOverviewComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ServicesModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    DatePipe
  ],
  exports: [
    TicketsOverviewComponent,
    TicketDetailsComponent
  ]
})
export class TicketsModule { }
