<script setup>
import { ref } from 'vue';

const post = ref({
    title: '자전거 타고 하체운동',
    author: '김범수',
    date: '2023-11-14',
    views: 10,
    likes: 5,
    image: 'src/assets/img/index1.jpg',
    content: '아 하체하다 토 할뻔했네'
});
</script>

<template>
    <div class="board">
        <h1>{{ post.title }}</h1>
        <p>작성자:
            {{ post.author }}</p>
        <p>작성일:
            {{ post.date }}</p>
        <p>조회수:
            {{ post.views }}</p>
        <p>좋아요:
            {{ post.likes }}</p>
        <img :src="post.image" alt="post image" width="400">
            <p>{{ post.content }}</p>
        </div>
</template>

<style scoped>
.board {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>