<!--UserAddModal.vue-->

<template>
  <div class="modal" v-if="isModalOpen">

    <div class="modal-content">
      <form @submit.prevent="addUserList(findUser)">
      <div class="input-close">
        <input
          class="input-box"
          type="text"
          v-model="searchQuery"
          placeholder="사용자 email로 검색"
        />
        <button type="button" class="close-btn" @click="closeModal">X</button>
      </div>
    
      
      <ul class="user-list">
        <div>
            <p>{{ findUser }}</p>
            <button @click="addUserList(findUser)">등록</button>
        </div>
      </ul>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";

const users = ref([{}]);
const findUser = ref({});
const props = defineProps({
  isModalOpen: Boolean,
  // users: {
  //   type: Array,
  //   default: () => [], // 기본값을 빈 배열로 설정
  // },
});

const emit = defineEmits(["update:isModalOpen", "onAdd"]);

const searchQuery = ref("");


const searchUsers = async (query) => {
  // if (query.trim() === '') {
  //   filteredUser.value = [];
  //   return;
  // }

  try {
    // 여기에 서버의 사용자 검색 API 엔드포인트를 입력하세요.
    const response = await axios.get(`/api/user/findmember/${query}`);
    
     // 서버 응답을 filteredUser에 할당
     console.log("come???")
     findUser.value = {email :response.data.userEmail, name : response.data.userName}
     console.log(findUser.value)

  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

watch(searchQuery, (newValue) => {
  searchUsers(newValue);
});



const closeModal = () => {
  emit("update:isModalOpen", false);
};

const addItemToList = (item) => {
  users.value.push(item);
};

const addUserList = (user) => {
  // console.log(user.name);
  addItemToList(user);
  emit("onAdd", users);
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
