<script setup lang="ts">
import ScoreItem from "@/components/ScoreItem.vue";

defineProps({
    team: { type: Object, default: {}}
});

</script>

<template>
    <div class="team">
        <h1 v-text="team.name"/>
        <ScoreItem :score="team.score"/>
        <div style="margin-top: 20px" v-if="team.strikes > 0">
            <h2>Strikes</h2>
            <span class="strike" v-for="n in team.strikes">X</span>
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