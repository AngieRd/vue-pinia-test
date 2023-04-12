import {defineStore} from "pinia";
import type {IActiveQuestion, IGameState, ITeam, IAnswer} from "@/interfaces/resources.model";


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
           this.teams = JSON.parse(localStorage.getItem('teams') || '[]');
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
           let availableQuestions = this.questions.filter((question: IActiveQuestion) => !question.used);
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
        strike (id: string, remove: boolean) {
           this.teams.forEach((team: ITeam) => {
               if(team.id === id) {
                   team.strikes = !remove ? team.strikes + 1 : team.strikes - 1;
               }
           });
            localStorage.setItem('teams', JSON.stringify(this.teams));
        },
        win (id: string, reduce: boolean) {
           let points: number = 0;
            if (this.activeQuestion?.answers) {
                points = this.activeQuestion?.answers.reduce((points: number, currentAnswer: any) => {
                    let pts = (currentAnswer.visible) ? currentAnswer.points : 0;
                    return points + pts;
                }, 0);
            }

           this.teams.forEach((team: ITeam) => {
               if(team.id === id) {
                   if (!reduce) {
                       team.score += points;
                   } else {
                       team.score -= points;
                   }
                   team.strikes = 0;
               }
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
