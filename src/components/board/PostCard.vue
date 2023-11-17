<script setup>
import { ref,defineProps } from 'vue';
import axios from "axios";

const showModal = ref(false);
const title = ref('')
const modalData = ref({});


const openModal = async (boardId) => {
    showModal.value = true;

  try {
    const response = await axios.get(`/board/${boardId}`);
    console.log(response)
    console.log(response.data)
    modalData.value = response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

const closeModal = () => {
    showModal.value = false;
};

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
// const post = ref({
//     title: '자전거 타고 하체운동',
//     author: '김범수',
//     date: '2023-11-14',
//     views: 10,
//     likes: 5,
//     image: 'src/assets/img/index1.jpg',
//     content: '아 하체하다 토 할뻔했네'
// });
</script>

<template>
    <div class="post-card" @click="openModal(post.boardId)">
        <!-- <img :src="post.image" alt="post image"> -->
        <img :src="'data:image/png;base64,' + post.image">
        <h2>{{post.boardTitle}}</h2>
        <div class="post-card-info">
            <span>{{ post.boardHit }}</span>
            <span>{{post.createdAt}}</span>
        </div>
    </div>

    <div v-if="showModal" class="modal"  @click="closeModal">
        <div class="modal-content" @click.stop>
            <!-- Detailed information goes here -->
            <div class="boardDetail">
                <button class="close-button" @click="closeModal">X</button>
                <h1>{{ modalData.boardTitle }}</h1>
                <p>작성자:
                    {{ modalData.userEmail }}</p>
                <p>작성일:
                    {{modalData.createdAt }}</p>
                <p>조회수:
                    {{ modalData.boardHit }}</p>
                <p>좋아요:
                    {{ modalData.boardLikes }}</p>
                <div v-for="(imgBase64, index) in modalData.image" :key="index">
                    <img :src="'data:image/png;base64,' + imgBase64">
                    <!-- <img :src="'data:image/png;base64,' + post.image"> -->
                </div>
                <!-- <img :src="'data:image/png;base64,' + modalData.image[0]" alt="post image" width="400"> -->
                <p>{{ modalData.boardContent }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.close-button {
  position: absolute; /* 절대 위치 지정 */
  right: 0; /* 오른쪽에 배치 */
  background-color: #f8f9fa;
  border: none;
  color: #495057;
  padding: 5px 10px; /* 패딩 줄임 */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px; /* 글자 크기 줄임 */
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.5s;
}

.close-button:hover {
  background-color: #495057;
  color: white;
  border: 1px solid #495057;
}
.boardDetail {
    position: relative; /* 상대 위치 지정 */
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

