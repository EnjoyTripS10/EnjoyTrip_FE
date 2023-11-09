<script setup>
const { ref, onMounted } = Vue;

let latitude;
let longitude;

if (navigator.geolocation) {
  // GPS 위치 가져오기
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  }
)}

</script>

<template>
    <h1>지도</h1>
    <div id="map"></div>
</template>

<style scoped>
h1 {
    margin-top: 10px;
    text-align: center;
}

#map {
  width: 400px;
  height: 400px;
}
</style>