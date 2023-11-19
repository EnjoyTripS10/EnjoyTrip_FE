<script setup>
import { RouterLink } from "vue-router";


</script>

<template>
  <div class="imgbutton">
    <div class="card">
      <div class="face face1">
        <div class="content">
          <img class="img-btn" src="../../assets/img/imgbtn1.jpg" />
        </div>
      </div>
      <div class="face face2">
        <div class="content">
          <p>친구와 함께 여행계획 세우기</p>
          <RouterLink to="/registPlan">페이지 이동</RouterLink>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="face face1">
        <div class="content">
          <img class="img-btn" src="../../assets/img/imgbtn4.jpg" />
        </div>
      </div>
      <div class="face face2">
        <div class="content">
          <p>지금 까지 방문하였던 장소를 소개</p>
          <RouterLink to="/planList">페이지 이동</RouterLink>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="face face1">
        <div class="content">
          <img class="img-btn" src="../../assets/img/imgbtn6.jpg" />
        </div>
      </div>
      <div class="face face2">
        <div class="content">
          <p>주변 관광지 찾아보기</p>
          <RouterLink to="/findLocation">페이지 이동</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-btn {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  width: 100%;
  height: 100%;
}
.imgbutton {
  width: 1000px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.imgbutton .card {
  position: relative;
  cursor: pointer;
}

.imgbutton .card .face {
  width: 300px;
  height: 200px;
}

.imgbutton .card .face.face1 {
  position: relative;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.imgbutton .card .face.face1 .content {
  opacity: 0.8;
}

.imgbutton .card:hover .face.face1 .content {
  opacity: 1;
}

.imgbutton .card .face.face1 .content h3 {
  margin: 10px 0 0;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 1.5em;
}

.imgbutton .card .face.face2 {
  position: relative;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.8);
}

.container .card .face.face2 .content p {
  margin: 0;
  padding: 0;
}

.imgbutton .card .face.face2 .content a {
  margin: 15px 0 0;
  display: inline-block;
  text-decoration: none;
  font-weight: 900;
  color: #333;
  padding: 5px;
  border: 1px solid #333;
}

.imgbutton .card .face.face2 .content a:hover {
  background: #333;
  color: #fff;
}
</style>
