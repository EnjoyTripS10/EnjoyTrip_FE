<script setup>
import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainPage from "@/components/MainPage.vue";

</script>
<template>
    <MainHeader/>
    
    <div class="view">
      <MainPage/>
    </div>

    <MainFooter/>
</template>
<style scoped>
.view {
  display: flex;
  padding-top: 60px;
  padding-left: 200px;
  padding-right: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>