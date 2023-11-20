<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PostCard from "./PostCard.vue";
import axios from "axios";

const posts = ref([]);
const searchQuery = ref("");
const fetchPosts = async () => {
  try {
    const response = await axios.get("/boardLiked");
    posts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
onMounted(fetchPosts);

const sort = (criteria) => {
  // Implement sorting logic based on the criteria (views, likes, or recent)
  // For example:
  // if (criteria === 'views') {
  //     posts.value.sort((a, b) => b.views - a.views);
  // }
  // ... other criteria
};

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const router = useRouter();

const registerPlace = () => {
  router.push("uploadboard");
};

const showLikedPosts = () => {
  router.push("boardList");
};
</script>

<template>
  <div class="board">
    <div class="header">
      <h2>내가 좋아하는 장소 목록</h2>
      <!-- Title -->
      <div class="search-container">
        <input
          type="text"
          placeholder="검색..."
          v-model="searchQuery"
          @keyup.enter="fetchSearchedPosts"
          class="search-bar"
        />
        <button @click="fetchSearchedPosts" class="search-btn">검색</button>
      </div>
      <div class="sorting-options">
        <!-- Sorting Options -->
        <button @click="sort('views')">조회수</button>
        <button @click="sort('likes')">좋아요</button>
        <button @click="sort('recent')">최신글</button>
      </div>
    </div>

    <div class="boardList">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="dropdown-container" v-if="isDropdownOpen">
      <ul class="dropdown-menu">
        <li @click="registerPlace">장소 등록하기</li>
        <li @click="showLikedPosts">전체 게시물</li>
      </ul>
    </div>
    <button class="toggle-btn" @click="toggleDropdown">메뉴</button>
  </div>
</template>

<style scoped>
.post-card-style {
  width: 18%;
  height: 30%;
  margin: 1%;
}
.board {
  margin-top: 50px;
  width: 80%;
}
.dropdown-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
.dropdown-container {
  position: fixed;
  bottom: 80px; /* 버튼의 크기에 따라 조정 */
  right: 20px;
  width: 200px; /* 드롭박스의 너비 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #4c72af;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}
.boardList {
  padding: 0px 20px 0px;
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin-top: 1rem;
}

.header {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  margin: 10px 0;
  padding: 5px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.sorting-options {
  display: flex;
  gap: 10px;
}

.sorting-options button {
  padding: 5px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.search-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn {
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #4c72af;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #4c72af;
}
</style>
