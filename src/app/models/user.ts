export class User {
  constructor(
    public email: string,
    public password: string,
    public passwordAgain: string,
    public nickname: string
  ) { }
}
