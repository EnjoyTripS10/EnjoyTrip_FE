<template>
  <div class="location">
    <div id="map" style="width: 100%; height: 100%; background-color: transparent"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import marker2 from "@/assets/img/marker2.png";

const mapContainer = ref(null);
const map = ref(null);
const infowindow = ref(null);
const markers = ref([]);

const latitude = ref(null);
const longitude = ref(null);
const errorMessage = ref("");
const linePath = ref([]);
const currentPolyline = ref(null);

const props = defineProps({
  locationGroup: Array,
});

watch(
  () => props.locationGroup,
  (locationGroup) => {
    if (locationGroup && locationGroup.length > 0) {
      clearMarkers(); // 기존 마커 제거
      linePath.value = [];
      locationGroup.forEach((location) => {
        linePath.value.push(new kakao.maps.LatLng(location.locationLon, location.locationLat));
        displayMarker(location);
      });
      // console.log(locationGroup);
      console.log(linePath.value);
      drawLine();
    }
  }
);

const drawLine = () => {
  if (currentPolyline.value) {
    currentPolyline.value.setMap(null);
  }

  currentPolyline.value = new kakao.maps.Polyline({
    path: linePath.value, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 2, // 선의 두께 입니다
    strokeColor: "#0957A2", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });
  currentPolyline.value.setMap(map.value);
};

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
    level: 10,
  };

  mapContainer.value = document.getElementById("map");

  map.value = new kakao.maps.Map(mapContainer.value, mapOption);

  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwRemoveable = true;
  infowindow.value = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });
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

const displayMarker = (place) => {
  // 마커를 생성하고 지도에 표시합니다
  console.log(place.locationLat, place.locationLon);
  var marker = new kakao.maps.Marker({
    map: map.value,
    position: new kakao.maps.LatLng(place.locationLon, place.locationLat),
  });
  var markerImage = new kakao.maps.MarkerImage(
    marker2,
    new kakao.maps.Size(31, 35),
    new kakao.maps.Point(13, 34)
  );

  console.log(map.value);
  marker.setImage(markerImage);
  marker.setMap(map.value);
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

const clearMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null); // Remove marker from the map
  });
  markers.value = []; // Clear the markers array
};

onMounted(fetchLocation);
</script>

<style scoped>
.location {
  width: 100%;
  height: 100%;
  border: 0.5px solid #ccc;
}

#map {
  background-color: transparent !important;
}

.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png");
}
.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: "";
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png");
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
</style>
