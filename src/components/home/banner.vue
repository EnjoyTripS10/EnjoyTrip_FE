<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const searchText = ref("");

const search = () => {
  router.push(`/boardListCity/${searchText.value}`);
};
</script>

<template>
  <div class="banner">
    <div class="slogan">
      <h1>친구와 함께하는 여행 플래너!</h1>
      <p>쉽고 빠르게 여행을 계획하세요.</p>
    </div>
    <div class="banner-content">
      <div class="search-box">
        <input type="text" placeholder="장소 이름으로 검색" v-model="searchText" />
        <button @click="search">검색</button>
        <div class="link" style="color: white">
          <RouterLink to="/boardList">>추천 장소 보러가기</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100%;
  height: 100vh; /* 높이를 뷰포트 높이로 설정 */
  background: url("../../assets/img/banner1.jpg") no-repeat center center;
  background-size: cover;
  position: relative; /* 자식 요소의 위치를 상대적으로 설정 */
  filter: contrast(70%);
  color: black;
}
.slogan {
  position: absolute;
  width: 100%;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.slogan h1,
.slogan p {
  color: rgb(0, 0, 0); /* 흰색 글씨 */
  text-align: center; /* 글씨 중앙 정렬 */
  /* 필요한 경우 추가 스타일 */
}

.slogan h1 {
  font-size: 2.3em;
  font-weight: bold;
  margin-bottom: 0.5em; /* 하단 여백 */
}

.slogan p {
  font-weight: bold;
  font-size: 1.2em;
}
.search-box p {
  font-size: 18px;
  margin-bottom: 15px;
}
.banner-content {
  position: absolute;
  top: 60%;
  height: 25%;
  left: 50%;
  width: 40%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.8); /* 반투명 검정색 배경 */
  padding: 20px;
}

.link {
  position: absolute;
  right: 10px;
  margin-top: 5px;
  font-size: 13px;
}

.search-box {
  display: inline-block;
  width: 100%;
}
.search-box input {
  width: 80%;
}

.search-box input[type="text"] {
  padding: 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
}

.search-box button {
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  color: black;
}
</style>
