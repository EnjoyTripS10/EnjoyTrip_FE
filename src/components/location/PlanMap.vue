<template>
  <div class="location">
    <div id="map" style="width: 100%; height: 100%; background-color: transparent"></div>
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

const props = defineProps({
  locationGroup: Array,
});

// const watchEffect(() => {
//   if (props.locationGroup && props.locationGroup.length > 0) {
//     clearMarkers(); // 기존 마커 제거
//     props.locationGroup.forEach((location) => {
//       displayMarker(location);
//     });
//   }
// });

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
  console.log(place);
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
</style>
