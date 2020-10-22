import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Article } from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',

})

export class ArticleDetailsComponent {
  articleId: string;
  text: Article;

  mode: number = 2; //update
  modalRef: BsModalRef;

  @ViewChild('ArticleDetails') ArticleDetails: TemplateRef<any>;

  constructor(
    private articleservice: ArticleService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleId = params.articleId;
    });
    this.loadarticles();
  }

  async loadarticles() {
    const article = await this.articleservice.getArticle(this.articleId).toPromise();
    this.text = article.article;
  }

  async updateArticle() {
    this.modalRef = this.modalService.show(this.ArticleDetails, { class: 'modal-lg' });
    
  }

  async deleteArticle() {
    try {
      const result = await this.articleservice.deleteArticle(this.text.id).toPromise();
      this.toastr.success('Article deleted successfully!', 'Success');
      this.router.navigateByUrl('/news');
    } catch (ex) {
      this.toastr.error('Error occured!', 'Error');
    }
  }
}