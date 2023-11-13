<script setup>
import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";


</script>
<template>
    <MainHeader/>
    
    <div class="view">
      <h1>virus</h1>
    </div>

    <MainFooter/>
</template>
<style scoped>
.view {
  display: flex;
  margin: 0;
  padding-top: 55px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>