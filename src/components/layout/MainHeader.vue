<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
function handleSelect(key, keyPath) {
  console.log(key, keyPath);
}
</script>

<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">
      <img
        style="width: 50px; height: 50px;"
        src="@/assets/img/logo.png"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="3">
      <template #title>게시물</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
      <el-sub-menu index="3-4">
        <template #title>item four</template>
        <el-menu-item index="3-4-1">item one</el-menu-item>
        <el-menu-item index="3-4-2">item two</el-menu-item>
        <el-menu-item index="3-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="1">나의 여행 계획</el-menu-item>
    <el-menu-item index="2">내 주변 관광지</el-menu-item>
  </el-menu>
</template>



<style>
.flex-grow {
  flex-grow: 1;
}
</style>