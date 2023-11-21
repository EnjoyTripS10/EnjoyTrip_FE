<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="img-btn-container">
    <div class="img-btn-title">
      <h1>지금 바로 시작해보세요!</h1>
    </div>
    <div class="imgbutton">
      <div class="card">
        <div class="face face1">
          <div class="content">
            <img class="img-btn" src="../../assets/img/imgbtn1.jpg" />
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <p>
              함께 만드는 추억, <br />
              친구들과 함께 여행을 떠나<br />
              새로운 경험을 만나보세요.<br />
              <br />
            </p>
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
            <p>
              여행의 발자취를 따라,<br />
              지금까지의 여정을 되돌아보세요.<br />
              <br />
              <br />
            </p>
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
            <p>
              근처 숨은 관광 명소 발견하기,<br />
              주변의 명소들을 방문하며<br />
              새로운 추억을 만들어보세요.<br />
              <br />
            </p>
            <RouterLink to="/findLocation">페이지 이동</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-btn-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.img-btn-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 50px;
}
.img-btn {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  width: 100%;
  height: 100%;
  justify-content: center;
  font-weight: 600;
}
.imgbutton {
  width: 1500px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.imgbutton .card {
  position: relative;
  cursor: pointer;
}

.imgbutton .card .face {
  width: 400px;
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
