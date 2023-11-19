<script setup>
import banner from "../components/home/banner.vue";
import imgbutton from "../components/home/imgbutton.vue";
import popular from "../components/home/popular.vue";
import location from "../components/home/location.vue";
</script>

<template>
    <div class="main-page">
        <div class="banner">
            <banner />
        </div>
        <div class="img-button">
            <imgbutton />
        </div>
        <div class="popular">
            <popular />
        </div>
        <div class="location">
            <location />
        </div>
    </div>
</template>

<style scoped>
.main-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.img-button {
    height: 400px;
    margin: 100px 0px;
    align-items: center;
    justify-content: center;
}
.banner{
    width: 100vw;
    height: 400px;
    margin-bottom: 100px;
}
.location {
    margin: 100px 0px;
    height: 800px;
    justify-content: center;
}
</style>