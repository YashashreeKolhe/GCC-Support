import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';

import { ServicesModule } from '../services/services.module';
import { AnalyticsOverviewComponent } from '../analytics/analytics-overview.component';
import { QuestionwiseStatisticsComponent } from '../analytics/questionwise-statistics.component';
import { RegistrationStatisticsComponent } from '../analytics/registration-statistics.component';

@NgModule({
  declarations: [
    AnalyticsOverviewComponent,
    QuestionwiseStatisticsComponent,
    RegistrationStatisticsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ServicesModule,
    ChartsModule,
  ],
  providers: [DatePipe],
  exports: [
    AnalyticsOverviewComponent,
    QuestionwiseStatisticsComponent,
    RegistrationStatisticsComponent
  ]
})
export class AnalyticsModule { }
