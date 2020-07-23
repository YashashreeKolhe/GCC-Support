
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {LIST,Name,Score} from 'src/score/score-model'

  @Injectable()
export class studentlist {
  //endpoint: string = 'http://localhost:8080';

data:LIST[]=[{'Id':80,'Contestant':'himani','Score':60,'University':'Imperial','Region':'YES','Category':'Question1'},
{'Id':80,'Contestant':'Mon','Score':60,'University':'Imperial','Region':'YES','Category':'Question2'},
{'Id':80,'Contestant':'Question3','Score':60,'University':'Imperial','Region':'YES','Category':'Question3'},
{'Id':80,'Contestant':'Question4','Score':60,'University':'Imperial','Region':'YES','Category':'Question4'},
{'Id':80,'Contestant':'Question5','Score':60,'University':'Imperial','Region':'YES','Category':'Question5'},
{'Id':80,'Contestant':'Question6','Score':60,'University':'Imperial','Region':'YES','Category':'Question6'},
{'Id':80,'Contestant':'Question7','Score':60,'University':'Imperial','Region':'YES','Category':'Question7'},
{'Id':80,'Contestant':'Global','Score':60,'University':'Imperial','Region':'YES','Category':'Global'}]

getdata():LIST[]{
  return this.data
}

data_name:Name[]=[{Contestant:'Himani',University:'Imperial',Region:'UK'},{Contestant:'Yashashree',University:'Imperial',Region:'UK'},{Contestant:'Rahul',University:'Imperial',Region:'UK'},{Contestant:'Yllnore',University:'Imperial',Region:'UK'},{Contestant:'Sai',University:'Imperial',Region:'UK'}]
data_q1:Score[]=[{Contestant:'Himani',Score:60},{Contestant:'Yashashree',Score:50},{Contestant:'Rahul',Score:100},{Contestant:'Sai',Score:200}]


getname():Name[]{
  return this.data_name
}

getscore():Score[]{
  return this.data_q1
}

  loadCategories(){
      return [,
          'Question1',
          'Question2',
          'Question3',
          'Question4',
          'Question5',
          'Question6',
          'Global'
      ]
  }
}