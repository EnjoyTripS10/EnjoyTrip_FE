<template>
    <div class="upload-container">
      <div class="input-container">
        <div class="title-input-container">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" class="title-input" />
        </div>
        <div class="content-input-container">
          <label for="content">Content:</label>
          <textarea type="text" id="content" v-model="content" class="content-input"></textarea>
        </div>
        <div >
          <div class="location-input-container">
            <label for="location">Location:</label>
            <input type="text" id="location" v-model="searchQuery" @keyup.enter="searchPlaces" class="location-input" />
            <button class="circle-button" @click="searchPlaces">Search</button>
          </div>
          <hr>
            <div id="map" style="width:100%; height:400px; background-color: transparent;"></div>
            <div id="clickLatlng"></div>
        </div>
        <div class="file-input-container">
          <input type="file" id="file" @change="handleFiles" multiple accept="image/*" class="file-input" />
          <label for="file" class="file-label">이미지 선택</label>
        </div>
        
    
      </div>
      <ul v-if="files.length" class="file-list">
        <li v-for="file in files" :key="file.name" class="file-item">{{ file.name }}</li>
      </ul>
      <button @click="uploadFiles" class="upload-btn">Upload</button>
    </div>
  </template>location
  
<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';

  const files = ref([]);
  const title = ref('');

  const searchQuery = ref('');
  const mapContainer = ref(null);
  const map = ref(null);
  const infowindow = ref(null);
  const markers = ref([]);
  const inLocation = ref({});
  

  const handleFiles = (event) => {
    files.value = Array.from(event.target.files);
    if (files.value.length > 10) {
        alert('최대 10개의 파일만 업로드할 수 있습니다.');
        event.target.value = ''; // 입력 필드 초기화
      } else {
        files.value = selectedFiles;
      }
  };

  const uploadFiles = async () => {
    console.log(title.value)
    console.log(content.value)
    console.log(inLocation.value)

    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content',content.value)
    formData.append('inLocation', JSON.stringify(inLocation.value))
    files.value.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };


  const searchPlaces = () => {
    console.log(searchQuery)
    if (searchQuery.value) {

      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchQuery.value, placesSearchCB);
      kakao.maps.load();
    }
  };
  const loadMap = () => {
    // 카카오 맵 라이브러리 로딩
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };

    mapContainer.value = document.getElementById('map')
    const iwContent = '<div style="padding:5px;">Hello World!</div>';
    const iwRemoveable = true;
    infowindow.value = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable
    });

    map.value = new kakao.maps.Map(mapContainer.value, mapOption);
    searchPlaces();
    // const ps = new kakao.maps.services.Places();
    // ps.keywordSearch('이성당', placesSearchCB);

  }
  const loadLocation = () => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = import.meta.env.VITE_KAKAOLOCATIONS
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.onloadcallbacks.push(loadMap);
      kakao.maps.load();
    }

  };
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      clearMarkers();
      var bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      map.value.setBounds(bounds);
    }
  };
  const displayMarker = (place) => {
    // clearMarkers()
    var marker = new kakao.maps.Marker({
      map: map.value,
      position: new kakao.maps.LatLng(place.y, place.x)
    });
    markers.value.push(marker); // Add the new marker to the array

    kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.value.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.value.open(map.value, marker);

      var message = place.place_name+'/' + place.road_address_name + " /" + place.category_group_name;
      // place.x place.y
      // console.log(infowindow.value);
      inLocation.value = {
        locationName : place.place_name,
        locationAddr : place.road_address_name,
        locationLat : place.x,
        locationLon : place.y,
        locationType : place.category_group_name
      };
      var resultDiv = document.getElementById('clickLatlng');
      resultDiv.innerHTML = message;
    });
  };

  const clearMarkers = () => {
    markers.value.forEach(marker => {
      marker.setMap(null); // Remove marker from the map
    });
    markers.value = []; // Clear the markers array
  };

  onMounted(loadLocation);

</script>
  <style>
   label {
    font-size: 30px; /* 글자 크기 증가 */
  }
  label[for="file"] {
    font-size: 20px; /* 글자 크기 증가 */
  }
  /* 전체 컨테이너를 중앙 정렬 */
  .upload-container {
    padding: 30px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드 스타일의 그림자 */
    width: 50%; /* 창의 50% 너비 */
    min-width: 500px; /* 최소 너비 설정 */
    max-width: 80%; /* 최대 너비를 80%로 설정하여 유연성 부여 */
    margin: 0 auto; /* 좌우 자동 마진으로 중앙 정렬 */
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    position: relative; /* 포지션 설정 */
    /* top: 100%; 상단에서 50% 위치 */
    transform: translateY(40%); /* Y축 기준 50% 위로 이동 */
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

.upload-btn:hover, .upload-btn:focus {
  background-color: #82a7cf; /* 어두운 파란색으로 변경 */
  transform: scale(1.05); /* 버튼을 약간 확대 */
  outline: none; /* 포커스시 윤곽선 제거 */
}
  
  input,textarea {
    padding: 12px; /* 패딩 증가 */
    font-size: 30px; /* 글자 크기 증가 */
    width: 100%;
  }
  /* 레이블과 인풋 필드 스타일링 */
  .title-input-container,
  .content-input-container,
  .location-input-container {
    margin-bottom: 10px;
    display: flex;
    
    align-items: center;
    gap: 25px;
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
    padding: 10px 20px;
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
    font-size: 24px; /* 글자 크기 */
    cursor: pointer; /* 커서 스타일 변경 */
    outline: none; /* 포커스시 윤곽선 제거 */
    transition: background-color 0.3s; /* 배경색 변경시 부드러운 전환 효과 */
  }

  .circle-button:hover {
    background-color: #a9bbce; /* 호버시 배경 색상 변경 */
  }
  #map{
     background-color: transparent !important;
  }
  </style>
  