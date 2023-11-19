<!-- LocationModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>장소 추가</h2>
      <!-- 장소 추가 폼 또는 내용 -->
      <div v-if="isMapRendered">
      <Map :updateLocation="updateParentLocation" />
    </div>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Map from "./SelectLocation.vue";

const props = defineProps({
  isVisible: Boolean,
});

const isMapRendered = ref(false);

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    // 모달이 열렸을 때 지도 렌더링
    isMapRendered.value = true;
  } else {
    // 모달이 닫혔을 때 지도 렌더링 중지
    isMapRendered.value = false;
  }
});

const emit = defineEmits(["update:isVisible", "addLocationToPlan"]);

const closeModal = () => {
  emit("update:isVisible", false);
};

const inLocation = ref({});

const updateParentLocation = (newLocation, showModal) => {
  inLocation.value = newLocation;
  console.log(inLocation.value);
  emit("addLocationToPlan", inLocation.value); // 새로운 이벤트 발생
};
</script>

<style scoped>
.modal-overlay {
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 뿌옇게 투명도 적용 */
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  z-index: 1000; /* 다른 요소들 위에 오도록 z-index 설정 */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%; /* 모달의 너비 */
  max-width: 500px; /* 최대 너비 */
}
</style>
