<script setup lang="ts">
import AnswerItem from "@/components/AnswerItem.vue";

defineProps({
    question: {type: Object}
});

</script>

<template>
    <div v-if="question" class="panel-question">
        <h1 v-text="question.text"/>
        <div class="panel-answers" >
            <AnswerItem v-for="answer in question.answers"
                        :key="answer.id"
                        :id="answer.id"
                        :visible="answer.visible"
                        :text="answer.text"
                        :points="answer.points"/>
        </div>
    </div>
</template>

<style scoped>
.panel-question{
    padding: 20px;
}
.panel-answers {
    background: #000;
    border: 5px solid #dfdf6d;
    padding: 20px;
    min-width: 60vh;
}
h1 {
  font-size: 2.5rem;
}
</style>