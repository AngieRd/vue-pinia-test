import {defineStore} from "pinia";

export let useGameStore = defineStore('game', {
   state() {
       return {
           teams : [],
           activeQuestion: null,
           questions: []
       };
   },
    actions: {
       async loadState() {
           let teams = JSON.parse(localStorage.getItem('teams'));
           this.teams = teams || [];
           this.activeQuestion = JSON.parse(localStorage.getItem('activeQuestion'));
           this.questions = JSON.parse(localStorage.getItem('questions')) || [];
           if(this.questions.length == 0) {
               let response = await fetch("./questions.json");
               this.questions = await response.json();
               localStorage.setItem('questions', JSON.stringify(this.questions));
           }
       },
       addTeam(name: String) {
           this.teams = JSON.parse(localStorage.getItem('teams')) || [];
           this.teams.push({
               name,
               score: 0,
           });
           localStorage.setItem('teams', JSON.stringify(this.teams));
       },
        selectQuestion(){
            console.log("questions", this.questions);
           let availableQuestions = this.questions.filter(question => !question.used);
           console.log("availableQuestions", availableQuestions);
           let randomIndex = Math.floor(Math.random() * availableQuestions.length);
           availableQuestions[randomIndex].used = true;
           this.activeQuestion = availableQuestions[randomIndex];
           localStorage.setItem('activeQuestion', JSON.stringify(this.activeQuestion));
        },
        reset() {
           localStorage.clear()
            this.teams = [];
            this.questions = [];
            this.activeQuestion = null;
        }
    },
    getters: {
       remaining() {
           return 2 - this.teams.length;
       }
    }
});
