<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 이미지 클릭 이벤트 핸들러
const navigateToBoardListCity = (cityName) => {
  router.push(`/boardListCity/${cityName}`);
};
</script>

<template>
  <div class="location-title">
    <h1>지역별 국내 인기 여행지</h1>
  </div>
  <div class="box2">
    <div
      class="grid-item image-bigcontainer"
      style="grid-row: 1 / 3; grid-column: 1 / 3"
      @click="navigateToBoardListCity('서울')"
    >
      <img src="../../assets/img/location/seoul.jpg" alt="" style="width: 360px; height: 360px" />
      <div class="overlay">서울</div>
    </div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/gangwon.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('강원')"
      />
      <div class="overlay">강원</div>
    </div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/deajeon.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('대전')"
      />
      <div class="overlay">대전</div>
    </div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/jeonju.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('전주')"
      />
      <div class="overlay">전주</div>
    </div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/busan.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('부산')"
      />
      <div class="overlay">부산</div>
    </div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/gwangju.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('광주')"
      />
      <div class="overlay">광주</div>
    </div>
    <div class="grid-item image-container"></div>
    <div class="grid-item image-container">
      <img
        src="../../assets/img/location/jeju.jpg"
        alt=""
        style="width: 175px; height: 175px"
        @click="navigateToBoardListCity('제주')"
      />
      <div class="overlay">제주</div>
    </div>
  </div>
</template>

<style scoped>

.location-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  font-size: 2rem;
  font-weight: 800;
 margin-bottom: 70px;
}
.box2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 730px;
  height: 730px;
  margin: 0px 30px;
}

.grid-item img {
  transition: transform 0.3s ease-in-out;
  filter: contrast(60%);
  border: 1px solid rgb(23, 24, 27);
}

.grid-item img:hover {
  transform: scale(1.1);
  filter: none;
  z-index: 500;
}

.grid-item:hover {
  z-index: 500; /* 호버 시 z-index 증가 */
}

.image-container:hover .overlay {
  display: none; /* 텍스트를 숨김 */
}

/* 큰 이미지 컨테이너에 대한 호버 상태 */
.image-bigcontainer:hover .overlay {
  display: none; /* 텍스트를 숨김 */
}

.image-bigcontainer {
  position: relative;
  width: 360px;
  height: 360px;
}

.image-container {
  position: relative;
  width: 175px;
  height: 175px;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: transparent;
  /* background-color: black;
    backdrop-filter: blur(10px); */
  transform: translate(-50%, -50%);
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  z-index: 3;
}
</style>
