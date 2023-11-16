<template>
  <div class="modal" v-if="isModalOpen">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">X</button>
      <input type="text" v-model="searchQuery" placeholder="사용자 email로 검색" />
      <ul class="user-list">
        <li v-for="user in filteredUsers" :key="user.id" @click="addUser(user)">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isModalOpen: Boolean,
  users: {
    type: Array,
    default: () => [], // 기본값을 빈 배열로 설정
  },
  onAdd: Function,
});

const emit = defineEmits(["update:isModalOpen"]);

const searchQuery = ref("");
const filteredUsers = computed(() => {
  // users가 정의되어 있을 때만 filter를 수행
  return (
    props.users &&
    props.users.filter((user) => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const closeModal = () => {
  emit("update:isModalOpen", false);
};

const addUser = (user) => {
  props.onAdd(user);
  closeModal();
};
</script>

<style scoped>
.modal {
  /* 모달 스타일링 */
}

.modal-content {
  /* 모달 내용 스타일링 */
}

.close-btn {
  /* 닫기 버튼 스타일링 */
}

.user-list {
  /* 사용자 목록 스타일링 */
}
</style>
