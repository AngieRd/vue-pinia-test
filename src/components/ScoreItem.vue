<script setup lang="ts">
defineProps({
    score: Number
})
</script>

<template>
    <div class="score">
        <h1 class="score_points" v-text="score"/>
    </div>
</template>

<style scoped>
.score {
    background: #000;
    border: 3px dashed #fff900;
}

.score_points {
    text-align: center;
    font-family: monospace;
    color: #fff900;
    font-size: 2rem;
}
</style>