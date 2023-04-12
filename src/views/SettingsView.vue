<script setup lang="ts">
import {useGameStore} from "@/stores/GameStore";
import {ref} from "vue";

let gameStore = useGameStore();
gameStore.loadState();

let teamName = '';
let start = ref(!!gameStore?.activeQuestion?.text);
const wrongAnswerAudio = new Audio("audio/wrong.mp3");
const releaseAnswerAudio = new Audio("audio/release_answer.mp3");
const winAudio = new Audio("audio/win.mp3");
function addTeam() {
    if (!teamName) return false;
    gameStore.addTeam(teamName);
    teamName = '';
}

function startGame() {
    start.value = !start.value;
    window.open('/dashboard');
}

function strike(id: string, remove: boolean = false){
    gameStore.strike(id, remove);
    if (!remove) wrongAnswerAudio.play();
}
function win(id: string, reduce: boolean = false){
    gameStore.win(id, reduce);
    if (!reduce) winAudio.play();
}

function markResponse(id: number){
    gameStore.markResponse(id);
    releaseAnswerAudio.play();
}

function reset() {
    start.value = !start.value;
    gameStore.reset();
}
</script>

<template>
    <div class="settings">
        <div>
            <button type="button" @click="reset">Reiniciar Juego</button>
        </div>

        <div v-if="gameStore.teams.length < 2">
            <h3> Equipos registrados: <strong>{{gameStore.teams.length}}/2</strong> </h3>
            <div style="display: flex; gap: 10px; align-items: center;">
                <label for="teamName">Nombre del equipo:</label>
                <input style="flex-grow: 1" id="teamName" type="text" v-model="teamName" />
                <button style="flex-grow: 1" type="button" @click="addTeam">Agregar</button>
            </div>
        </div>
        <div v-else>
            <h2>Teams</h2>
            <div class="panel-teams">
                <div class="panel-team" v-for="team in gameStore.teams"
                >
                    <p class="teamName" v-text="team.name"></p>
                    <div style="display: flex">
                        <button style="flex-grow: 1" @click="strike(team.id)">Strike (+)</button>
                        <button style="flex-grow: 1" @click="strike(team.id, true)">Strike (-)</button>
                    </div>
                    <div style="display: flex">
                        <button style="flex-grow: 1" @click="win(team.id)">Win (+)</button>
                        <button style="flex-grow: 1" @click="win(team.id, true)">Win (-)</button>
                    </div>
                </div>
            </div>
            <div style="display: flex">
                <button style="flex-grow: 1" v-if="!start" type="button" @click="startGame">Comenzar</button>
                <button style="flex-grow: 1" v-else type="button" @click="gameStore.selectQuestion">Mostrar pregunta</button>
            </div>

        </div>


        <div v-if="gameStore.activeQuestion?.text">
            <h2>Pregunta</h2>
            <p class="question" v-text="gameStore.activeQuestion?.text"></p>
            <div style="display: flex">
                <button v-for="answer in gameStore.activeQuestion.answers"
                        :key="answer.id"
                        :disabled="answer.visible"
                        @click="markResponse(answer.id)"
                        style="flex-grow: 1"
                >
                    {{answer.id}}. {{answer.text}}
                </button>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<style scoped>
button {
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
}
.teamName {
    color: #5e85a7;
    font-weight: bold;
}
.panel-teams {
    display: flex;
}
.panel-team {
    flex-grow: 1;
}
.question{
    border: 1px solid #222222;
    padding: 4px;
    border-radius: 5px;
}
</style>