import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import {scoreOverviewComponent } from './score-overview.component';       
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    scoreOverviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
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
    scoreOverviewComponent
  ]
})
export class scoreModule { }
