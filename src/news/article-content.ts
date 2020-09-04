
import { FaqsService } from 'src/services/faqs.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/services/article.service';
import { Component, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import {CommonService} from 'src/services/common.service'
import { Observable } from 'rxjs';
import {Article} from './article-model'
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'article-content',
  templateUrl: './article-content.component.html',
})
export class  ArticleContent {
  @Input() article: Article;
  regions: string[];
  selectedRegion: string;
  rowData:string
  gridApi: GridApi;
  defaultColDef;
  columnDefs: ColDef[];
  gridOptions: GridOptions;
  text:Article
 
 
  constructor(
    private articleService: ArticleService,
    private commonService:CommonService,
    private toastr: ToastrService,) {}



 

      
    ngOnInit() {
      this.configureGrid();
        this.regions = this.commonService.loadRegions()
        this.articleService.getArticle('Himani').toPromise()
        this.loadarticles()
     
      }

     
      async loadarticles(){
        const article = await this.articleService.getArticle('Himani').toPromise()
        console.log(article)
        this.text=article
       }
        
      text1={"id":"Himani"}
      

    onRegionSelectionChanged() {
        console.log(this.selectedRegion)
      }
   
    
      onGridReady(params) {
        this.gridApi = params.api;
      }

      configureGrid() {
        this.gridOptions = {
          cacheQuickFilter: true,
          floatingFilter: true,
          onGridReady: params => this.onGridReady(params)
        }
      this.columnDefs = this.getColumnDefs()
      this.defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        autoHeight: true
      }}

      getColumnDefs(): ColDef[] {
        return [
          {
            headerName: 'id',
            field: 'id', 
            width: 590,
            filter: 'agTextColumnFilter',
          },
        ];
      }
    }

