import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FaqsService } from './faqs.service';
import {studentlist} from './student.list'
import { TicketsService } from './tickets.service';
import { AnalyticsService } from './analytics.service';

@NgModule({
 imports: [
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    FaqsService,
    studentlist,
    TicketsService,
    AnalyticsService
  ],
  exports: [
  ]
})
export class ServicesModule { }
