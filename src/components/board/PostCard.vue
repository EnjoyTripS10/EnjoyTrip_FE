<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const showModal = ref(false);
const modalData = ref({});
const isLiked = ref(false);
const status = ref(0);

const openModal = async (boardId) => {
  showModal.value = true;

  try {
    const response = await axios.get(`/board/${boardId}`);
    console.log(response);
    console.log(response.data);
    modalData.value = response.data;
    isLiked.value = modalData.value.like;
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
    required: true,
  },
});

const toggleLike = async (boardId) => {
  isLiked.value = !isLiked.value; // 상태 토글  `
  status.value++;
  try {
    // 서버에 좋아요 상태 업데이트 요청
    const response = await axios.post(
      `/board/like`,
      { boardId, isLiked: isLiked.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

watch(isLiked, (newVal) => {
  if (status.value !== 0) {
    if (newVal === true) {
      modalData.value.boardLikes++;
    } else {
      modalData.value.boardLikes--;
    }
  }
});

const formatDate = (datetime) => {
  return datetime.split("T")[0];
};

// 이미지
const currentImageIndex = ref(0);

const showNextImage = () => {
  if (currentImageIndex.value < modalData.value.image.length - 1) {
    currentImageIndex.value++;
  }
};

const showPreviousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};
</script>

<template>
  <div>
    <div class="post-card" @click="openModal(post.boardId)">
      <!-- <img :src="post.image" alt="post image"> -->
      <div class="post-title">
        <h2>{{ post.boardTitle }}</h2>
      </div>
      <div class="img-box">
        <img :src="'data:image/png;base64,' + post.image" />
      </div>
      <div class="post-card-info">
        <span>작성일 : {{ formatDate(post.createdAt) }}</span>
        <span>조회수 : {{ post.boardHit }}</span>
      </div>
    </div>

    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- Detailed information goes here -->
        <div class="boardDetail-out">
          <button class="close-button" @click="closeModal">닫기</button>
        </div>
        <div class="boardDetail-in">
          <div class="carousel">
            <button @click="showPreviousImage">이전</button>
            <div class="img-slide">
              <img :src="'data:image/png;base64,' + modalData.image[currentImageIndex]" />
            </div>
            <button @click="showNextImage">다음</button>
          </div>
          <button
            class="heart-btn"
            :class="{ filled: isLiked }"
            @click="toggleLike(modalData.boardId)"
          >
            &#x2764;
            <!-- 하트 아이콘 -->
          </button>
          <h1>{{ modalData.boardTitle }}</h1>
          <p>작성자: {{ modalData.userEmail }}</p>
          <p>작성일: {{ modalData.createdAt }}</p>
          <p>조회수: {{ modalData.boardHit }}</p>
          <p>좋아요: {{ modalData.boardLikes }}</p>
          <!-- <img :src="'data:image/png;base64,' + modalData.image[0]" alt="post image" width="400"> -->
          <p>{{ modalData.boardContent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-slide {
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel img {
  max-width: 100%;
  height: auto;
}
.modal-content {
  width: 70%;
  height: 80%;
}
.close-button {
  position: absolute;
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

.img-box {
  width: 90%;
  height: 70%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.post-title {
  width: 90%;
  height: 15%;
  text-align: center;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heart-btn {
  color: #ccc; /* 기본적으로 비어있는 하트 */
  /* ... 기타 스타일 ... */
}

.heart-btn.filled {
  color: red; /* 좋아요가 활성화되었을 때 꽉 찬 하트 */
}

.close-button:hover {
  background-color: #495057;
  color: white;
  border: 1px solid #495057;
}
.boardDetail-out {
  min-height: 40px;
  position: relative; /* 상대 위치 지정 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.boardDetail-in {
  position: relative; /* 상대 위치 지정 */
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-card {
  margin: 20px;
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
  font-size: 1.3rem;
}

.post-card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 15%;
  margin-top: 5px;
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
