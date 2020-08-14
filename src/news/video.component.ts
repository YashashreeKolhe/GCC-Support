import { Component } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import{ITab} from './news-model';
import {featureService} from 'src/services/features';
import {TEXT} from './news-model'


@Component({
  selector: 'news-video',
  templateUrl: './video.component.html',
  styleUrls: ['./news.css']
 
})

export class videoComponent {


  constructor(
    private featureService: featureService) { }




  textbox1=this.featureService.gettexttboxdata().find(id=>1).text
  textbox2=this.featureService.gettexttboxdata().find(id=>2).text
  textbox3=this.featureService.gettexttboxdata().find(id=>3).text
  textbox4=this.featureService.gettexttboxdata().find(id=>4).text
  }
