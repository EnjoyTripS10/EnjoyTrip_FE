<!-- SelectLocation.vue -->
<template>
  <div class="location">
    <div class="location-input-container">
      <label for="location">Location:</label>
      <input
        type="text"
        id="location"
        v-model="searchQuery"
        @keyup.enter="searchPlaces"
        class="location-input"
      />
      <button class="circle-button" @click="searchPlaces">Search</button>
    </div>
    <hr />
    <div id="map" style="width: 100%; height: 400px; background-color: transparent"></div>
    <div id="clickLatlng"></div>
    <button class="btn" @click="addNewLocation">추가</button>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";

const searchQuery = ref("");
const mapContainer = ref(null);
const map = ref(null);
const infowindow = ref(null);
const markers = ref([]);
//   const inLocation = ref({});

const props = defineProps({
  updateLocation: Function,
});

const searchPlaces = () => {
  console.log(searchQuery);
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
    level: 3,
  };

  mapContainer.value = document.getElementById("map");
  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwRemoveable = true;
  infowindow.value = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  console.log(mapContainer.value);
  map.value = new kakao.maps.Map(mapContainer.value, mapOption);
  console.log(map.value);
  searchPlaces();
  // const ps = new kakao.maps.services.Places();
  // ps.keywordSearch('이성당', placesSearchCB);
};
const loadLocation = () => {
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
    console.log("script loaded");
  };
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

let newLocation = ref(null);
let showModal = ref(false);

const displayMarker = (place) => {
  // clearMarkers()
  var marker = new kakao.maps.Marker({
    map: map.value,
    position: new kakao.maps.LatLng(place.y, place.x),
  });
  markers.value.push(marker); // Add the new marker to the array

  kakao.maps.event.addListener(marker, "click", () => {
    infowindow.value.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    infowindow.value.open(map.value, marker);

    var message =
      place.place_name + "/" + place.road_address_name + " /" + place.category_group_name;
    // place.x place.y
    // console.log(infowindow.value);
    newLocation.value = {
      locationName: place.place_name,
      locationAddr: place.road_address_name,
      locationLat: place.x,
      locationLon: place.y,
      locationType: place.category_group_name,
      showDropdown: false,
      memo: "",
    };

    console.log(newLocation);
    var resultDiv = document.getElementById("clickLatlng");
    resultDiv.innerHTML = message + ``;
  });
};

const addNewLocation = () => {
  // 여기에 newLocation 객체를 생성하는 로직을 작성
  if (newLocation.value == null) {
    alert("장소를 선택해주세요");
    return;
  }
  
  props.updateLocation(newLocation, showModal);
};

const clearMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null); // Remove marker from the map
  });
  markers.value = []; // Clear the markers array
};

// onMounted(loadLocation);

onMounted(() => {
  loadLocation();
  console.log("1 " + map.value);
});

onUnmounted(() => {
  console.log("2 " + map.value);
});
</script>
<style>
.btn {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

label {
  font-size: 30px; /* 글자 크기 증가 */
}
label[for="file"] {
  font-size: 20px; /* 글자 크기 증가 */
}

.location-input-container {
  margin-bottom: 10px;
  display: flex;

  align-items: center;
  gap: 25px;
}
.location-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

#map {
  background-color: transparent !important;
}
</style>
