import {defineStore} from "pinia";
import type {UnwrapRef} from "vue";

interface Team {
    id: String,
    name: String,
    score: Number,
    strikes: number
}

interface ActiveQuestion {
    "id": Number,
    "used": Boolean,
    "text": String,
    "answers": Array<any>
}

interface IGameState {
    teams : Array<any>,
    activeQuestion: null | ActiveQuestion,
    questions: Array<any>
}

interface IAnswer {
    "id": number,
    "text": String,
    "points": number,
    "visible": boolean
}
export let useGameStore = defineStore('game', {
   state(): IGameState {
       return {
           teams : [],
           activeQuestion: null,
           questions: []
       };
   },
    actions: {
       async loadState() {
           console.log("loadState");
           let teams = JSON.parse(localStorage.getItem('teams') || '[]');
           this.teams = teams || [];
           this.activeQuestion = JSON.parse(localStorage.getItem('activeQuestion') || '{}');
           this.questions = JSON.parse(localStorage.getItem('questions') || '[]') || [];
           if(this.questions.length == 0) {
               let response = await fetch("./questions.json");
               this.questions = await response.json();
               localStorage.setItem('questions', JSON.stringify(this.questions));
           }
       },
       addTeam(name: String) {
           this.teams = JSON.parse(localStorage.getItem('teams') || '[]') || [];
           this.teams.push({
               id: Math.random() * 1000000,
               name,
               score: 0,
               strikes: 0,
           });
           localStorage.setItem('teams', JSON.stringify(this.teams));
       },
        selectQuestion(){
            console.log("questions", this.questions);
           let availableQuestions = this.questions.filter((question: ActiveQuestion) => !question.used);
           console.log("availableQuestions", availableQuestions);
           let randomIndex = Math.floor(Math.random() * availableQuestions.length);
           availableQuestions[randomIndex].used = true;
           this.activeQuestion = availableQuestions[randomIndex];
           localStorage.setItem('activeQuestion', JSON.stringify(this.activeQuestion));
        },
        markResponse(id: number) {
            this.activeQuestion?.answers.forEach((answer: IAnswer)=> {
                if(answer.id === id) {
                    answer.visible = true;
                }
            });
           localStorage.setItem('activeQuestion', JSON.stringify(this.activeQuestion));
        },
        strike (id: string) {
           console.log(id, this.teams);
           this.teams.forEach((team: Team) => {
               if(team.id === id) {
                   team.strikes++;
               }
           });
            localStorage.setItem('teams', JSON.stringify(this.teams));
        },
        win (id: string) {
           console.log("win");
           let points = this.activeQuestion?.answers.reduce((points: Number, currentAnswer: any) => {
               let pts = (currentAnswer.visible) ? currentAnswer.points : 0;
               return points + pts;
           }, 0);
           console.log("points");
           this.teams.forEach((team: Team) => {
               if(team.id === id) {
                   team.score += points;
               }
               team.strikes = 0;
           });
           localStorage.setItem('teams', JSON.stringify(this.teams));

        },
        reset() {
           localStorage.clear()
            this.teams = [];
            this.questions = [];
            this.activeQuestion = null;
        }
    },
    getters: {
       remaining():any {
           return 2 - this.teams.length;
       }
    }
});
