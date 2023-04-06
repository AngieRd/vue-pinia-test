<script setup lang="ts">
import AnswerItem from "@/components/AnswerItem.vue";
import {useGameStore} from "@/stores/GameStore";
import {watch, ref} from "vue";

let gameStore = useGameStore();
gameStore.loadState();
let question = ref(gameStore.activeQuestion);
console.log(gameStore.activeQuestion);
window.addEventListener("storage", () => {
    console.log(localStorage.getItem('activeQuestion'));
    question.value = JSON.parse(localStorage.getItem('activeQuestion') || '{}');
    // When local storage changes, dump the list to
    // the console.
    //console.log(JSON.parse(window.localStorage.getItem("sampleList")));
});
/*watch(gameStore.activeQuestion, (value) => {
    console.log("question", value);
    /!*question.value = value;*!/
});*/
/*let question = {
    id: 1,
    text: "Fruta que por fuera es verde",
    answers: [
        {id: 1, text: "Pera", points: 38},
        {id: 2, text: "Limón", points: 14},
        {id: 3, text: "Sandia", points: 22},
        {id: 4, text: "Manzana", points: 26}
    ]
}*/
</script>

<template>
    <div v-if="question" class="panel-question">
        <h1 v-text="question.text"/>
        <div class="panel-answers" >
            <AnswerItem v-for="answer in question.answers"
                        :key="answer.id"
                        :id="answer.id"
                        :visible="answer.visible"
                        :text="answer.text"
                        :points="answer.points"/>
        </div>
    </div>
</template>

<style scoped>
.panel-question{
    padding: 20px;
}
.panel-answers {
    background: #5e85a7;
    border: 5px solid #dfdf6d;
    padding: 20px;
    min-width: 60vh;
}
h1 {
  font-size: 2.5rem;
}
</style>