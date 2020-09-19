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
import { uploadArticleComponent } from './uploadArticle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ ArticleDetailsComponent } from './article-details.component';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { PhotosGalleryComponent } from './photos-gallery.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    NewsOverviewComponent,
    uploadArticleComponent,
    ArticleDetailsComponent,
    PhotosGalleryComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    BrowserAnimationsModule,
    MonacoEditorModule,
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ServicesModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
    ClipboardModule
  ],
  providers: [{
		provide: MONACO_PATH,
		useValue: 'https://unpkg.com/monaco-editor@0.20.0/min/vs'
	}],
  exports: [
    NewsOverviewComponent,
    uploadArticleComponent,
    ArticleDetailsComponent,
    PhotosGalleryComponent
  ]
})
export class NewsModule { }
