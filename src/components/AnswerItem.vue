<script setup lang="ts">

defineProps({
    id: Number,
    text: String,
    points: Number,
    visible: Boolean
});

</script>

<template>
    <div class="answer" style="padding: 5px 0;">
        <p style="display: flex; gap: 5px;">
            <span style="height: 32px;" v-text="id"/>.
            <span v-if="visible" style="display: flex;
    gap: 15px;
    width: 100%;">
                <span v-text="text"/>
                <span class="dots"></span>
                <span v-text="points"/>
            </span>
            <span v-else class="dots"></span>
        </p>

    </div>
</template>

<style scoped>
.answer {
    color: #fff900;
}
p {
    font-family: Arial;
    font-size: 1.5rem;
}
.dots {
    display: block;
    height: 32px;
    flex-grow: 1;
    background-image: url("/src/assets/dots.png");
}
</style>