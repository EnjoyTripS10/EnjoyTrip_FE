<template>
    <div class="upload-container">
      <div class="input-container">
        <div class="title-input-container">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" class="title-input" />
        </div>
        <div class="content-input-container">
          <label for="content">Content:</label>
          <input type="text" id="content" v-model="content" class="content-input" />
        </div>
        <div class="location-input-container">
          <label for="location">Location:</label>
          <input type="text" id="location" v-model="location" class="location-input" />
        </div>
        <input type="file" @change="handleFiles" multiple accept="image/*" class="file-input" />
    
        <button @click="uploadFiles" class="upload-btn">Upload</button>
      </div>
      <ul v-if="files.length" class="file-list">
      <li v-for="file in files" :key="file.name" class="file-item">{{ file.name }}</li>
    </ul>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import axios from 'axios';

const files = ref([]);
const title = ref('');

const handleFiles = (event) => {
  files.value = Array.from(event.target.files);
};

const uploadFiles = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  files.value.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post('YOUR_API_ENDPOINT', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('File uploaded successfully', response.data);
  } catch (error) {
    console.error('Error uploading file', error);
  }
};
</script>
  <style>
  /* 전체 컨테이너를 중앙 정렬 */
  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    max-width: 500px; /* 적당한 최대 너비 */
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드 스타일의 그림자 */
  }
  .upload-btn {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #007BFF; /* 밝은 파란색 */
  color: white;
  border: none;
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 16px; /* 큰 글꼴 크기 */
  font-weight: bold; /* 굵은 글꼴 */
  text-transform: uppercase; /* 대문자 변환 */
  transition: background-color 0.3s, transform 0.3s; /* 부드러운 색상 및 변형 전환 */
}

.upload-btn:hover, .upload-btn:focus {
  background-color: #0056b3; /* 어두운 파란색으로 변경 */
  transform: scale(1.05); /* 버튼을 약간 확대 */
  outline: none; /* 포커스시 윤곽선 제거 */
}
  
  .input-container {
    width: 100%;
  }
  
  /* 레이블과 인풋 필드 스타일링 */
  .title-input-container,
  .content-input-container,
  .location-input-container {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  
  .title-input,
  .content-input,
  .location-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
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
  </style>
  