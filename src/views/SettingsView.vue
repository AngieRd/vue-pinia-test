<script setup lang="ts">
import {useGameStore} from "@/stores/GameStore";

interface ActiveQuestion {
    "id": Number,
    "used": Boolean,
    "text": String,
    "answers": Array<any>
}
interface GameStore {
    teams : Array<any>,
    activeQuestion: ActiveQuestion,
    questions: Array<any>
}


let gameStore = useGameStore();
let teamName = '';

gameStore.loadState();
function addTeam() {
    gameStore.addTeam(teamName);
    teamName = '';
}

function reset() {
    gameStore.reset();
}
</script>

<template>
    <div class="settings">
        <p> Equipos disponibles {{gameStore.remaining}} </p>
        <div>
            <label for="teamName">Nombre del equipo:</label>
            <input id="teamName" type="text" v-model="teamName" />
            <button type="button" @click="addTeam">Agregar</button>
        </div>
        <div>
            <button type="button" @click="reset">Reiniciar</button>
        </div>
        <div>
            <button type="button" @click="gameStore.selectQuestion">Iniciar pregunta</button>
        </div>
        <div v-if="gameStore.activeQuestion">
            <h2>Pregunta</h2>
            <p class="question" v-text="gameStore.activeQuestion?.text"></p>
            <div>
                <button v-for="answer in gameStore.activeQuestion.answers"
                        :key="answer.id"
                        @click="gameStore.markResponse(answer.id)"
                >
                    {{answer.id}}. {{answer.text}}
                </button>
            </div>
        </div>
        <div>
            <h2>Teams</h2>
            <div v-for="team in gameStore.teams"
            >
                <p class="teamName" v-text="team.name"></p>
                <button @click="gameStore.strike(team.id)">Strike</button>
                <button @click="gameStore.win(team.id)">Win</button>
            </div>
            <a href="/dashboard" target="_blank">Go Dashboard</a>
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
.question{
    border: 1px solid #222222;
    padding: 4px;
    border-radius: 5px;
}
</style>