<script setup></script>

<template>
  <div class="flex-container">
    <div class="box1">
      <label class="label-text">장소 추천</label>
      <img src="../../assets/img/postSample.png" class="left" />
    </div>

    <div class="box2">
      <div class="grid-item" style="grid-row: 1 / 3; grid-column: 1 / 3">
        <img src="../../assets/img/photo4.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <img src="../../assets/img/photo1.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item">
        <img src="../../assets/img/photo2.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <img src="../../assets/img/photo5.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <img src="../../assets/img/photo8.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <img src="../../assets/img/photo9.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <img src="../../assets/img/photo3.jpg" alt="" width="100%" height="100%" />
      </div>
      <label class="label-text" style="grid-column: 1 / 4">자기만의 비밀장소 이젠</label>
    </div>
  </div>
</template>

<style scoped>
.label-text {
    font-size: 21px; /* 글자 크기 증가 */
}
.flex-container {
  display: flex;
  justify-content: space-between;
}

.box1 {
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 600px;
  margin: 0px 50px;
}

.box1 > label {
  font-size: 25px; /* 글자 크기 증가 */
}

.box2 {
  text-align: center;
  font-size: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 600px;
  height: 600px;
  margin: 0px 50px;
}

.left {
  margin-top: 20px;
  width: 450px;
  height: 600px;
}
</style>
