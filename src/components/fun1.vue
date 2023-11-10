<script setup>
import { ElContainer } from "element-plus";
import Card from "@/components/common/Card.vue";

</script>

<template>
    <div class="container">
        <div class="title" id="container">
        <h1>최근 게시물</h1>
    </div>
        <div class="box">
            <Card photo="../src/assets/img/photo1.jpg" text="게시글1" location="장소"/>
            <Card photo="../src/assets/img/photo2.jpg" text="게시글2" location="장소"/>
            <Card photo="../src/assets/img/photo3.jpg" text="게시글3" location="장소"/>
            <Card photo="../src/assets/img/photo4.jpg" text="게시글4" location="장소"/>
            <Card photo="../src/assets/img/photo1.jpg" text="게시글1" location="장소"/>
        </div>
    </div>
</template>

<style scoped>

h1 {
    color: white;
}
.title {
    text-align: center;
}
.container {
    width: 100%;
    height: 600px;
}

.box .el-card {
    margin-left: 50px;
    width: 300px;
    height: 400px;
}

.box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 50px;
}
</style>
