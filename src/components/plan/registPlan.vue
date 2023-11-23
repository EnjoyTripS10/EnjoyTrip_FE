<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axiosConfig.js";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import Draggable from "vue3-draggable";
import LocationModal from "./LocationModal.vue";
import PlaningUser from "./PlaningUser.vue";
import Swal from "sweetalert2";

// 달력
const day = ref(1);
const dateValue = ref([]);
const start = ref("");
const end = ref("");

const formatter = ref({
  date: "YYYY.MM.DD",
  month: "MM",
});

const router = useRouter();

const fetchLocations = async () => {
  try {
    const response = await axios.get("/location/stored");
    location.value = response.data;
    for (let i = 0; i < location.value.length; i++) {
      await getImgUrl(location.value[i], i);
    }
    componentKey.value++;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
onBeforeMount(fetchLocations);
// fetchLocations();
watch(dateValue, (newVal) => {
  if (newVal.length === 2) {
    const startDate = new Date(newVal[0]);
    const endDate = new Date(newVal[1]);

    start.value = startDate;
    end.value = endDate;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    day.value = dayDiff + 1; // 시작일과 종료일을 포함하여 계산
  }
});

watch(day, (newVal) => {
  draggableArrays.value = new Array(newVal).fill().map(() => []);
});

// 제목 내용

const title = ref("");
const content = ref("");

// 장소 드래그 엔 드롭 블록

const draggableArrays = ref([[]]); // 1일차 부터 배열로 가져온 내용

const location = ref([]);

// 장소 메모
const toggleDropdown = (item) => {
  console.log(item);
  console.log(item.showDropdown);
  item.showDropdown = !item.showDropdown;
};

// 장소 추가
let shoModalLocation = ref(false);
let componentKey = ref(0);
const addLocationToPlan = (newLocation) => {
  shoModalLocation.value = false;
  console.log(shoModalLocation);
  location.value = [...location.value, newLocation.value];
  componentKey.value++;
};

// user 추가
const users = ref([]); // 기본 값은 자기 아이디로 넣어주기
const updateUsers = (newUser) => {
  console.log(newUser);
  users.value = newUser;
  console.log(users.value);
};

const showMap = () => {
  shoModalLocation.value = true;
};

const submitForm = async () => {
  if (
    !title.value ||
    !content.value ||
    !start.value ||
    !end.value ||
    title.value === "" ||
    content.value === "" ||
    start.value === "" ||
    end.value === ""
  ) {
    Swal.fire({
      title: "등록 실패",
      text: "모든 필드를 작성해주세요.",
      icon: "error",
      confirmButtonText: "확인",
    });
    return;
  }

  const postData = {
    title: title.value,
    content: content.value,
    type: 0,
    startDate: start.value,
    endDate: end.value,
    locationList: draggableArrays.value,
    users: users.value,
  };

  try {
    console.log(users.value);
    const response = await axios.post("/trip", postData, {
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

// 검색
const firstImageUrl = ref("");
const searchLocation = ref("");

const getImgUrl = async (item, index) => {
  try {
    console.log(item);
    const city = item.locationAddr.split(" ")[0];
    const response = await axios.get(`/api/search?query=` + item.locationName);
    console.log(location.value[index]);
    location.value[index].img = response.data;
  } catch (error) {
    console.error("Error fetching image URL:", error);
  }
};

watch(
  location,
  (newLocation, oldLocation) => {
    if (newLocation.length > oldLocation.length) {
      const newLocationIndex = newLocation.length - 1;
      getImgUrl(newLocation[newLocationIndex], newLocationIndex);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="regist-plan-user">
    <div class="regist-plan">
      <div class="rp2">
        <div class="label-title">
          <label class="date-label"> 계획 작성하기 </label>
        </div>
        <div>
          <form @submit.prevent="submitForm" class="form-style">
            <div class="edit-date">
              <vue-tailwind-datepicker v-model="dateValue" :formatter="formatter" />
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
              <button type="submit" class="submit-btn" @submit.prevent="submitForm">글쓰기</button>
            </div>
            <div class="edit">
              <div class="left">
                <div class="drop" v-for="(array, index) in draggableArrays" :key="index">
                  <label class="date-label">{{ index + 1 }} 일차</label>
                  <draggable v-model="draggableArrays[index]" transition="100" class="drop-zone">
                    <template v-slot:item="{ item }">
                      <div class="draggable-item" @click.prevent="toggleDropdown(item)">
                        <div class="drag-img">
                          <img :src="item.img" />
                        </div>
                        <div class="drag-info">
                          {{ item.locationName }}<br />
                          {{ item.locationAddr }}
                        </div>
                      </div>
                      <div v-if="item.showDropdown" class="dropdown-menu">
                        <textarea
                          class="memo"
                          v-model="item.memo"
                          placeholder="메모 작성..."
                        ></textarea>
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
                        <!-- <div class="drag-img">
                          <img
                            :src="item.img"
                            style="width: 100px; height: 100px; border-radius: 10px"
                          />
                        </div> -->
                        <div class="drag-info">
                          {{ item.locationName }}<br />
                          {{ item.locationAddr }}
                        </div>
                      </div>
                    </template>
                  </draggable>
                  <div class="add-location" @click="showMap">장소 추가</div>
                  <LocationModal
                    :isVisible="shoModalLocation"
                    @update:isVisible="shoModalLocation = $event"
                    @addLocationToPlan="addLocationToPlan"
                  />
                </div>
                <!-- <pre>{{ JSON.stringify(location, undefined, 4) }}</pre> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="userList">
      <PlaningUser @updateUsers="updateUsers" />
    </div>
  </div>
</template>

<style scoped>
.drag-info {
  text-align: center;
  width: 100%;
}
.drag-img {
  width: 40%;
  border-radius: 10px;
  margin-right: 10px;
}
.drag-img img {
  width: 75px;
  height: 75px;
  border-radius: 10px;
  margin-right: 10px;
}
.label-title {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  width: 100%;
}
.rp2 {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: 70px;
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
  width: 70%;
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
  margin-right: 10vw;
  width: 30%;
  display: flex;
  justify-content: flex-start;
}
</style>
