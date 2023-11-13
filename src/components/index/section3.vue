<script setup>

</script>

<template>
<div class="flex-container">
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
        <div class="box1">
            <img src="../../assets/img/postSample.png" class="left"></div>
    </div>
</template>

<style scoped>

.flex-container {
  display: flex;
  justify-content: space-between;
}

.box1 {
  width: 450px;
  height: 600px;
  margin: 0px 90px;
}

.box2 {
    display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 600px;
  height: 600px;
  margin: 0px 90px;
}

.left {
    width: 450px;
    height: 600px;
}

</style>