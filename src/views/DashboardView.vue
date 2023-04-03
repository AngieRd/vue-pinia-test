<script setup lang="ts">
import TheQuestion from "@/components/TheQuestion.vue";
import TeamDashboard from "@/components/TeamDashboard.vue";
import SettingsView from "@/views/SettingsView.vue";
import {useGameStore} from "@/stores/GameStore";
import {provide, ref, watch} from "vue";

let gameStore = useGameStore();
gameStore.loadState();
let teams = gameStore.teams;
let teamOne = ref(teams ? teams[0] : undefined);
let teamTwo = ref(teams ? teams[1] : undefined);
/*watch(gameStore.teams, (val => {
    teamOne.value = val[0] ?? teamOne.value;
    teamTwo.value = val[1] ?? teamTwo.value;
}));

provide("teamOne", teamOne);
provide("teamTwo", teamTwo);*/
</script>

<template>
    <div class="dashboard">
<!--        <SettingsView/>-->
        <TeamDashboard v-if="teamOne" :team="teamOne"/>
        <TheQuestion />
        <TeamDashboard v-if="teamTwo" :team="teamTwo"/>
    </div>
</template>

<style scoped>
.dashboard{
    display: flex;
}
</style>