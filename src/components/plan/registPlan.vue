<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import Draggable from "vue3-draggable";
import LocationModal from "./LocationModal.vue";
import PlaningUser from "./PlaningUser.vue";

let showModal = ref(false);

const location = ref([
  {
    locationName: "성심당",
    locationAddr: "대전 중구 대종로480번길 15",
    locationLat: "36.327743549909655",
    locationLon: "127.42730271663449",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },
  {
    locationName: "정진돈",
    locationAddr: "대전 유성구 계룡로123번길 30",
    locationLat: "36.35438273239536",
    locationLon: "127.34488567928535",
    locationType: "음식점",
    showDropdown: false,
    memo: "",
  },
  {
    locationName: "롯데월드",
    locationAddr: "서울 송파구 올림픽로 240",
    locationLat: "37.51105631414629",
    locationLon: "127.09806314999784",
    locationType: "관광지",
    showDropdown: false,
    memo: "",
  },
  {
    locationName: "에버랜드",
    locationAddr: "경기 용인시 처인구 포곡읍 에버랜드로 199",
    locationLat: "37.292813986661415",
    locationLon: "127.20228550062",
    locationType: "관광지",
    showDropdown: false,
    memo: "",
  },
  {
    locationName: "파라다이스시티",
    locationAddr: "인천광역시 중구 영종해안남로321번길 186",
    locationLat: "37.43711341239237",
    locationLon: "126.45600502673338",
    locationType: "숙박",
    showDropdown: false,
    memo: "",
  },
]);

const day = ref(1);
const dateValue = ref([]);
const draggableArrays = ref([[]]);

const formatter = ref({
  date: "YYYY.MM.DD",
  month: "MM",
});

watch(dateValue, (newVal) => {
  if (newVal.length === 2) {
    const startDate = new Date(newVal[0]);
    const endDate = new Date(newVal[1]);

    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    day.value = dayDiff + 1; // 시작일과 종료일을 포함하여 계산
  }
});

watch(day, (newVal) => {
  draggableArrays.value = new Array(newVal).fill().map(() => []);
});

const title = ref("");
const content = ref("");

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

const toggleDropdown = (item) => {
  console.log(item);
  console.log(item.showDropdown);
  item.showDropdown = !item.showDropdown;
};
let componentKey = ref(0);

const addLocationToPlan = (newLocation) => {
  showModal.value = false;
  console.log(showModal);
  location.value = [...location.value, newLocation.value];
  componentKey.value++;
};
</script>

<template>
  <div class="regist-plan">
    <label class="date-label"> 계획 작성하기 </label>
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
          <button type="submit" class="submit-btn">글쓰기</button>
        </div>
        <div class="edit">
          <div class="left">
            <div class="drop" v-for="(array, index) in draggableArrays" :key="index">
              <label class="date-label">{{ index + 1 }} 일차</label>
              <draggable v-model="draggableArrays[index]" transition="100" class="drop-zone">
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
                <!-- <pre>{{ JSON.stringify(array, undefined, 4) }}</pre> -->
              </draggable>
            </div>
          </div>

          <div class="right">
            <div class="drop">
              <label class="date-label">장소 목록</label>
              <draggable :key="componentKey" v-model="location" transition="100" class="drop-zone">
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
            <pre>{{ JSON.stringify(location, undefined, 4) }}</pre>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="userList">
    <PlaningUser />
  </div>
</template>

<style scoped>
.dropdown-menu {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 2px #aaa;
  margin: 10px 0px;
  padding: 10px;
  justify-content: center;
}

.memo {
  resize: none;
  margin-right: 20px;
  border-radius: 10px;
}
.recomend-btn {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #000000;
}
.dropdown-menu.active {
  display: block;
  width: 100%;
  height: 100px;
}
.drop {
  display: flex;
  width: 300px;
  margin: 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
label {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.regist-plan {
  margin-left: 7vw;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.left .right {
  width: 35%;
  height: auto;
  justify-self: center;
}

.userList {
  width: 30%;
  height: 500px;
  margin-right: 7vw;
  margin-left: 5vw;
}

.edit {
  display: flex;
  padding-top: 50px;
  width: 100%;
  height: 100vh;
  justify-content: center;
}

.edit-date {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.draggable-item {
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 5px #aaa;
  margin: 1%;
  padding: 1%;
  border-radius: 10px;
}
.drop-zone {
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0px 2px 2px #aaa;
  margin: 10px 20px;
  padding: 10px;
  width: 100%;
  height: 25%;
  min-height: 70px;
}
pre {
  background-color: #eee;
  margin-top: 30px;
  width: 90%;
  min-height: 200px;
}

.form-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  width: 100%;
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: none; /* 크기 조절 불가 */
  min-height: 60px; /* 최소 높이 */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  width: 100%;
}

.submit-btn {
  padding: 7px 15px;
  background-color: khaki;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
