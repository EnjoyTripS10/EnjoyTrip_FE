<script setup>
import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainPage from "@/components/MainPage.vue";
import Board from "@/components/board/BoardDetail.vue";
import { RouterLink } from "vue-router";

</script>
<template>
    <div class="view-container">
        <div class="header">
            <MainHeader/>
        </div>
        <div class="view">
            <MainPage/>
            <!-- <Board/> -->
        </div>

        <div class="footer">
            <!-- <MainFooter/> -->
        </div>
    </div>

</template>
<style scoped>
.view-container {
  display: flex;
  
  width: 100%;
}
.view {
  display: flex;
  /* padding-top: 60px;
  padding-left: 200px;
  padding-right: 200px; */
  margin: 60px 200px 0px 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-left: 1px solid #e4e3e3;
  border-right: 1px solid #e4e3e3;
}
</style>