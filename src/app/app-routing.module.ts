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
import { AlertsModule } from 'src/alerts/alerts.module';
import { ServerMonitoringComponent } from 'src/server-monitoring/server-monitoring.component';
import { ServerMonitoringModule } from 'src/server-monitoring/server-monitoring.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { ParticipantsComponent } from 'src/participants/participants.component';
import { ArticleDetailsComponent } from 'src/news/article-details.component';
import { AlertsOverviewComponent } from 'src/alerts/alerts-overview.component';
import { LoginComponent } from 'src/login/login.component';
import { LoginModule } from 'src/login/login.module';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'faqs', component: FaqsOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'score', component: scoreOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'tickets', component: TicketsOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      roles: ["admin"],
    }
  },
  {
    path: 'analytics', component: AnalyticsOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'contact', component: contactOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'news', component: NewsOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin"] }
  },
  {
    path: 'news/:articleId', component: ArticleDetailsComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin"] }
  },
  { path: 'server', component: ServerMonitoringComponent, pathMatch: 'full' },
  {
    path: 'participants', component: ParticipantsComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin", 'cs-internal'] }
  },
  {
    path: 'alerts', component: AlertsOverviewComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ["admin"] }
  }
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
    ServerMonitoringModule,
    AlertsModule,
    LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
