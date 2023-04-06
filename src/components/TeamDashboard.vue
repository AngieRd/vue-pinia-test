<script setup lang="ts">
import ScoreItem from "@/components/ScoreItem.vue";
import {reactive} from "vue";

let props = defineProps({
    team: { type: Object, default: {}}
});
let teamRef = reactive(props.team);
window.addEventListener("storage", () => {
    let teams = JSON.parse(localStorage.getItem('teams') || '{}');
    teams.forEach((team: any) => {
        if(team.id === props.team.id) {
            console.log(teamRef)
            teamRef.strikes = team.strikes;
            teamRef.score = team.score;
        }
    });
    console.log(localStorage.getItem('teams'));
});
</script>

<template>
    <div class="team">
        <h1 v-text="team.name"/>
        <ScoreItem :score="teamRef.score"/>
        <div style="margin-top: 20px">
            <h2>Strikes</h2>
            <span class="strike" v-for="n in teamRef.strikes">X</span>
        </div>
    </div>
</template>

<style scoped>
.team {
    min-width: 20vh;
}
.strike {
    font-size: 4rem;
    color: red;
}
</style>