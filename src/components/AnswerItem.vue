<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
    id: Number,
    text: String,
    points: Number,
    visible: Boolean
});
let visibleRef = ref(props.visible)
window.addEventListener("storage", () => {
    console.log(localStorage.getItem('activeQuestion'));
    let question = JSON.parse(localStorage.getItem('activeQuestion') || '{}');
    console.log("questions",props.id, question);
    question.answers.forEach((answer: any) => {

        if(props.id === 3) {
            console.log(answer);
        }
        if (answer.id === props.id) {
            console.log(props.id, answer.visible);
            visibleRef.value = answer.visible
        }
    });
    //visibleRef.value = question.answers[props.id-1].visible;
    // When local storage changes, dump the list to
    // the console.
    //console.log(JSON.parse(window.localStorage.getItem("sampleList")));
});

</script>

<template>
    <div class="answer">
        <p >
            <span v-text="id"/>.
            <span v-if="visibleRef">
                <span v-text="text"/>
                <span>..............................</span>
                <span v-text="points"/>
            </span>
            <span v-else>..........................................</span>
        </p>

    </div>
</template>

<style scoped>
.answer {
    color: #ffffff;
}
p {
    font-family: Arial;
    font-size: 1.5rem;
}
</style>