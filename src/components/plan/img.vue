<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axiosConfig.js";

const firstImageUrl = ref("");

const fetchFirstImageUrl = async () => {
  console.log("2");
  const response = await axios.get("/api/search?query=태평소국밥");
  firstImageUrl.value = response.data;
  console.log(response.data);
};

// 즉시 이미지 검색 실행
onMounted(() => {
  console.log("1");
  fetchFirstImageUrl("월평불짬뽕");
});
</script>

<template>
  <div>
    <img v-if="firstImageUrl" :src="firstImageUrl" alt="검색 이미지" />
  </div>
</template>

<style scoped></style>
