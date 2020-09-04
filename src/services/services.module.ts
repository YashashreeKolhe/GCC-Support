import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FaqsService } from './faqs.service';
import {studentlist} from './student.list'
import { TicketsService } from './tickets.service';
import { AnalyticsService } from './analytics.service';
import { featureService } from './features';
import { ParticipantsService } from './participants.service';
import { ArticleService } from './article.service';
import { CommonService } from './common.service';
import { GcchomeService } from './gcc-home.service';

@NgModule({
 imports: [
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    FaqsService,
    studentlist,
    TicketsService,
    AnalyticsService,
    featureService,
    ParticipantsService,
    ArticleService,
    CommonService,
    GcchomeService
],
  exports: [
  ]
})
export class ServicesModule { }
