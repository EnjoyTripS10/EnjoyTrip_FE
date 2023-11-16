<template>
  <div>
    <h1>새로운 글 쓰기</h1>
    <form @submit.prevent="submitForm">
      <label for="title">제목:</label>
      <input type="text" id="title" v-model="title" />
      <label for="content">내용:</label>
      <textarea id="content" v-model="content"></textarea>
      <button type="submit">글쓰기</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    submitForm() {
      axios
        .post("/api/posts", {
          title: this.title,
          content: this.content,
        })
        .then((response) => {
          console.log(response.data);
          // 글쓰기가 성공적으로 완료되었을 때 처리할 코드를 작성합니다.
        })
        .catch((error) => {
          console.log(error);
          // 글쓰기가 실패했을 때 처리할 코드를 작성합니다.
        });
    },
  },
};
</script>

<style scoped></style>
