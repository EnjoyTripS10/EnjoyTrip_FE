<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

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
    <div class="post-card" @click="openModal">
        <img src="@/assets/img/photo2.jpg" alt="post image">
        <h2>테스트 카드</h2>
        <div class="post-card-info">
            <span>좋아요 : 10</span>
            <span>2022.10.11</span>
        </div>
    </div>

    <div v-if="showModal" class="modal"  @click="closeModal">
        <div class="modal-content" @click.stop>
            <!-- Detailed information goes here -->
            <button @click="closeModal">Close</button>
            <div class="boardDetail">
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
        </div>
    </div>
</template>

<style scoped>

.boardDetail {
    display: flex;
    flex-direction: column;
    align-items: center;
}
    .post-card {
        margin: 10px auto;
        width: 225px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .post-card img {
        width: 100%;
        max-width: 500px;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
    }

    .post-card h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .post-card-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #666;
    }

    .modal {
        cursor: pointer;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        cursor: default;
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
</style>

