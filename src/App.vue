<script setup>
import MainHeader from "./components/layout/MainHeader.vue";
import MainFooter from "./components/layout/MainFooter.vue";
import MainPage from "./views/MainPage.vue";
import index from "./views/index.vue";

</script>

<template>
  <el-affix :offset="0">
    <MainHeader />
  </el-affix>
  <MainPage />
  <MainFooter />
  <!-- <index/> -->
</template>

<style scoped>

.title {
  text-align: center;
  margin: 20px;
}
</style>