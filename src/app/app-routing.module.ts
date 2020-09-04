import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { FaqsModule } from '../faqs/faqs.module';
import { TicketsModule } from '../tickets/tickets.module';
import { scoreModule } from '../score/score.module';
import { HomeComponent } from 'src/home/home.component';
import { FaqsOverviewComponent } from 'src/faqs/faqs-overview.component';
import { scoreOverviewComponent } from 'src/score/score-overview.component';
import { TicketsOverviewComponent } from 'src/tickets/tickets-overview.component';
import { AnalyticsOverviewComponent } from 'src/analytics/analytics-overview.component';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { contactOverviewComponent } from 'src/contactus/contact-overview.component';
import { contactModule } from 'src/contactus/contact.module';
import { NewsOverviewComponent } from 'src/news/news-overview.component';
import { NewsModule } from 'src/news/news.module';
import { ServerMonitoringComponent } from 'src/server-monitoring/server-monitoring.component';
import { ServerMonitoringModule } from 'src/server-monitoring/server-monitoring.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { ParticipantsComponent } from 'src/participants/participants.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'faqs', component: FaqsOverviewComponent, pathMatch: 'full' },
  { path: 'score', component: scoreOverviewComponent, pathMatch: 'full' },
  { path: 'tickets', component: TicketsOverviewComponent, pathMatch: 'full' },
  { path: 'analytics', component: AnalyticsOverviewComponent, pathMatch: 'full' },
  { path: 'contact', component: contactOverviewComponent, pathMatch: 'full' },
  { path: 'news', component: NewsOverviewComponent, pathMatch: 'full' },
  { path: 'server', component: ServerMonitoringComponent, pathMatch: 'full' },
  { path: 'participants', component: ParticipantsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
    FaqsModule,
    scoreModule,
    TicketsModule,
    AnalyticsModule,
    NewsModule,
    contactModule,
    ParticipantsModule,
    ServerMonitoringModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
