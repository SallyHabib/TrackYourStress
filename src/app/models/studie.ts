export class Studie {
  constructor(
    // general
    public id: number,

    // attributes
    public name: string,
    public title: string,
    public description: string,
    public picture: string,
    public accesstype: string,
    public isPrivate: number,
    public isRunning: boolean
  ) { }
}
