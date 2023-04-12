<script setup lang="ts">
import TheQuestion from "@/components/TheQuestion.vue";
import TeamDashboard from "@/components/TeamDashboard.vue";
import {useGameStore} from "@/stores/GameStore";
import {ref} from "vue";

let gameStore = useGameStore();
gameStore.loadState();
let teamOne = ref(gameStore.teams ? gameStore.teams[0] : undefined);
let teamTwo = ref(gameStore.teams ? gameStore.teams[1] : undefined);
let question = ref(gameStore.activeQuestion ? gameStore.activeQuestion : undefined);

window.addEventListener("storage", (event: StorageEvent) => {
    if (event.key === "teams") {
        let teams = JSON.parse(event.newValue || '');
        teamOne.value = teams[0];
        teamTwo.value = teams[1];
    }

    if (event.key === "activeQuestion") {
        question.value = JSON.parse(event.newValue || '');
    }
});

</script>

<template>
    <div>
        <div v-if="teamOne && teamTwo" class="dashboard">
            <TeamDashboard v-if="teamOne" :team="teamOne"/>
            <div style="min-width: 60vh">
                <TheQuestion :question="question"/>
            </div>
            <TeamDashboard v-if="teamTwo" :team="teamTwo"/>
        </div>
        <div v-else>
            Por favor configure los equipos en esta <a href="/" target="_blank">página</a>
        </div>

    </div>
</template>

<style scoped>
/*
body {
    background: linear-gradient(to right, blue, pink);
}
*/

.dashboard {
    display: flex;
}
</style>