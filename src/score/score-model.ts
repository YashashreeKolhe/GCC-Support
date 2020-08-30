export interface LIST {
    name?: string;
    region?: string;
    university?: string;
    totalScore?: number;
    questionNumber?: number;
    contestantId?: string;
    total?: number;
    teamName?: string;
    rank?: number;
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