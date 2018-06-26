export class Questionnaire {
  constructor(
    public name: string,
    public title: string,
    public is_active: number,
    public is_onetime: number,
    public is_multiple: number,
    public is_filled_out: boolean,
    public is_schedule_changeable: number,
    public description: string,
    public introtext: string,
    public outrotext: string,
    public id: number,

    public every: number
  ) { }
}
