<script setup></script>

<template>
  <div class="flex-container">
    <div>
        <label>내 주변 관광지 찾아보기</label>
        <img src="../../assets/img/useMap.gif" class="right" />
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
    font-size: 20px; /* 글자 크기 증가 */;
}
.flex-container {
  display: flex;
  justify-content: space-between;
}


.left {
    margin-top: 20px;
  width: 450px;
  height: 600px;
}
</style>
