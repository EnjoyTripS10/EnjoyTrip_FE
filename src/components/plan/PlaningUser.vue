<!--PlaningUser.vue-->

<template>
  <div class="user-list">
    <label class="label">사용자 목록</label>
    <div class="user-box">
      <div class="list" v-for="user in users" :key="user.id">
        <!-- <img :src="user.profileImage" :alt="user.name" /> -->
        <!-- <img class="profile-img" :src="user.profileImage" /> -->
        <img
          class="profile-img"
          :src="user.picture ? user.picture : '../src/assets/img/logo_bg.png'"
        />
        <p>{{ user.userName }}</p>
        <button class="delete-btn" @click="deleteUser(user.userEmail)">X</button>
      </div>
      <button class="add-user-btn" @click="showModal">사용자 추가</button>
      <UserAddModal
        :isModalOpen="isModalOpen"
        @onAdd="addUser"
        @update:isModalOpen="isModalOpen = $event"
      />
    </div>
  </div>
</template>
<!--:users="allUsers" 프롭으로 넘겨줄 유저값-->
<script setup>
import { ref } from "vue";
import UserAddModal from "./UserAddModal.vue";
import cookie from "@/utils/cookie.js";

// postId prop을 받습니다.
const props = defineProps({
  postId: String,
  updateUsers: Function,
});

const emit = defineEmits(["updateUsers"]);

const deleteUser = (userId) => {
  const index = users.value.findIndex((user) => user.userEmail === userId);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
  console.log(cookie.getCookie("user"));
};

const isModalOpen = ref(false);

const users = ref([]);

const showModal = () => {
  isModalOpen.value = true;
};

const addUser = (newUser) => {
  const userExists = users.value.some((user) => user.userEmail === newUser.userEmail);

  if (userExists) {
    alert("이미 등록된 사용자입니다.");
  } else {
    // console.log(newUser);
    users.value.push(newUser);
    console.log(users.value);
    emit("updateUsers", users.value);
  }
};
// onMounted(async () => {
//   // 서버로부터 사용자 데이터를 가져옵니다.
//   const fetchUsers = async () => {
//     const response = await fetch(`/api/users-on-post/${props.postId}`);
//     const data = await response.json();
//     users.splice(0, users.length, ...data);
//   };

//   fetchUsers();

//   // 실시간 업데이트를 위한 추가 로직 필요
// });
</script>

<style scoped>
.add-user-btn {
  border: 1px solid #000000;
  border-radius: 3px;
  margin-top: 20px;
  width: 100%;
}

.add-user-btn:hover {
  background-color: #000000;
  border: 1px solid #ffffff;
  color: #ffffff;
}

.label {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.list {
  align-items: center;
  display: flex;
  gap: 10px;
  margin-left: 40%;
  margin-top: 10px;
  width: 100%;
}

.profile-img {
  border-radius: 50%;
  height: 30px;
  object-fit: cover;
  width: 30px;
}

.user-box {
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  min-height: 1000px;
  padding: 20px;
  width: 100%;
}

.user-list {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
}
</style>
