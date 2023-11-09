<script setup>
import MainHeader from "./components/layout/MainHeader.vue";
import MainFooter from "./components/layout/MainFooter.vue";
import MainPage from "./views/MainPage.vue";
import HotPlace from "./components/board/HotPlace.vue";
import fun1 from "./components/fun1.vue";
import fun2 from "./components/fun2.vue";
</script>

<template>
  <el-affix :offset="0">
    <MainHeader />
  </el-affix>

  <MainPage />
  
  <fun1/>
  
  <HotPlace />
  
  <fun2/>

  <MainFooter />
</template>

<style scoped>


.title {
  text-align: center;
  margin: 20px;
}
</style>