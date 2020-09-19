import { Component, Input } from '@angular/core';
import { Article } from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',

})

export class ArticleDetailsComponent {
  articleId: string;
  text: Article;

  constructor(
    private articleservice: ArticleService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.articleId = params.articleId;
    });
    this.loadarticles();
  }

  async loadarticles(){
  const article = await this.articleservice.getArticle(this.articleId).toPromise();
  this.text = article.article;
 }
}