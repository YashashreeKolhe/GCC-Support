import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { AlertsOverviewComponent } from './alerts-overview.component';       
import { CreateAlertComponent } from './create-alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { ClipboardModule } from 'ngx-clipboard';
import { CKEditorModule } from 'ng2-ckeditor';
import { UniversityComponent } from './university.component';
import { UniversityListComponent } from './university-list.component';

@NgModule({
  declarations: [
    AlertsOverviewComponent,
    CreateAlertComponent,
    UniversityComponent,
    UniversityListComponent
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
    AlertsOverviewComponent,
    CreateAlertComponent,
    UniversityComponent,
    UniversityListComponent
  ]
})
export class AlertsModule { }
