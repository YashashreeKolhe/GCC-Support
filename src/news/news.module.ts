import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { NewsOverviewComponent } from './news-overview.component';       
import {videoComponent} from './video.component';
import { uploadArticleComponent } from './uploadArticle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import{ArticleContent} from './article-content'

@NgModule({
  declarations: [
    NewsOverviewComponent,
    videoComponent,
    uploadArticleComponent,
    ArticleContent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    NewsOverviewComponent,
    videoComponent,
    uploadArticleComponent,
    ArticleContent
  ]
})
export class NewsModule { }
