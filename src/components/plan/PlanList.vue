<template>
  <div class="plan-list">
    <div class="header-title">
      <h2>계획 목록</h2>
    </div>
    <div class="input-box">
      <input
        class="search-box"
        type="text"
        placeholder="검색..."
        v-model="searchQuery"
        @keyup.enter="searchPlans"
      />
      <button class="input-btn" @click="searchPlans">검색</button>
    </div>
    <div class="state-box-marble">
      <div class="marble-container">
        <div class="blue-marble"></div>
        <p class="marble-description">계획</p>
      </div>
      <div class="marble-container">
        <div class="red-marble"></div>
        <p class="marble-description">후기</p>
      </div>
    </div>
    <ul class="plan-items" v-if="plans.length">
      <li v-for="plan in plans" :key="plan.id" class="plan-item">
        <div class="plan-details" @click="navigateToDetail(plan.tripId)">
          <div class="state-box">
            <div v-if="plan.tripType === 0" class="blue-marble"></div>
            <div v-else-if="plan.tripType === 1" class="red-marble"></div>
          </div>
          <div class="text-box-title">
            <h3>{{ plan.tripTitle }}</h3>
          </div>
          <div class="text-box-date">
            <p>{{ formatDate(plan.tripStartDate) }} ~ {{ formatDate(plan.tripEndDate) }}</p>
          </div>
          <div class="img-box">
            <ul class="user-list">
              <li
                v-for="(user, index) in plan.users"
                :key="user.id"
                :style="{ zIndex: plan.users.length - index }"
              >
                <img
                  class="profile-img"
                  :src="user.picture ? user.picture : 'src/assets/img/logo_bg.png'"
                />
              </li>
            </ul>
            <div class="tooltiptext">
              <ul>
                <li v-for="user in plan.users" :key="user.id">
                  <div class="tooltip-box">
                    <img
                      class="profile-img"
                      :src="user.picture ? user.picture : 'src/assets/img/logo_bg.png'"
                    />
                    {{ user.userName }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// 검색 쿼리 데이터
const searchQuery = ref("");
const originalPlans = ref([]);
const plans = ref([]);

const formatDate = (datetime) => {
  return datetime.split("T")[0];
};

const searchPlans = async () => {
  if (!searchQuery.value) {
    plans.value = originalPlans.value;
  } else {
    // 검색 쿼리를 기반으로 필터링
    plans.value = originalPlans.value.filter((plan) =>
      plan.tripTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

onMounted(async () => {
  try {
    const response = await axios.get("/trip"); // 여기에 계획 목록을 가져올 API 엔드포인트 URL을 적으세요.
    plans.value = response.data;
    console.log(response.data); // 콘솔에서 데이터 확인
    originalPlans.value = response.data;
  } catch (error) {
    console.error("계획 목록을 가져오는 데 실패했습니다:", error);
  }
});

const router = useRouter();

const navigateToDetail = (tripId) => {
  router.push(`/planDetail/${tripId}`);
};
</script>

<style scoped>
.state-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.state-box-marble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.marble-container {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 구슬 사이 간격 */
}
.marble-description {
  margin-left: 10px; /* 구슬과 텍스트 사이 간격 */
}
h2 {
  font-size: 1.8rem;
  font-weight: 600;
}
.text-box-date {
  width: 40%;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
}
.text-box-title {
  width: 40%;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
}
.state-box {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  height: 50px; /* 또는 원하는 고정 높이 */
  width: 10%;
}

.blue-marble,
.red-marble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000000;

  /* 나머지 스타일링 */
}
.blue-marble {
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /* 그림자 추가 */
  border: 2px solid #1e90ff; /* 테두리 추가 */
  background-image: linear-gradient(to top right, #3193f4, #87cefa); /* 그라디언트 배경 */
  /* 추가 스타일링 */
}

.red-marble {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /* 그림자 추가 */
  border: 2px solid #ff6347; /* 테두리 추가 */
  background-image: linear-gradient(to top right, #ff6347, #ffa07a); /* 그라디언트 배경 */
}
.input-btn {
  height: 100%;
  height: 70%;
  border: 1px solid #000000;
  padding: 10px;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 7px;
}
.search-box {
  width: 60%; /* 혹은 적절한 너비 */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-box {
  width: 80%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.plan-list {
  width: 80%;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.plan-list-box {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}

.plan-items {
  width: 80%;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
}

.plan-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 10px; /* 각 계획 사이의 간격 */
  padding: 10px 5px;
  border: 1px solid #ccc;
}

.plan-details {
  display: flex;
  margin-right: 20px; /* 제목과 날짜 오른쪽의 여백 */
  width: 100%;
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

.tooltip-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  line-height: 20px;
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
