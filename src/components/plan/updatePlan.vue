<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from '@/axiosConfig.js';
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import Draggable from "vue3-draggable";
import LocationModal from "./LocationModal.vue";
import PlaningUser from "./PlaningUser.vue";

const router = useRouter();
// 달력
const day = ref(1);
const dateValue = ref([]);
const start = ref("");
const end = ref("");
const route = useRoute();
const planid = route.params.planid;

// 제목 내용
const title = ref("");
const content = ref("");

// 장소 드래그 엔 드롭 블록
const draggableArrays = ref([[]]); // 1일차 부터 배열로 가져온 내용
const location = ref([]);

const getData = ref([]);

const formatter = ref({
  date: "YYYY.MM.DD",
  month: "MM",
});

const fetchLocations = async () => {
  try {
    const response = await axios.get(`/trip/${planid}`);

    title.value = response.data.title;
    content.value = response.data.content;
    // const startDate = new Date("Nov 02 2023 19:49:17");
    // const endDate = new Date("2023-11-02 19:49:17");

    const startDate = convertISOToDateTime(response.data.startDate);
    const endDate = convertISOToDateTime(response.data.endDate);

    // dateValue ref를 업데이트
    dateValue.value = [startDate, endDate];

    getData.value = response.data;
    // draggableArrays.value = response.data.locationList;
    draggableArrays.value = response.data.locationList.map((dayLocations) => {
      // 각 dayLocations 배열에 대해 필요한 데이터만 추출하거나 변환
      return dayLocations.map((location) => {
        // 예시: 필요한 필드만 반환
        return {
          locationId: location.locationId,
          locationName: location.locationName,
          locationAddr: location.locationAddr,
          locationLat: location.locationLat,
          locationLon: location.locationLon,
          memo: location.memo || "", // memo가 없는 경우 빈 문자열로 설정
        };
      });
    });

    console.log(draggableArrays.value);
    users.value = response.data.users;
    console.log(users.value);

    // componentKey.value++;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
onBeforeMount(fetchLocations);

const convertISOToDateTime = (isoString) => {
  "2023-10-31T15:00:00.000Z";
  const dateYMD = isoString.substring(0, 10);
  return `${dateYMD} 00:00:00`;
};

// fetchLocations();
watch(dateValue, (newVal) => {
  if (newVal.length === 2) {
    console.log("dateValue" + newVal);
    const startDate = new Date(newVal[0]);
    const endDate = new Date(newVal[1]);

    start.value = startDate;
    end.value = endDate;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    day.value = dayDiff + 1; // 시작일과 종료일을 포함하여 계산

    console.log("여행기간" + day.value);
  }
});

watch(day, (newVal) => {
  console.log("day" + newVal);
  // if(newVal) draggableArrays.value = new Array(newVal).fill().map(() => []);
});

// 장소 메모
const toggleDropdown = (item) => {
  console.log(item);
  console.log(item.showDropdown);
  item.showDropdown = !item.showDropdown;
};

// 장소 추가
let showModal = ref(false);
let componentKey = ref(0);
const addLocationToPlan = (newLocation) => {
  showModal.value = false;
  console.log(showModal);
  location.value = [...location.value, newLocation.value];
  componentKey.value++;
};

// user 추가
const users = ref([[]]); // 기본 값은 자기 아이디로 넣어주기
const updateUsers = (newUser) => {
  console.log(newUser);
  users.value = newUser;
  console.log(users.value);
};

const submitForm = async () => {
  const postData = {
    title: title.value,
    content: content.value,
    type: 0,
    startDate: start.value,
    endDate: end.value,
    locationList: getData.value.locationList,
  };
  console.log("///");
  console.log(postData);

  try {
    console.log(users.value);
    const response = await axios.put(`/trip/update/${planid}`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Post successful:", response.data);
    router.push({ name: "PlanList" });

    // 폼 제출 후의 추가 작업 (예: 페이지 리디렉션, 상태 업데이트 등)
  } catch (error) {
    console.error("Error submitting post:", error);
    // 에러 처리 로직
  }
};
</script>

<template>
  <div class="regist-plan-user">
    <div class="regist-plan">
      <label class="date-label"> 계획 수정하기 </label>
      <div>
        <form @submit.prevent="submitForm" class="form-style">
          <div class="edit-date">
            <vue-tailwind-datepicker v-model="dateValue" disabled="ture" />
          </div>
          <div class="form-group">
            <label for="title">제목:</label>
            <input type="text" id="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea id="content" v-model="content"></textarea>
          </div>
          <div class="button-container">
            <button type="submit" class="submit-btn" @submit.prevent="submitForm">수정 완료</button>
          </div>
          <div class="edit">
            <div class="left">
              <div class="drop" v-for="(array, index) in getData.locationList" :key="index">
                <label class="date-label">{{ index + 1 }} 일차</label>
                <draggable v-model="getData.locationList[index]" transition="100" class="drop-zone">
                  <template v-slot:item="{ item }">
                    <div class="draggable-item" @click.prevent="toggleDropdown(item)">
                      {{ item.locationName }}
                      <!-- <button @click.prevent="toggleDropdown(item)">// 클릭</button> -->
                    </div>
                    <div v-if="item.showDropdown" class="dropdown-menu">
                      <textarea
                        class="memo"
                        v-model="item.memo"
                        placeholder="메모 작성..."
                      ></textarea>
                      <button class="recomend-btn">등록</button>
                    </div>
                  </template>
                </draggable>
                <!-- <pre>{{ JSON.stringify(array, undefined, 4) }}</pre> -->
              </div>
            </div>

            <div class="right">
              <div class="drop">
                <label class="date-label">추천 장소</label>
                <draggable
                  :key="componentKey"
                  v-model="location"
                  transition="100"
                  class="drop-zone"
                >
                  <template
                    v-slot:item="{ item }"
                    v-for="(item, index) in location"
                    :key="item.locationName"
                  >
                    <div class="draggable-item">
                      {{ item.locationName }}
                    </div>
                  </template>
                </draggable>
                <button class="add-location" @click="showModal = true">장소 추가</button>
                <LocationModal
                  :isVisible="showModal"
                  @update:isVisible="showModal = $event"
                  @addLocationToPlan="addLocationToPlan"
                />
              </div>
              <!-- <pre>{{ JSON.stringify(location, undefined, 4) }}</pre> -->
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- <div class="userList">
      <PlaningUser @updateUsers="updateUsers" />
    </div> -->
  </div>
</template>

<style scoped>
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

.regist-plan-user {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
}

.edit {
  display: flex;
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

.form-group {
  margin-bottom: 10px;
  width: 100%;
}

.form-group input,
.form-group textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group textarea {
  min-height: 60px; /* 최소 높이 */
  resize: none; /* 크기 조절 불가 */
}

.form-style {
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 1000px;
  padding: 20px;
  width: 100%;
}

label {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.left .right {
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

.regist-plan {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: 7vw;
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

.submit-btn:hover {
  background-color: #0056b3;
}

.userList {
  height: 100%;
  min-height: 1000px;
  margin-left: 5vw;
  margin-right: 7vw;
  width: 30%;
}
</style>
