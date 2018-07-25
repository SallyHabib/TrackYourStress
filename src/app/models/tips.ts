export class Tip {
    constructor(
      // general
      public id: number,
  
      // attributes
      public title: string,
      public name: string,
      public goal: string,
      public rate: number,
      public rateList: boolean[],
      //links
      public links: string
    ) { }
  }
  