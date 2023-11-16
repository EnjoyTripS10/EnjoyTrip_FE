<script setup>
import { ref,onMounted } from 'vue';
import PostCard from "./PostCard.vue";
import axios from 'axios';

const posts = ref([]);
const fetchPosts = async () => {
  try {
    const response = await axios.get('/board');
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
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
</script>

<template>
    <div class="board">
    <div class="header">
            <h2>게시글 목록</h2> <!-- Title -->
            <input type="text" placeholder="검색..." class="search-bar"> <!-- Search Bar -->
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
</div>
</template>

<style scoped>
.boardList {
    padding: 0px 20px 0px;
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    margin-top: 1rem;
}

.header {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-bar {
    margin: 10px 0;
    padding: 5px;
    width: 200px;
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
</style>
