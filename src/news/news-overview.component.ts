import { Component,ViewChild,TemplateRef } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { ITab } from 'src/faqs/model';
import{Article} from './article-model'
import {BsModalRef, BsModalService  } from 'ngx-bootstrap/modal';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'news',
  templateUrl: './news-overview.component.html',
  styleUrls: ['./news-overview.component.css']

})
export class NewsOverviewComponent {
  selectedarticle: Article;
  modalRef: BsModalRef;
  activeTab: string = 'Latest Content';
  
  tabs: ITab[] = [
    {
      id: 1,
      title: 'Latest Content'
    },
    {
      id: 2,
      title: 'Features'
    },
    {
      id: 3,
      title: 'Create Content'
    },
  ];
  rowData: any;
  regions: string[];
  selectedRegion: string;
  articles: Article[];
  mode: number = 1;

  constructor(private commonService: CommonService,
    private modalService:BsModalService,
    private articleService: ArticleService) {} 

  @ViewChild('ArticleContent') ArticleContent: TemplateRef<any>;


  ngOnInit() {
    this.regions = this.commonService.loadRegions();
    this.selectedRegion = 'GLOBAL';
    this.loadArticles();
  }

  async loadArticles() {
    const result = await this.articleService.getAllArticleHeadlines(this.selectedRegion)//.toPromise();
    this.articles = result.headlines;
  }

  async onRegionSelectionChanged() {
    this.loadArticles();
  }
}


