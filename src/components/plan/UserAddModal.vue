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
  return users.value.filter(
    (user) => user.email.toLowerCase() === searchQuery.value.toLowerCase().trim()
  );
});

const users = ref([
  { email: "pmsd41@gmail.com", name: "김범수" },
  { email: "qhrud@gmail.com", name: "김보경" },
  { email: "wjdgus@gmail.com", name: "서정현" },
  { email: "dydwns@gmail.com", name: "이용준" },
  { email: "tnrud@gmail.com", name: "이수경" },
  { email: "wjdals@gmail.com", name: "황정민" },
  { email: "wotlr@gmail.com", name: "최재식" },
  { email: "eodud@gmail.com", name: "이대영" },
  { email: "guswjd@gmail.com", name: "권현정" },
  { email: "eodms@gmail.com", name: "강대은" },
  { email: "cksgus@gmail.com", name: "남찬현" },
  { email: "woans@gmail.com", name: "이재문" },
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
