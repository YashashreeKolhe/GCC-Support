import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ServicesModule } from '../services/services.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServicesModule
  ],
  providers: [],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
