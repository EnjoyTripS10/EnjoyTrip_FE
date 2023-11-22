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
          <li v-for="user in filteredUser" :key="user.userEmail">
            <img src="{{ user.picture }}" alt="">
            {{ user.userName }}
            <button @click="addUserList(user)">등록</button>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from '@/axiosConfig.js';

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
  return users.value.filter((user) => user.userEmail.includes(searchQuery.value.trim()));
});

const users = ref([]);
const beforeUsers = async () => {
  try {
    // 여기에 서버의 사용자 검색 API 엔드포인트를 입력하세요.
    const response = await axios.get("/api/user/findmembers");
    // filteredUser.value = response.data;
    users.value = response.data;
    console.log(users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
onBeforeMount(beforeUsers);

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
