<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
const props = defineProps({
  photo: String,
    text: String,
location: String
})
</script>

<template>
      <el-card :body-style="{ padding: '0px' }" shadow="always">
        <img
          :src="photo"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ text }}</span>
          <div class="bottom">
            <span>{{ location }}</span>
            <el-button text class="button">더보기</el-button>
          </div>
        </div>
      </el-card>
</template>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>