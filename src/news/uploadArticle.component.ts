import { Component, Input } from '@angular/core';
import { Article } from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { brotliCompressSync } from 'zlib';
import { ITab } from 'src/faqs/model';

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
  
  editorOptions = { theme: 'vs-dark', language: 'html' };
  
  tabs: ITab[] = [
    {
      id: 1,
      title: 'Content in plain text'
    },
    {
      id: 1,
      title: 'Content in HTML'
    }
  ];
  activeTab: string;

  config: any = {
    allowedContent: true,
    toolbar: [['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', 'Link', 'Styles', 'Format', 'Font', 'FontSize', 'Table']],
    removePlugins: 'elementspath',
    resize_enabled: true,
    extraPlugins: 'font,divarea,placeholder',
    contentsCss: ["body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}"],
    autoParagraph: false,
    enterMode: 2,
    height: '500px'
  };

  constructor(
    private articleservice: ArticleService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.activeTab =  this.tabs[0].title;
    this.regions = this.commonService.loadRegions();
    this.article = this.initializeArticle();
  }

  initializeArticle(): Article {
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
      const result = await this.articleservice.savearticle(this.article).toPromise();
      this.toastr.success('Content saved successfully', 'Success');
    } catch (e) {
      this.toastr.error("Save operation failed!", 'Error');
      return;
    }
  }

  generateArticleBody() {
    var body = "";
    if (this.article.paragraphs.length >= 0) {
      body = body + `<br/><h4>${ '\n' + this.article.paragraphs[0] + '\n' }</h4>`;
      for (let i = 1; i < this.article.paragraphs.length; i++) {
        body = body + `<br/><pre>${'\n' + this.article.paragraphs[i] + '\n' }</pre>`;
        if (this.article.paragraphs[i].includes('--')) {
          var matches = body.match(/--( )*(.)+/g);
          console.log(matches);
          body = body.replace(matches[0], `</pre>${'\n'}<ul><li>${matches[0].replace('-- ', '').replace('--', '').replace('\n', '')}</li>`);
          body = body.replace(matches[matches.length - 1], `<li>${matches[matches.length - 1].replace('-- ', '').replace('--', '').replace('\n', '')}</li></ul>${'\n'}<pre>`);
          for (let i = 1; i < matches.length - 1; i++) {
            body = body.replace(matches[i], `<li>${matches[i].replace('-- ', '').replace('--', '')}</li>`);
          }
        }
      }
    }
    console.log(body);
    return body;
  }

  validateArticle(): boolean {
    if (this.article.title === null || this.article.title.trim() === '') {
      return false;
    }
    if (this.article.author === null || this.article.author.trim() === '') {
      return false;
    }
    if (this.article.body.trim() == '') {
      return false;
    }
    return true;
  }

  onResetArticle() {
    this.article = this.initializeArticle();
  }

  // onFileSelected(imageInput) {
  //   if (imageInput.files[0]) {
  //     this.file = imageInput.files[0];
  //     var pattern = /image-*/;

  //     if (!this.file.type.match(pattern)) {
  //       this.toastr.error('Invalid image format!', 'Error');
  //       return;
  //     }
  //     console.log(this.file.name);
  //   }
  // }

  onChange($event: any): void {
  }

  onPaste($event: any): void {
  }
}