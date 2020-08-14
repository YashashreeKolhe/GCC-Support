
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TEXT} from 'src/news/news-model'
@Injectable()

export class featureService{

    textboxes=  [
        {
            id:1, text:"Text highlighting team or a hacker" },
            {id:2, text:"Text highlighting team or a hacker" },
            {id:3, text:"Text highlighting team or a hacker"},
            {id:4, text:"Text highlighting team or a hacker"} 
      
        
          ];


          gettexttboxdata(){
              return this.textboxes;
          }
}