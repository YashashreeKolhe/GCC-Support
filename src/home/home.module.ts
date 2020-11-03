import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ServicesModule } from '../services/services.module';
import { CountdownModule } from 'ngx-countdown';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServicesModule,
    CountdownModule
  ],
  providers: [],
  exports: [
    HomeComponent
    
  ]
})
export class HomeModule { }
