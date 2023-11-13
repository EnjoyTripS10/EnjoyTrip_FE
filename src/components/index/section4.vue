<script setup>

</script>

<template>
<div class="flex-container">
    <div class="box1">
        <img src="../../assets/img/postSample.png" class="left">
    </div>
    
        <div class="box2">
            <div class="grid-item" style="grid-row: 1 / 3; grid-column: 1 / 3;">
                <img src="../../assets/img/photo4.jpg" alt="" width="100%" height="100%">
                
            </div>
            <div class="grid-item"></div>
            <div class="grid-item">
                <img src="../../assets/img/photo1.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="grid-item">
                <img src="../../assets/img/photo2.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="grid-item"></div>
            <div class="grid-item">
                <img src="../../assets/img/photo5.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="grid-item"></div>
            <div class="grid-item">
                <img src="../../assets/img/photo8.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item">
                <img src="../../assets/img/photo9.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="grid-item"></div>
            <div class="grid-item">
                <img src="../../assets/img/photo3.jpg" alt="" width="100%" height="100%">
            </div>
        </div>
</div>
</template>

<style scoped>

.list-enter-active, .list-leave-active {
  transition: opacity 1s; /* 이미지의 등장 속도를 1초로 설정 */
}
.list-enter, .list-leave-to {
  opacity: 0;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.box1 {
    display: flex; 
    justify-content: center; 
    align-items: center;
  width: 450px;
  height: 600px;
  margin: 0px 50px;
}

.box2 {
    display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 600px;
  height: 600px;
  margin: 0px 50px;
}

.left {
    width: 450px;
    height: 600px;
}

</style>