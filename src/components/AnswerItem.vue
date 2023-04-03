<script setup lang="ts">
defineProps({
    id: Number,
    text: String,
    points: Number
});

let visible = true;

</script>

<template>
    <div class="answer">
        <p v-if="visible">
            <span v-text="text"/>
            <span>......</span>
            <span v-text="points"/>
        </p>
        <p v-else>........................</p>
    </div>
</template>

<style scoped>
.answer {
    color: #ffffff;
}
</style>