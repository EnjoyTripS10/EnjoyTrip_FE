<!--UserAddModal.vue-->

<template>
  <div class="modal" v-if="isModalOpen">
    <div class="modal-content">
      <div class="input-close">
        <input
          class="input-box"
          type="text"
          v-model="searchQuery"
          placeholder="사용자 email로 검색"
        />
        <button class="close-btn" @click="closeModal">X</button>
      </div>
      <ul class="user-list">
        <div>
          <li v-for="user in filteredUser" :key="user.email">
            {{ user.name }}
            <button @click="addUserList(user)">등록</button>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isModalOpen: Boolean,
  // users: {
  //   type: Array,
  //   default: () => [], // 기본값을 빈 배열로 설정
  // },
});

const emit = defineEmits(["update:isModalOpen", "onAdd"]);

const searchQuery = ref("");

const filteredUser = computed(() => {
  if (searchQuery.value.trim() === "") {
    return [];
  }
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const users = ref([
  { email: "8", name: "김범수" },
  { email: "9", name: "김보경" },
  { email: "3", name: "서정현" },
  { email: "4", name: "이용준" },
  { email: "5", name: "이수경" },
  { email: "6", name: "황정민" },
  { email: "7", name: "최재식" },
]);

const closeModal = () => {
  emit("update:isModalOpen", false);
};

const addUserList = (user) => {
  // console.log(user.name);
  emit("onAdd", user);
  // emit("updateUsers", users.value);
  closeModal();
};
</script>

<style scoped>
.modal {
  margin-top: 20px;
}

.input-box {
  width: 90%;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.input-close {
  display: flex;
  align-items: space-between;
}
.close-btn {
  border: 1px solid black;
  margin-left: 3px;
  width: 10%;
}

.user-list {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}

.user-list div li {
  margin-bottom: 10px;
}

.user-list div button {
  border: 1px solid black;
}
</style>
