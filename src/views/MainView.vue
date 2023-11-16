<script setup>
import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainPage from "@/components/MainPage.vue";
import List from "@/components/board/BoardList.vue";
import registPlan from "../components/plan/registPlan.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="view-container">
    <div class="header">
      <MainHeader />
    </div>
    <div class="view">
      <!-- <MainPage/> -->
      <!-- <list/> -->
      <registPlan />
    </div>

    <div class="footer">
      <!-- <MainFooter/> -->
    </div>
  </div>
</template>
<style scoped>
.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.view {
  display: flex;
  padding-top: 80px;
  /*padding-left: 200px;
  padding-right: 200px; */
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  height: 100%;
  border-left: 1px solid #e4e3e3;
  border-right: 1px solid #e4e3e3;
}
</style>
