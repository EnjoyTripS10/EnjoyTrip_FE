<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import PlanMap from "../location/PlanMap.vue";

const selectedLocationGroup = ref([]);
const router = useRouter();
const route = useRoute();
const planid = route.params.planid;
const title = ref("");
const content = ref("");

const planData = ref([]);

const selectLocationGroup = (locationGroup) => {
  selectedLocationGroup.value = locationGroup;
};

// 장소 메모
const toggleDropdown = (item) => {
  console.log(item);
  console.log(item.showDropdown);
  item.showDropdown = !item.showDropdown;
};

const getUserPicture = (user) => {
  return user.picture;
};

const loadPlan = async () => {
  try {
    // URL 내의 `${planid}`를 실제 변수로 대체합니다.
    const response = await axios.get(`/trip/${planid}`, {
      params: {
        title: title.value,
        content: content.value,
      },
    });
    planData.value = response.data;
    title.value = planData.value.title;
    content.value = planData.value.content;
    console.log(planData.value);
    // 글쓰기가 성공적으로 완료되었을 때 처리할 코드를 작성합니다.
  } catch (error) {
    console.log(error);
    // 글쓰기가 실패했을 때 처리할 코드를 작성합니다.
  }
};

onMounted(loadPlan);

// 수정 페이지로 이동하는 함수
const goToEditPage = () => {
  router.push({ name: "updatePlan", params: { planid: planid } });
};

// 데이터를 삭제하는 함수
const deletePlan = async () => {
  try {
    await axios.delete(`/trip/${planid}`);
    // 삭제 후 할 행동, 예를 들어 목록 페이지로 이동
    router.push({ name: "PlanList" });
  } catch (error) {
    console.error("삭제 중 오류 발생: ", error);
    // 오류 처리 로직
  }
};

const kakaoShare = () => {
  window.Kakao.Share.createDefaultButton({
    container: "#kakaotalk-sharing-btn",
    object_type: "calendar",
    id_type: "event",
    id: "1",
    content: {
      title: "1월 신작 평론 모임",
      description: "따끈한 신작 감상평을 나누는 월간 모임에 초대합니다.",
      imageUrl:
        "http://k.kakaocdn.net/dn/dFUqwp/bl3SUTqb2VV/VFSqyPpKUzZVVMcmotN9A0/kakaolink40_original.png",
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: "http://172.20.10.2:8080/boardList",
        webUrl: "http://172.20.10.2:8080/boardList",
      },
    },
    buttons: [
      {
        title: "모임 주제 보기",
        link: {
          webUrl: "https://developers.kakao.com",
          mobileWebUrl: "https://developers.kakao.com",
        },
      },
    ],
  });
};
</script>

<template>
  <div class="detail-plan">
    <label> 계획 조회 </label>
    <div class="detail-plan-info-button">
      <button>여행완료</button>
    </div>
    <div class="detail-plan-info">
      <label for="title">제목: </label>
      <input type="text" id="title" :value="title" readonly />
    </div>
    <div class="detail-plan-info">
      <label for="content">내용:</label>
      <input id="content" :value="content" readonly />
    </div>
    <div class="detail-plan-info-main">
      <div class="detail-plan-left">
        <label>경로</label>
        <div class="plan-map">
          <PlanMap :locationGroup="selectedLocationGroup" />
        </div>
      </div>
      <div class="detail-plan-right">
        <div>
          <label>여행 참여자</label>
        </div>
        <div class="img-box">
          <ul class="user-list">
            <li
              v-for="(user, index) in planData.users"
              :key="user.id"
              :style="{ zIndex: planData.users.length - index }"
            >
              <img
                class="profile-img"
                :src="user.picture ? user.picture : '../src/assets/img/logo_bg.png'"
              />
            </li>
          </ul>
          <div class="tooltiptext">
            <ul>
              <li v-for="user in planData.users" :key="user.id">
                <div class="tooltip-box">
                  <img
                    class="profile-img"
                    :src="user.picture ? user.picture : '../src/assets/img/logo_bg.png'"
                  />{{ user.name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-plan-right-list">
          <label>여행 일정</label>
          <div
            v-for="(locationGroup, index) in planData.locationList"
            :key="index"
            class="list-block"
            @click="selectLocationGroup(locationGroup)"
          >
            <label>{{ index + 1 }} 일차</label>
            <div
              v-for="(location, locationIndex) in locationGroup"
              :key="locationIndex"
              class="list"
            >
              {{ location.locationName }}
            </div>
            <!-- 여기에 각 locationGroup에 대한 내용을 표시 -->
          </div>
        </div>
      </div>
    </div>
    <div class="detail-plan-edit">
      <a id="kakaotalk-sharing-btn" href="javascript:;">
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼"
          @click="kakaoShare(modalData)"
          style="width: 30px; height: 30px"
        />
      </a>
      <button class="edit-button" @click="goToEditPage">수정</button>
      <button class="delete-button" @click="deletePlan">삭제</button>
    </div>
  </div>
</template>

<style scoped>
.detail-plan-edit {
  /* 컨테이너 스타일링 */
  display: flex;
  justify-content: space-around; /* 버튼들을 공간에 따라 분배 */
  padding: 10px;
}

.edit-button,
.delete-button {
  /* 버튼 공통 스타일 */
  padding: 10px 15px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.edit-button {
  /* 수정 버튼 스타일 */
  background-color: #4caf50; /* 녹색 */
}

.delete-button {
  /* 삭제 버튼 스타일 */
  background-color: #f44336; /* 빨간색 */
}

.edit-button:hover {
  background-color: #45a049; /* 수정 버튼 호버 효과 */
}

.delete-button:hover {
  background-color: #d32f2f; /* 삭제 버튼 호버 효과 */
}
.plan-map {
  width: 100%;
  height: 90%;
  margin-top: 20px;
  padding-right: 30px;
}
.list {
  width: 100%;
  background-color: #ffffff;
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  text-align: center;
}
.list-block {
  color: #ffffff;
  text-align: center;
  width: 100%;
  height: auto;
  background-color: #000000;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 20px;
}
.detail-plan {
  margin-top: 60px;
  width: 80%;
  height: auto;
}

.detail-plan-info-main {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: auto;
}
.detail-plan-left {
  width: 75%;
}

.detail-plan-right {
  width: 35%;
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
.user-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.user-list li {
  margin-left: -13px; /* 사진들이 15% 겹치도록 조정 */
  position: relative; /* z-index를 적용하기 위해 필요 */
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

.detail-plan-info input {
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

.img-box {
  margin-left: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;
  display: inline-block;
}

.tooltip-box {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  line-height: 20px;
}

.img-box .tooltiptext {
  visibility: hidden;
  width: 150px; /* 너비 고정 */
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px; /* 내부 여백 */
  position: absolute;
  z-index: 1000;
  top: 75%; /* 상위 요소의 하단에 위치 */
  left: -20px;
  opacity: 0;
  transition: opacity 0.3s;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.img-box:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
