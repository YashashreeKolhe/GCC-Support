import { GridOptions, GridApi } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ARTICLE} from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';



@Component({

  selector: 'new-article',
  templateUrl: './uploadArticle.component.html',
 
})

export class uploadArticleComponent {

  @Input() article:ARTICLE;
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private articleservice: ArticleService,
    private toastr: ToastrService,) {}

 
    ngOnInit() {
      this.article = this.initializearticle()
    }
  

    initializearticle(): ARTICLE {
      return {
        author: '',
        Title: '',
        blurb: '',
        body:'',
      }
    }
  
    async onSavearticle() {
      if (this.article.author === '' ){
        this.toastr.error('Please fill all the fields!', 'Error');
        this.save.emit();
      }
       else {    
      this.toastr.success('Article saved successfully', 'Success');
    }
    }
    async onCancelarticle() {
    
        this.article.author=""
        this.article.body=""
        
      
    }

}