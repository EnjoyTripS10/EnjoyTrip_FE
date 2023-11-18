<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import PlaningUser from "./PlaningUser.vue";

const title = ref("제목이지롱"); // 불러오기
const content = ref("내용 별거 있냐"); // 불러오기

const location = ref([
  [
    {
    locationId: 1,
    locationName: "성심당",
    locationAddr: "대전 중구 대종로480번길 15",
    locationLat: "36.327743549909655",
    locationLon: "127.42730271663449",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },
  {
    locationId: 2,
    locationName: "정진돈",
    locationAddr: "대전 유성구 계룡로123번길 30",
    locationLat: "36.35438273239536",
    locationLon: "127.34488567928535",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },
],
  [{
    locationId: 3,
    locationName: "장소3",
    locationAddr: "대전 중구 대종로480번길 15",
    locationLat: "36.327743549909655",
    locationLon: "127.42730271663449",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },
  {
    locationId: 4,
    locationName: "장소4",
    locationAddr: "대전 유성구 계룡로123번길 30",
    locationLat: "36.35438273239536",
    locationLon: "127.34488567928535",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },],
]);

// 장소 메모
const toggleDropdown = (item) => {
  console.log(item);
  console.log(item.showDropdown);
  item.showDropdown = !item.showDropdown;
};

// user 추가
const users = ref([
      {
        id: 1,
        name: "김철수",
        profile_img: "https://picsum.photos/200/200",
      },
      {
        id: 2,
        name: "이영희",
        profile_img: "https://picsum.photos/200/201",
      },
      {
        id: 3,
        name: "이희수",
        profile_img: "https://picsum.photos/200/202",
      },
      {
        id: 4,
        name: "이영희",
        profile_img: "https://picsum.photos/200/203",
      },
      {
        id: 5,
        name: "김수지",
        profile_img: "https://picsum.photos/200/204",
      },
    ]); // 기본 값은 자기 아이디로 넣어주기

// const submitForm = async () => {
//   try {
//     const response = await axios.post("/api/posts", {
//       title: title.value,
//       content: content.value,
//     });
//     console.log(response.data);
//     // 글쓰기가 성공적으로 완료되었을 때 처리할 코드를 작성합니다.
//   } catch (error) {
//     console.log(error);
//     // 글쓰기가 실패했을 때 처리할 코드를 작성합니다.
//   }
// };


</script>

<template>
  <div class="detail-plan">
    <label> 계획 짜세히 </label>
        <div class="detail-plan-info-button">
          <btuuon>여행완료</btuuon>
        </div>
        <div class="detail-plan-info">
          <label for="title">제목:</label>
          <input type="text" id="title" :value="title" readonly/>
        </div>
        <div class="detail-plan-info">
          <label for="content">내용:</label>
          <textarea id="content" :value="content" readonly></textarea>
        </div>
        <div class="detail-plan-info-main">
          <div class="detail-plan-left">
            지도자리
          </div>
          <div class="detail-plan-right">
            
            <div class="detail-plan-right-user">
              유저
            </div> 

            <div class="detail-plan-right-list">
              일차별 장소 목록
            </div>
          </div>
        </div> 
  </div>
</template>

<style scoped>
.detail-plan-info-main {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.detail-plan-left {
  width: 50%;
}

.detail-plan-right {
  width: 50%;
}

.detail-plan-right-user {
  width: 90%;
  height: 10%;
  margin-bottom: 30px;
}
.detail-plan-right-user {
  width: 90%;
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  width: 100%;
}

.dropdown-menu {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 2px #aaa;
  display: flex;
  height: 100px;
  justify-content: center;
  margin: 10px 0px;
  padding: 10px;
  width: 100%;
}

.dropdown-menu.active {
  display: block;
  height: 100px;
  width: 100%;
}

.draggable-item {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0px 2px 5px #aaa;
  display: flex;
  justify-content: center;
  margin: 1%;
  padding: 1%;
}

.drop {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
  width: 300px;
}

.drop-zone {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0px 2px 2px #aaa;
  display: flex;
  flex-direction: column;
  height: 25%;
  margin: 10px 20px;
  min-height: 70px;
  padding: 10px;
  width: 100%;
}

.edit {
  display: flex;
  height: 100vh;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
}

.edit-date {
  align-items: center;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  padding-top: 50px;
  width: 100%;
}

.detail-plan-info {
  margin-bottom: 10px;
  width: 80%;
}

.detail-plan-info-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  width: 80%;
}

.detail-plan-info input,
.detail-plan-info textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}

.detail-plan-info label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.detail-plan-info textarea {
  min-height: 60px; /* 최소 높이 */
  resize: none; /* 크기 조절 불가 */
}

label {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.left .right {
  height: auto;
  justify-self: center;
  width: 35%;
}

.memo {
  border-radius: 10px;
  margin-right: 20px;
  resize: none;
}

.pre {
  background-color: #eee;
  margin-top: 30px;
  min-height: 200px;
  width: 90%;
}

.recomend-btn {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
}

.detail-plan {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  width: 100%;
}

.submit-btn {
  background-color: khaki;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-weight: bold;
  padding: 7px 15px;
  transition: background-color 0.3s;
}

.userList {
  height: 100%;
  margin-left: 5vw;
  margin-right: 7vw;
  width: 30%;
}
</style>
