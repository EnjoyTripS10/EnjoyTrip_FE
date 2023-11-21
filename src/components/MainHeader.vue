<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  // 쿠키 삭제
  document.cookie = "user-key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // 라우터를 홈 경로로 리디렉션
  router.push("/");
};
</script>

<template>
  <header class="header">
    <RouterLink to="/home" class="logo">VirusTrip</RouterLink>
    <nav class="navbar">
      <RouterLink to="/boardList">장소 목록</RouterLink>
      <RouterLink to="/planList">계획 목록</RouterLink>
      <RouterLink to="/registPlan">계획 작성</RouterLink>
      <RouterLink to="/findLocation">주변 장소</RouterLink>
      <RouterLink to="/" @click="logout()">로그아웃</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed; /* 헤더 위치를 고정 */
  top: 0; /* 상단에서 0px의 위치 */
  left: 0; /* 좌측에서 0px의 위치 */
  width: 100%;
  height: 60px; /* 헤더 너비를 화면 전체로 설정 */
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background-color: #f5f5f7;
  color: rgb(0, 0, 0);
  /* padding: 10px 20px; */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 하단 그림자 효과 추가 */
  z-index: 1000; /* 다른 요소들 위에 헤더가 오도록 z-index 설정 */
  overflow: hidden;
}
.logo {
  margin-left: 150px;
  width: 240px;
  font-size: 24px;
  font-weight: bold;
}
.navbar {
  display: flex;
  justify-content: flex-end;
  margin-right: 150px;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
}
.navbar a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  margin: 0 20px;
}
</style>
