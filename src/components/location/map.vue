<template>
  <div class="location">
    <div class="location-input-container">
      <label class="location-label" for="location">장소 검색:</label>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const searchQuery = ref("");
const mapContainer = ref(null);
const map = ref(null);
const infowindow = ref(null);
const markers = ref([]);
//   const inLocation = ref({});

const props = defineProps({
  updateLocation: Function,
});

const someMethodToUpdateLocation = () => {
  const newLocation = {
    /* 새로운 위치 정보 */
  };
  props.updateLocation(newLocation);
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

  map.value = new kakao.maps.Map(mapContainer.value, mapOption);
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
  };
};

const searchPlaces = () => {
  console.log(searchQuery);
  if (searchQuery.value) {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchQuery.value, placesSearchCB);
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
    const newLocation = {
      locationName: place.place_name,
      locationAddr: place.road_address_name,
      locationLat: place.x,
      locationLon: place.y,
      locationType: place.category_group_name,
    };
    props.updateLocation(newLocation);
    var resultDiv = document.getElementById("clickLatlng");
    resultDiv.innerHTML = message;
  });
};

const clearMarkers = () => {
  markers.value.forEach((marker) => {
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

.location-input-container {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  align-items: center;
}
.location-input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

#map {
  background-color: transparent !important;
}

.circle-button {
  width: 5%;
}

.location-label {
  width: 20%;
}
</style>
