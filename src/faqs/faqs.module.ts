import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FaqsOverviewComponent } from './faqs-overview.component';
import { NewFaqComponent } from './new-faq.component';

@NgModule({
  declarations: [
    FaqsOverviewComponent,
    NewFaqComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
  providers: [],
  exports: [
    FaqsOverviewComponent,
    NewFaqComponent
  ]
})
export class FaqsModule { }
