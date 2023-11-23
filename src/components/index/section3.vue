<script setup></script>

<template>
  <div class="flex-container">
    <div>
      <label>나만의 여행 계획 작성하기</label>
      <img src="../../assets/img/registPlan.gif" class="left" />
    </div>
    <div>
      <label>장소 추가하기</label>
      <img src="../../assets/img/addLocation.gif" class="left" />
    </div>
  </div>
</template>

<style scoped>
.right {
  margin-top: 20px;
  width: 900px;
  height: 600px;
}
.flex-container > div {
  background-color: #f1f1f1;
  text-align: center;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
label {
  font-size: 20px; /* 글자 크기 증가 */
}
.flex-container {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.left {
  margin-top: 20px;
  width: 550px;
  height: 600px;
}
</style>
