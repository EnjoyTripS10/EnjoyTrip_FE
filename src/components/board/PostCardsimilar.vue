<script setup>
import { ref } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const formatDate = (datetime) => {
  if (datetime) {
    return datetime.split("T")[0];
  }
};

// 이미지
const currentImageIndex = ref(0);
</script>

<template>
  <div>
    <div class="post-card">
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
  </div>
</template>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
}

h1 {
  font-family: "Arial", sans-serif; /* 글꼴 설정 */
  font-size: 18px; /* 글자 크기 */
  color: #333; /* 글자 색상 */
  text-align: center; /* 텍스트 중앙 정렬 */
  font-weight: bold; /* 글자 굵기 */
}

.img-box {
  width: 100%;
  height: 50%;
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

.post-card {
  margin-bottom: 20px;
  width: 100%;
  height: 80%;
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
  font-size: 1rem;
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
</style>
