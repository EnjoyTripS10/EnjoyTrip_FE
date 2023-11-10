<script setup="setup"></script>


<template>
    <div class="container">
        <div class="left">
        </div>

        <div class="middle">
            <div class="title-slogan">
                <h1>뻔하지 않은 </h1>
                <h1>로컬 여행의 모든 것</h1>
                <!-- <p>지금 바로 인조이트립에서 그동안 발견하지 못했던
감각적인 공간들을 만나보고,
일상에 신선한 자극을 불어넣어 보세요.</p> -->
            </div>
        </div>

        <div class="right">
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="img-layer">
                <p>1</p>
            </div>
            <div class="img-layer">
                <p>1</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.img-right {
    float: right;
    margin: 20px;
}

.img-left {
    float: left;
    margin: 20px;
}

.img-center {
    margin: 20px;
}
.title-slogan {
    margin-top: 300px;
    text-align: center;
}

h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
}
.empty {
    height: 100px;
}
.img-layer {
    margin-bottom: 100px;
}
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
}

.left {
    flex: 1;
}

.middle {
    flex: 1;
}

.right {
    flex: 1;
}
</style>