import { Component, Input } from '@angular/core';
import { Article } from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'new-article',
  templateUrl: './uploadArticle.component.html',

})

export class uploadArticleComponent {
  @Input() mode: number;
  article: Article;
  newParagraph: string = '';
  addParagraphFlag: number = 0;
  types: string[] = [
    'Article',
    'Newsletter',
    'Feature'
  ];
  regions: string[];
  file: File;
  firstPara: string;

  constructor(
    private articleservice: ArticleService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.regions = this.commonService.loadRegions();
    this.article = this.initializeArticle();
  }

  initializeArticle(): Article {
    this.firstPara = '';
    return {
      author: '',
      title: '',
      blurb: '',
      body: '',
      paragraphs: [''],
      subHeading: '',
      region: 'GLOBAL',
      type: 'Article'
    } as Article;
  }

  async onSaveArticle() {
    if (!this.validateArticle()) {
      this.toastr.error('Please fill the mandatory fields!', 'Error');
      return;
    }
    try {
      // Uncomment this once saveImage endpoint is available
      // const imageurl = await this.articleservice.saveImage(this.file).toPromise();
      // this.article.imageUrl = imageUrl;

      const result = await this.articleservice.savearticle(this.article).toPromise();
      this.toastr.success('Content saved successfully', 'Error');
    } catch (e) {
      this.toastr.error("Save operation failed!", 'Error');
      return;
    }
  }

  validateArticle(): boolean {
    if (this.article.title === null || this.article.title.trim() === '') {
      return false;
    }
    if (this.article.paragraphs.length === 0) {
      return false;
    }
    if (this.article.author === null || this.article.author.trim() === '') {
      return false;
    }
    return true;
  }

  addParagraph() {
    this.addParagraphFlag = 0;
    this.article.paragraphs.push(this.newParagraph);
    this.newParagraph = '';
  }

  onFirstParaChange() {
    this.article.paragraphs[0] = this.firstPara;
  }

  onResetArticle() {
    this.article = this.initializeArticle();
  }

  onFileSelected(imageInput) {
    if (imageInput.files[0]) {
      this.file = imageInput.files[0];
      var pattern = /image-*/;

      if (!this.file.type.match(pattern)) {
        this.toastr.error('Invalid image format!', 'Error');
        return;
      }
      console.log(this.file.name);
    }
  }
}