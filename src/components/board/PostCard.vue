<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import PostCardsimilar from "./PostCardsimilar.vue";
import axios from "@/axiosConfig.js";
import { shuffle } from "lodash";

const router = useRouter();
const showModal = ref(false);
const modalData = ref({});
const isLiked = ref(false);
const status = ref(0);
const posts = ref([]);
const urlPhoto = ref("");

const getImgUrl = async (item) => {
  try {
    const response = await axios.get(`/api/search?query=` + item.locationName);
    urlPhoto.value = response.data;
    if (item.locationName === "훈불") {
      urlPhoto.value = "https://i.ibb.co/0rY56y8/happy-Claas7.jpg";
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
  }
};

const fetchPosts = async (data) => {
  try {
    const response = await axios.get("/board");
    posts.value = response.data;
    filtereData(data);
    posts.value = shuffle(posts.value);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const openModal = async (boardId) => {
  showModal.value = true;

  try {
    const response = await axios.get(`/board/${boardId}`);
    modalData.value = response.data;
    isLiked.value = modalData.value.like;
    // posts.value = shuffle(posts.value);
    fetchPosts(modalData.value.locationType);

    fetchComments(boardId);
  } catch (error) {
    console.error("Error", error);
  }
};

const filtereData = (type) => {
  posts.value = posts.value.filter((post) => post.locationType === type);
  filtereDataSelf();
};

const filtereDataSelf = () => {
  console.log(posts.value);
  posts.value = posts.value.filter((post) => post.boardId !== modalData.value.boardId);
};

const kakaoShare = async (data) => {
  console.log(data);
  getImgUrl(data);
  window.Kakao.Share.createDefaultButton({
    container: "#kakaotalk-sharing-btn",
    objectType: "location",
    address: data.locationAddr,
    addressTitle: data.locationName,
    content: {
      title: data.boardTitle,
      description: "장소 : " + data.locationName + "\n내용 : " + data.boardContent,
      // imageUrl: "https://i.ibb.co/0rY56y8/happy-Claas7.jpg",
      imageUrl: urlPhoto.value,
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: "http://192.168.35.7:8080/boardList",
        webUrl: "http://192.168.35.7:8080/boardList",
      },
    },
    social: {
      likeCount: data.boardLikes,
    },
  });
};

const closeModal = () => {
  showModal.value = false;
  console.log(showModal.value);
};

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const toggleLike = async (boardId) => {
  isLiked.value = !isLiked.value; // 상태 토글  `
  status.value++;
  try {
    // 서버에 좋아요 상태 업데이트 요청
    const response = await axios.post(
      `/board/like`,
      { boardId, isLiked: isLiked.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

watch(isLiked, (newVal) => {
  if (status.value !== 0) {
    if (newVal === true) {
      modalData.value.boardLikes++;
    } else {
      modalData.value.boardLikes--;
    }
  }
});

const formatDate = (datetime) => {
  if (datetime) {
    return datetime.split("T")[0];
  }
};

const searchNaver = (place) => {
  console.log(place.place_name);
  const cityWords = place.locationAddr.split(" ");
  const city = encodeURIComponent(cityWords[0]);
  const name = encodeURIComponent(place.locationName);
  const url = `https://search.naver.com/search.naver?query=${city} ${name}`;
  window.open(url, "_blank");
};

// 수정 이벤트 핸들러
const editBoard = (boardId) => {
  // 수정 관련 로직
  router.push(`/updateBoard/${boardId}`);
};

// 삭제 이벤트 핸들러
const deleteBoard = async (boardId) => {
  try {
    await axios.delete(`/board/${boardId}`);
    // 삭제 후 할 행동, 예를 들어 목록 페이지로 이동
    closeModal();
    router
      .push({ name: "boardList" })
      .then(() => {
        // router.push가 완료된 후 새로고침
        window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
        console.error("라우팅 오류:", err);
      });
  } catch (error) {
    console.error("삭제 중 오류 발생: ", error);
    // 오류 처리 로직
  }
};
const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % modalData.value.image.length;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + modalData.value.image.length) % modalData.value.image.length;
};

//댓글
const newComment = ref("");

const submitComment = async (boardId) => {
  if (!newComment.value.trim()) {
    alert("댓글을 입력하세요.");
    return;
  }

  try {
    // Axios를 사용하여 서버에 댓글 데이터를 전송
    const response = await axios.post(
      `/board/comment`,
      { boardId: boardId, content: newComment.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("댓글 등록 성공:", response);

    // 댓글 등록 후 필요한 작업 수행 (예: 댓글 목록 갱신, 입력란 초기화 등)
    newComment.value = ""; // 입력란 초기화
    fetchComments(boardId);
  } catch (error) {
    console.error("댓글 등록 실패:", error);
  }
};

// 댓글 불러오기
const comments = ref([]);

const fetchComments = async (boardId) => {
  try {
    const response = await axios.get(`/board/comment/${boardId}`);
    comments.value = response.data;
  } catch (error) {
    console.error("댓글 로딩 실패:", error);
  }
};

// 삭제
const deleteComment = async (commentId, boardId) => {
  try {
    const response = await axios.delete(`/board/comment/${commentId}`);
    fetchComments(boardId);
  } catch (error) {
    console.error("댓글 로딩 실패:", error);
  }
};

// onMounted(fetchComments);
</script>

<template>
  <div>
    <div class="post-card" @click="openModal(post.boardId)">
      <!-- <img :src="post.image" alt="post image"> -->
      <div class="post-title">
        <h2>{{ post.boardTitle }}</h2>
      </div>
      <div class="img-box">
        <img :src="'data:image/png;base64,' + post.image" />
      </div>
      <div class="post-card-info">
        <span>작성일 : {{ formatDate(post.createdAt) }}</span>
        <span>조회수 : {{ post.boardHit }}</span>
      </div>
    </div>

    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- Detailed information goes here -->
        <div class="boardDetail-out">
          <button class="close-button" @click="closeModal">닫기</button>
        </div>
        <div class="boardDetail-in">
          <div class="board-header">
            <div class="header-info">
              <h1>{{ modalData.boardTitle }}</h1>
              <div class="header-info-right">
                <h2>{{ modalData.userEmail }}</h2>
                <h2>{{ formatDate(modalData.createdAt) }}</h2>
              </div>
            </div>
            <p @click="searchNaver(modalData)">{{ modalData.locationName }}</p>
          </div>
          <div class="modal-body">
            <div class="carousel">
              <button class="carousel-control prev" @click="prevImage()">&lt;</button>
              <div class="img-slide">
                <img
                  v-for="(img, index) in modalData.image"
                  :src="'data:image/png;base64,' + img"
                  v-show="index === currentIndex"
                />
                <!-- <img :src="'data:image/png;base64,' + modalData.image[0]" /> -->
                <!-- <img :src="'data:image/png;base64,' + modalData.image" /> -->
              </div>
              <button class="carousel-control next" @click="nextImage()">&gt;</button>
            </div>
          </div>

          <div class="share">
            <button
              class="heart-btn"
              :class="{ filled: isLiked }"
              @click="toggleLike(modalData.boardId)"
            >
              &#x2764;
              <!-- 하트 아이콘 -->
            </button>
            <a
              id="kakaotalk-sharing-btn"
              href="javascript:;"
              class="centered"
              @click="kakaoShare(modalData)"
            >
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 보내기 버튼"
                style="width: 30px; height: 30px"
              />
            </a>
          </div>
          <div class="board-info">
            <label>조회수 : {{ modalData.boardHit }}</label
            ><br />
            <label>좋아요 : {{ modalData.boardLikes }}</label
            ><br />
            <br />
            <!-- <img :src="'data:image/png;base64,' + modalData.image[0]" alt="post image" width="400"> -->
            <label>장소 설명 :</label>
            <p>{{ modalData.boardContent }}</p>
          </div>

          <div class="comment">
            <div class="comments-section">
              <div class="comment-list">
                <div class="comment" v-for="(comment, index) in comments" :key="index">
                  <div class="comment-info">
                    {{ comment.userEmail.split("@")[0] }} : {{ comment.commentContent }}
                  </div>
                  <div>
                    <button
                      class="comment-delete-button"
                      v-if="comment.mine"
                      @click="deleteComment(comment.commentId, modalData.boardId)"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
              <div class="new-comment">
                <textarea
                  class="comment-input"
                  v-model="newComment"
                  placeholder="댓글을 입력하세요..."
                ></textarea>
                <button class="submit-comment" @click="submitComment(modalData.boardId)">
                  등록
                </button>
              </div>
            </div>
          </div>

          <div class="similar">
            <label for="slides">유사 게시물 추천</label>
            <div class="post-card-style">
              <PostCardsimilar
                v-for="post in posts.slice(0, 4)"
                :key="post.id"
                :post="post"
                class="similar-card"
              />
            </div>
          </div>
          <div class="edit-delete-buttons">
            <button v-if="modalData.mine" @click="editBoard(modalData.boardId)">수정</button>
            <button v-if="modalData.mine" @click="deleteBoard(modalData.boardId)">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-section {
  width: 80%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.new-comment {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.comment-input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  height: 80px;
  resize: none;
}

.submit-comment {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-list {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

/* 댓글 하나하나를 위한 스타일 */
.comment {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.comment-info {
  font-weight: 600;
  /* 댓글 내용과 작성자 이메일 스타일링 */
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.comment-delete-button {
  /* 삭제 버튼 스타일링 */
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
}

.comment-delete-button:hover {
  /* 삭제 버튼 호버 효과 */
  background-color: #ff7875;
}
.modal-body {
  width: 80%;
  height: 500px;
}
.similar-card {
  width: 30%;
  margin: 10px;
}
.post-card-style {
  width: 100%;
  height: 500px;
  margin: 1%;
  display: flex;
}
.centered {
  display: flex;
  justify-content: center;
}

h1 {
  font-family: "Arial", sans-serif; /* 글꼴 설정 */
  font-size: 18px; /* 글자 크기 */
  color: #333; /* 글자 색상 */
  text-align: center; /* 텍스트 중앙 정렬 */
  font-weight: bold; /* 글자 굵기 */
}
.header-info-right {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들을 양 끝으로 정렬 */
  align-items: center; /* 세로 방향에서 중앙 정렬 (필요에 따라) */
  gap: 15px;
}
.header-info {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들을 양 끝으로 정렬 */
  align-items: center; /* 세로 방향에서 중앙 정렬 (필요에 따라) */
}
.board-header p:hover {
  cursor: pointer; /* 마우스 커서를 손가락 모양으로 변경 */
  font-weight: bold; /* 텍스트의 굵기를 굵게 변경 */
}
.board-header {
  width: 80%;
  height: 8%;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.similar {
  width: 80%;
  height: 500px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.carousel-control {
  padding: 10px 15px;
  color: rgb(0, 0, 0); /* 버튼의 글자색 */
  font-size: 20px;
  font-weight: bold;
  border: none; /* 테두리 제거 */
}
.board-info {
  width: 80%;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-top: 1px solid #ccc;
}
.img-slide {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.share {
  justify-content: flex-end;
  gap: 10px;
  display: flex;
  width: 80%;
  border-top: 1px solid #ccc;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
}

input[name="slides"] {
  display: none;
}

ul {
  list-style-type: none;
}

.carousel {
  width: 100%;
  height: 500px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 70%;
  height: 80%;
}
.close-button {
  position: absolute;
  right: 0; /* 오른쪽에 배치 */
  background-color: #f8f9fa;
  border: none;
  color: #495057;
  padding: 5px 10px; /* 패딩 줄임 */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px; /* 글자 크기 줄임 */
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.5s;
}

.img-box {
  width: 100%;
  height: 50%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.post-title {
  width: 90%;
  height: 15%;
  margin-bottom : 5px;

  text-align: center;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heart-btn {
  font-size: 25px;
  color: #ccc; /* 기본적으로 비어있는 하트 */
  /* ... 기타 스타일 ... */
}

.heart-btn.filled {
  color: red; /* 좋아요가 활성화되었을 때 꽉 찬 하트 */
}

.close-button:hover {
  background-color: #495057;
  color: white;
  border: 1px solid #495057;
}
.boardDetail-out {
  min-height: 40px;
  position: relative; /* 상대 위치 지정 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.boardDetail-in {
  height: 95%;
  position: relative; /* 상대 위치 지정 */
  margin-top: 2%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-delete-buttons {
  padding-bottom: 20px;
}

.edit-delete-buttons button {
  margin-left: 5px; /* 버튼 사이 간격 조정 */
  padding: 5px 10px; /* 버튼의 내부 여백 */
  background-color: #f0f0f0; /* 기본 배경색 */
  border: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 5px; /* 테두리 둥글게 */
  cursor: pointer; /* 마우스 포인터 변경 */
  transition: background-color 0.3s, transform 0.3s;
}

.edit-delete-buttons button:hover {
  background-color: #e0e0e0; /* 호버 시 배경색 변경 */
  transform: translateY(-2px); /* 호버 시 버튼을 약간 위로 이동 */
}

/* 수정 버튼에만 특별한 스타일 적용 가능 */
.edit-delete-buttons button:first-child {
  background-color: #add8e6; /* 수정 버튼의 배경색 */
}

/* 삭제 버튼에만 특별한 스타일 적용 가능 */
.edit-delete-buttons button:last-child {
  background-color: #ffcccb; /* 삭제 버튼의 배경색 */
}
.post-card {
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
}

.post-card img {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.post-card h2 {
  font-size: 1rem;
}

.post-card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 15%;
  margin-top: 5px;
  font-size: 0.8rem;
  color: #666;
}

.modal {
  cursor: pointer;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  cursor: default;
  background: white;
  max-height: 80%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.modal-content::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 */
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: darkgrey; /* 스크롤바 썸(움직이는 부분)의 색상 */
  border-radius: 5px; /* 스크롤바 썸의 둥근 모서리 */
}

.modal-content::-webkit-scrollbar-track {
  background-color: lightgrey; /* 스크롤바 트랙(배경)의 색상 */
}
</style>
