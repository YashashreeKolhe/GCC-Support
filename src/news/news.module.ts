import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import {newsOverviewComponent } from './news-overview.component';       
import { logWarnings } from 'protractor/built/driverProviders';
import {videoComponent} from './video.component';
import { featureComponent } from './features.component';
import { uploadArticleComponent } from './uploadArticle.component';

@NgModule({
  declarations: [
    newsOverviewComponent,
    videoComponent,
    featureComponent,
    uploadArticleComponent,
  ],
  imports: [
    BrowserModule,
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
    newsOverviewComponent,
    videoComponent,
    featureComponent,
    uploadArticleComponent,
  ]
})
export class newsModule { }
