interface IActiveQuestion {
    "id": Number,
    "used": Boolean,
    "text": String,
    "answers": Array<IAnswer>
}

interface ITeam {
    id: String,
    name: String,
    score: number,
    strikes: number
}

interface IGameState {
    teams : Array<any>,
    activeQuestion: null | IActiveQuestion,
    questions: Array<any>
}

interface IAnswer {
    "id": number,
    "text": String,
    "points": number,
    "visible": boolean
}

export type {IActiveQuestion, IGameState, ITeam, IAnswer};