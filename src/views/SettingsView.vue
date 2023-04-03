<script setup lang="ts">
import {useGameStore} from "@/stores/GameStore.ts";

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
    </div>
</template>

<style scoped>

</style>