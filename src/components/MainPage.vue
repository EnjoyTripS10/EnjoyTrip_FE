<script setup>
import banner from "../components/home/banner.vue";
import imgbutton from "../components/home/imgbutton.vue";
import popular from "../components/home/popular.vue";
import location from "../components/home/location.vue";
</script>

<template>
  <div class="main-page">
    <div class="banner">
      <banner />
    </div>
    <div class="img-button">
      <imgbutton />
    </div>
    <div class="popular">
      <popular />
    </div>
    <div class="location">
      <location />
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img-button {
  height: 400px;
  margin: 100px 0px;
  align-items: center;
  justify-content: center;
}
.popular {
  width: 100vw;
  margin-top: 100px;
  height: auto;
  justify-content: center;
}
.banner {
  width: 100vw;
  height: 500px;
  margin-bottom: 30px;
}
.location {
  margin: 100px 0px;
  height: auto;
  justify-content: center;
}
</style>
