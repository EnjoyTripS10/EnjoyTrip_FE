<template>
  <div class="upload-container">
    <div class="title">
      <label>장소 등록하기</label>
    </div>
    <div class="input-container">
      <div class="title-input-container">
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="title" class="title-input" />
      </div>
      <div class="content-input-container">
        <label for="content">내용:</label>
        <input type="text" id="content" v-model="content" class="content-input" />
      </div>
      <label for="content">장소를 선택해 주세요</label>
      <MapComponent :updateLocation="updateParentLocation"></MapComponent>
      <hr />
      <br />
      <div class="file-input-container">
        <input
          type="file"
          id="file"
          @change="handleFiles"
          multiple
          accept="image/*"
          class="file-input"
        />
        <label for="file" class="file-label">사진 업로드</label>
      </div>
    </div>
    <ul v-if="files.length" class="file-list">
      <li v-for="file in files" :key="file.name" class="file-item">{{ file.name }}</li>
    </ul>
    <button @click="uploadFiles" class="upload-btn">등록</button>
  </div>
</template>
location

<script setup>
import { ref } from "vue";
import axios from "@/axiosConfig.js";
import { useRouter } from "vue-router";
import MapComponent from "../../components/location/map.vue";
import Swal from "sweetalert2";

const files = ref([]);
const title = ref("");
const inLocation = ref({});

const updateParentLocation = (newLocation) => {
  inLocation.value = newLocation;
};

const handleFiles = (event) => {
  files.value = Array.from(event.target.files);
  if (files.value.length > 5) {
    alert("최대 5개의 파일만 업로드할 수 있습니다.");
    event.target.value = ""; // 입력 필드 초기화
  } else {
    // files.value = selectedFiles;
  }
};
const router = useRouter();

const uploadFiles = async () => {
  if (!title.value || !content.value || !inLocation.value || files.value.length === 0) {
    Swal.fire({
      title: "등록 실패",
      text: "모든 필드를 작성해주세요.",
      icon: "error",
      confirmButtonText: "확인",
    });
    return;
  }
  console.log(title.value);
  console.log(content.value);
  console.log(inLocation.value);

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("inLocation", JSON.stringify(inLocation.value));
  files.value.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post("/board", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File uploaded successfully", response.data);
  } catch (error) {
    console.error("Error uploading file", error);
  }
  router.push("/boardList");
};
</script>
<style>
.title {
  margin-top: 20px;
  margin-bottom: 30px;
}
label {
  font-size: 1.1rem; /* 글자 크기 증가 */
  font-weight: bold; /* 굵은 글꼴 */
  width: 10%;
}
label[for="file"] {
  font-size: 15px; /* 글자 크기 증가 */
}
/* 전체 컨테이너를 중앙 정렬 */
.upload-container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px auto 0px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드 스타일의 그림자 */
  width: 100%; /* 창의 50% 너비 */
  height: auto;
  min-width: 500px; /* 최소 너비 설정 */
  max-width: 80%; /* 최대 너비를 80%로 설정하여 유연성 부여 */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  position: relative; /* 포지션 설정 */
  /* top: 100%; 상단에서 50% 위치 */
}

.input-container {
  width: 60%;
  height: 100%;
}

.upload-btn {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #a9bbce; /* 밝은 파란색 */
  color: white;
  border: none;
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 16px; /* 큰 글꼴 크기 */
  font-weight: bold; /* 굵은 글꼴 */
  text-transform: uppercase; /* 대문자 변환 */
  transition: background-color 0.3s, transform 0.3s; /* 부드러운 색상 및 변형 전환 */
}

.upload-btn:hover,
.upload-btn:focus {
  background-color: #82a7cf; /* 어두운 파란색으로 변경 */
  transform: scale(1.05); /* 버튼을 약간 확대 */
  outline: none; /* 포커스시 윤곽선 제거 */
}

input,
textarea {
  padding: 12px; /* 패딩 증가 */
  font-size: 30px; /* 글자 크기 증가 */
  width: 100%;
  resize: none;
}
/* 레이블과 인풋 필드 스타일링 */
.title-input-container,
.content-input-container {
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}

.title-input,
.content-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

.content-input {
  height: 150px;
}

.file-input {
  margin-bottom: 10px;
}

.title-input-container {
  margin-bottom: 10px;
}

.title-input {
  margin-left: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.file-input-container {
  position: relative;
  margin-bottom: 10px;
}

.file-input {
  width: 100%;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.file-label {
  display: block;
  background-color: #a9bbce;
  color: white;
  text-align: center;
  width: 20%;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #a9bbce;
}
.circle-button {
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 80px; /* 원의 지름 */
  height: 40px; /* 원의 지름 */
  line-height: 40px;
  border-radius: 5px; /* 원형으로 만듦 */
  border: none; /* 테두리 없앰 */
  background-color: #a9bbce; /* 배경 색상 */
  color: white; /* 글자 색상 */
  font-size: 15px; /* 글자 크기 */
  cursor: pointer; /* 커서 스타일 변경 */
  outline: none; /* 포커스시 윤곽선 제거 */
  transition: background-color 0.3s; /* 배경색 변경시 부드러운 전환 효과 */
}

.circle-button:hover {
  background-color: #a9bbce; /* 호버시 배경 색상 변경 */
}
</style>
