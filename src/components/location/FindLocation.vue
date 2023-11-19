<template>
  <div class="location">
    <div id="map" style="width: 100%; height: 100%; background-color: transparent"></div>
    <div class="menu-toggle" :class="{ open: isMenuOpen }" @click="toggleMenu">
      <img src="../../assets/img/menu.png" style="width: 22px" />
    </div>
    <div class="sidebar" :class="{ open: isMenuOpen }">
      <div class="sidebar-content">
        <!-- 사이드바 콘텐츠 -->
        <div class="menual">
          <p>카테고리 검색</p>
        </div>
        <div class="search">
          <button class="search-btn" @click="searchByCategory('FD6')">음식점</button>
          <button class="search-btn" @click="searchByCategory('CE7')">카페</button>
          <button class="search-btn" @click="searchByCategory('AT4')">관광지</button>
          <button class="search-btn" @click="searchByCategory('AD5')">숙박</button>
        </div>
        <div class="menual">
          <p>클릭해서 네이버 검색</p>
        </div>
        <div class="place-list">
          <div
            v-for="(place, index) in placeList"
            :key="index"
            class="place-item"
            :class="{ clicked: place.clicked }"
            @click="handleClick(place)"
          >
            <div class="place-name">{{ place.place_name }}</div>
            <div class="place-address">{{ place.road_address_name }}</div>
            <div class="place-category">{{ place.category_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import marker1 from "@/assets/img/marker_512.png";
import marker2 from "@/assets/img/marker2.png";

const mapContainer = ref(null);
const map = ref(null);
const infowindow = ref(null);
const markers = ref([]);

const latitude = ref(null);
const longitude = ref(null);
const errorMessage = ref("");
const code = ref("FD6");
const placeList = ref([]);

const fetchLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        loadLocation();
      },
      (error) => {
        errorMessage.value = "Error Code = " + error.code + " - " + error.message;
      }
    );
  } else {
    errorMessage.value = "Geolocation is not supported by this browser.";
  }
};

const loadMap = () => {
  // 카카오 맵 라이브러리 로딩
  const mapOption = {
    center: new kakao.maps.LatLng(latitude.value, longitude.value - 0.01),
    level: 5,
  };

  mapContainer.value = document.getElementById("map");

  map.value = new kakao.maps.Map(mapContainer.value, mapOption);

  // 현 위치 마커를 생성
  const markerPosition = new kakao.maps.LatLng(latitude.value, longitude.value);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  var markerImage = new kakao.maps.MarkerImage(
    marker1,
    new kakao.maps.Size(31, 35),
    new kakao.maps.Point(13, 34)
  );

  marker.setImage(markerImage);
  marker.setMap(map.value);

  // 원 그리기 시작
  const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(latitude.value, longitude.value), // 원의 중심좌표 입니다
    radius: 1000, // 미터 단위의 원의 반지름입니다
    strokeWeight: 2, // 선의 두께입니다
    strokeColor: "#75B8FA", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일 입니다
    fillColor: "#CFE7FF", // 채우기 색깔입니다
    fillOpacity: 0.3, // 채우기 불투명도 입니다
  });

  // 지도에 원을 표시합니다
  circle.setMap(map.value);
  // 원 그리기 종료

  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwRemoveable = true;
  infowindow.value = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  searchPlaces(code.value, map.value);
};

const loadLocation = () => {
  console.log(latitude.value, longitude.value);
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = import.meta.env.VITE_KAKAOLOCATIONS;
  document.head.appendChild(script);

  script.onload = () => {
    if (kakao && kakao.maps && kakao.maps.readyState > 0) {
      loadMap();
      return;
    }
    kakao.maps.onloadcallbacks.push(loadMap);
    kakao.maps.load();
  };
};

// 장소 검색
const searchPlaces = (code, map) => {
  console.log(code);
  if (code) {
    const ps = new kakao.maps.services.Places();
    ps.categorySearch(code, placesSearchCB, {
      x: longitude.value,
      y: latitude.value,
      radius: 1000,
    });
    kakao.maps.load();
  }
};

const placesSearchCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    clearMarkers();
    var bounds = new kakao.maps.LatLngBounds();
    placeList.value = data;
    console.log(placeList.value);
    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i]);
    }
  }
};

const displayMarker = (place) => {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map.value,
    position: new kakao.maps.LatLng(place.y, place.x),
  });
  var markerImage = new kakao.maps.MarkerImage(
    marker2,
    new kakao.maps.Size(31, 35),
    new kakao.maps.Point(13, 34)
  );

  marker.setImage(markerImage);
  markers.value.push(marker);

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", () => {
    const content = `
      <div class="info-window" style="padding:5px;font-size:12px;">
        ${place.place_name}<br>
        ${place.road_address_name || place.address_name}
      </div>
    `;
    infowindow.value.setContent(content);
    infowindow.value.open(map.value, marker);
  });
};

const searchByCategory = (categoryCode) => {
  code.value = categoryCode;
  searchPlaces(code.value);
};

const clearMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null); // Remove marker from the map
  });
  markers.value = []; // Clear the markers array
};

onMounted(fetchLocation);

const handleClick = (place) => {
  place.clicked = !place.clicked; // 클릭 상태 토글
  searchNaver(place); // 다른 작업 수행 (예: searchNaver 함수 호출)
};

const searchNaver = (place) => {
  console.log(place.place_name);
  const cityWords = place.road_address_name.split(" ");
  const city = encodeURIComponent(cityWords[0]);
  const name = encodeURIComponent(place.place_name);
  const url = `https://search.naver.com/search.naver?query=${city} ${name}`;
  window.open(url, "_blank");
};

const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
<style scoped>
.menual {
  text-align: center;
  margin-bottom: 2px;
}

.menual p {
  font-size: 13px;
  color: #888;
}
.search {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 20px;
}

.search-btn {
  width: 25%;
  padding: 10px 5px;
  background-color: #4caf50; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색 */
  border: none; /* 테두리 제거 */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px; /* 버튼 모서리 둥글게 */
}

.location {
  width: 100vw;
  height: calc(100vh - 60px);
}

#map {
  background-color: transparent !important;
}

.menu-toggle {
  position: fixed;
  width: 30px;
  height: 50px;
  left: 0; /* 기본 위치 */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1001;
  transition: left 0.3s ease;
  background-color: #ffffff;
  border: 1px solid #c7c6c6;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.menu-toggle.open {
  left: 30%; /* 메뉴가 열렸을 때 버튼의 위치 */
}

.sidebar {
  position: fixed;
  left: -30%; /* 메뉴 초기 위치 */
  top: 60px;
  width: 30%;
  height: calc(100% - 60px); /* 전체 높이에서 네비게이션바 높이를 뺌 */
  background-color: #ffffff;
  color: black;
  z-index: 1000;
  transition: left 0.3s ease;
  border-top: 1px solid #ddd;
  overflow-y: auto; /* 스크롤 추가 */
}

.sidebar.open {
  left: 0; /* 메뉴가 열릴 때 위치 */
}

.sidebar-content {
  padding: 20px;
  /* 추가 콘텐츠 스타일링 */
}

.sidebar::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

/* 스크롤바 핸들 (움직이는 부분) 스타일링 */
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #b3b3b3;
}

/* 스크롤바 너비 설정 */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.place-list .place-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.place-name {
  font-weight: bold;
}

.place-item {
  /* 기존 스타일 */
  cursor: pointer; /* 마우스 올렸을 때 손가락 모양으로 변경 */
  transition: background-color 0.3s; /* 배경색 변경에 애니메이션 효과 적용 */
}

.place-item:hover {
  background-color: #f0f0f0; /* 호버 상태일 때 배경색 변경 */
}
.place-item.clicked .place-name {
  color: rgb(221, 45, 45); /* 클릭 상태일 때 글자색 변경 */
}
.place-address,
.place-category {
  font-size: 14px;
}
</style>
