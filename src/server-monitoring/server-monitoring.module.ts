import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

import { ServerMonitoringComponent } from './server-monitoring.component';

@NgModule({
  declarations: [
    ServerMonitoringComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  exports: [
    ServerMonitoringComponent
  ]
})
export class ServerMonitoringModule { }
