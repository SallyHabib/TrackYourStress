export class QuestionnaireStructure {
  constructor(
    // general
    public id: number,

    // attributes
    public name: string,
    public elementtype: string,

    // content
    public headline: string,
    public text: string,
    public question: string,
    public required: number,
    public questionType: string,
    public label: string,
    public answers: string[],

    // values
    public singleAndMultValues: string[],
    public sliderValues: number[],
    public samValues: number[],
    public yesNoValues: string[],

    // thl
    public thlMin: number,
    public thlMax: number,
    public thlRows: string[],

    // needed for slider answers
    public sliderclass: string,
    public sliderValue: number,

    // needed for singleChoice answers
    public isSingleChecked: boolean[],

    // needed for multipleChoice answers
    public isMultipleChecked: boolean[],

    // needed for TextString
    public textStringAnswer: string,

    // needed for TextDate
    public textDateAnswer: string,

    // needed for TextInteger
    public textInteger: number,

    // needed for the thlItem answers
    public aSkala: string[],
    public bSkala: string[],
    public cSkala: string[],

    // needed for samFace
    public isSamFaceChecked: boolean[],

    // needed for samBody
    public isSamBodyChecked: boolean[],

    // save the current time of answering the question
    public collected_at: number

  ) { }
}
