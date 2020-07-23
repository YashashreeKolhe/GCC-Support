export interface LIST {
    Id?: number;
    Contestant?: string;
    Score?: number;
    Region?: string;
    University?: string;
    Category?:string
  }

  export interface Name {
    Contestant:string;
    University:string;
    Region:string
  }

  export interface Score {
    Contestant:string
    Score:number
  }

export interface Idropdown{
  title:String;
  id:number;
}