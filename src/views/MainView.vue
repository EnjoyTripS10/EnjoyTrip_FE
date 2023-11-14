<script setup>
import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainPage from "@/components/MainPage.vue";

</script>
<template>
    <MainHeader/>
    <div class="view-container">

      <div class="view">
        <MainPage/>
      </div>
    </div>

    <MainFooter/>
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
  height: 100vh;
  border-left: 1px solid #e4e3e3;
  border-right: 1px solid #e4e3e3;
}
</style>