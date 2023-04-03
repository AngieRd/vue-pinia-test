<script setup lang="ts">
import ScoreItem from "@/components/ScoreItem.vue";
import {inject} from "vue";

defineProps({
    team: Object
});


/*let team = {
    name: "Rdguez",
    score: 0,
}*/
let strikes = 2;
</script>

<template>
    <div class="team">
        <h1 v-text="team.name"/>
        <ScoreItem :score="team.score"/>
        <div>
            <h2>Strikes</h2>
            <span v-for="n in strikes">X</span>
        </div>
    </div>
</template>

<style scoped>

</style>