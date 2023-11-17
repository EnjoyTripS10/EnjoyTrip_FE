<template>
  <div class="plan-list">
    <h2>계획 목록</h2>
    <input class="search-box" type="text" placeholder="검색..." v-model="searchQuery" />
    <ul class="plan-items">
      <li v-for="plan in plans" :key="plan.id" class="plan-item">
        <div class="plan-details">
          <div class="text-box">
            <h3>{{ plan.title }}</h3>
            <p>{{ plan.startDate }} ~ {{ plan.endDate }}</p>
          </div>
          <div class="img-box">
            <ul class="user-list">
              <li
                v-for="(user, index) in plan.users"
                :key="user.id"
                :style="{ zIndex: plan.users.length - index }"
              >
                <img class="profile-img" :src="user.profile_img" />
              </li>
            </ul>
            <div class="tooltiptext">
              <ul>
                <li v-for="user in plan.users" :key="user.id">
                  <div class="tooltip-box">
                    <img class="profile-img" :src="user.profile_img" /> {{ user.name }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// 검색 쿼리 데이터
const searchQuery = ref("");

const plans = ref([
  {
    title: "1박 2일 군산여행",
    startDate: "2021-10-01",
    endDate: "2021-10-02",
    users: [
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
    ],
  },
  {
    title: "제주도 한 달 살이",
    startDate: "2021-11-01",
    endDate: "2021-11-31",
    users: [
      {
        id: 3,
        name: "김수지",
        profile_img: "https://picsum.photos/200/205",
      },
      {
        id: 4,
        name: "이희수",
        profile_img: "https://picsum.photos/200/206",
      },
    ],
  },
]);

// onMounted(async () => {
//   try {
//     const response = await axios.get('API_ENDPOINT_URL'); // 여기에 계획 목록을 가져올 API 엔드포인트 URL을 적으세요.
//     plans.value = response.data;
//   } catch (error) {
//     console.error('계획 목록을 가져오는 데 실패했습니다:', error);
//   }
// });
</script>

<style scoped>
.search-box {
  width: 60%; /* 혹은 적절한 너비 */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.tooltip-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  line-height: 20px;
}
.plan-list {
  border: 1px solid #ccc;
}

.plan-list-box {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}

.plan-items {
  border: 1px solid #000000;
  list-style-type: none;
  padding: 0;
}

.plan-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 10px; /* 각 계획 사이의 간격 */
  padding: 10px 5px;
  border: 1px solid #000000;
}

.plan-details {
  display: flex;
  margin-right: 20px; /* 제목과 날짜 오른쪽의 여백 */
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
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover;
  border: 2px solid white; /* 이미지 사이의 구분을 위한 테두리 */
  position: relative; /* z-index를 적용하기 위해 필요 */
  z-index: 1; /* 겹침 순서 조정 */
}

.text-box {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.text-box h3 {
  margin-right: 20px;
}

.img-box {
  margin-left: 50px;
  position: relative;
  display: inline-block;
}

.tooltip-box {
  margin: 10px 0px;
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
/* 여기에 스타일을 추가하세요 */
</style>
