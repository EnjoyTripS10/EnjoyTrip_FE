<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { ko } from 'date-fns/locale';
import Datepicker from 'vue3-datepicker';
import Draggable from "vue3-draggable";

const location = ref([
    {
        locationName : "성심당",
        locationAddr: "대전 중구 대종로480번길 15",
        locationLat: "36.327743549909655",
        locationLon: "127.42730271663449",
        locationType: "음식점"
    },
    {
        locationName: "정진돈",
        locationAddr: "대전 유성구 계룡로123번길 30",
        locationLat: "36.35438273239536",
        locationLon: "127.34488567928535",
        locationType: "음식점"
    },
    {
        locationName: "롯데월드",
        locationAddr: "서울 송파구 올림픽로 240",
        locationLat: "37.51105631414629",
        locationLon: "127.09806314999784",
        locationType: "관광지"
    },
    {
        locationName: "에버랜드",
        locationAddr: "경기 용인시 처인구 포곡읍 에버랜드로 199",
        locationLat: "37.292813986661415",
        locationLon: "127.20228550062",
        locationType: "관광지"
    },
    {
        locationName: "파라다이스시티",
        locationAddr: "인천광역시 중구 영종해안남로321번길 186",
        locationLat: "37.43711341239237",
        locationLon: "126.45600502673338",
        locationType: "숙박"
    },
]);

const picked_start = ref(new Date());
const picked_end = ref(new Date());
const locale = reactive(ko); // 한글 달력 (기본 값은 영어)
const inputFormat = ref('yyyy-MM-dd');

const update_day = computed(() => {
    return picked_end.value.getDate() - picked_start.value.getDate();
});

const draggableArrays = ref([]);

watch(update_day, (newVal) => {
    draggableArrays.value = new Array(newVal).fill().map((t, index) => [{index}]);
});
</script>


<template>
    <div class="regist-plan">
        <div class="edit-date">
            <Datepicker v-model="picked_start" :locale="locale" :inputFormat="inputFormat"/>        
            <p>{{picked_start}}</p>
            <Datepicker v-model="picked_end" :locale="locale" :inputFormat="inputFormat"/>        
            <p>{{picked_end}}</p>
            <p>{{update_day}}</p>
        </div>

        <div class="edit">
            <div class="left">
    <div>{{ draggableArrays }}</div>
    <draggable v-for="(array, index) in draggableArrays" :key="index" v-model="draggableArrays[index]" transition="100" class="drop-zone">
        <p>{{ index + 1 }} 일차</p>
        <template v-slot:item="{ item }">
        <div class="draggable-item">
          {{ item.locationName }}
        </div>
      </template>
      <pre>{{ JSON.stringify(array, undefined, 4) }}</pre> <!-- array를 표시합니다. -->
    </draggable>
  </div>
    
            <div class="right">
                <draggable v-model="location" transition="100" class="drop-zone">
                    <template v-slot:item="{ item }">
                        <div class="draggable-item">
                            {{ item.locationName }}
                        </div>
                    </template>
                </draggable>
                <pre>{{ JSON.stringify(location, undefined, 4) }}</pre>
            </div>
    
            <!-- <div class="userList">
                
            </div> -->
        </div>
    </div>

</template>

<style scoped>

.regist-plan {
  width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.left .right {
    width: 35%;
}

.userList {
    width: 30%;
    height: 500px;
    background-color: lightcoral;
}

.edit {
    display: flex;
    padding-top: 80px;
    width: 100%;
    height: 100vh;
}

body {
  display: flex;
  padding-top: 100px;
  justify-content: center;
}
.draggable-item {
  display: flex;
  justify-content: center;
  background-color: lightblue;
  box-shadow: 0px 2px 5px #aaa;
  margin: 1%;
  padding: 1%;
}
.drop-zone {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 3px #aaa;
  margin: 20px;
  padding: 10px;
  width: 100%;
  height: 25%;
}
pre {
  background-color: #eee;
  margin-top: 30px;
  width: 90%;
  min-height: 200px;
}
</style>
