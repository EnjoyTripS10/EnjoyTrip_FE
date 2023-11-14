<script setup>

</script>

<template>
    <header class="header">
        <div class="logo">VirusTrip</div>
        <nav class="navbar">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </nav>
    </header>
</template>

<style scoped>
.header {
    position: fixed; /* 헤더 위치를 고정 */
    top: 0; /* 상단에서 0px의 위치 */
    left: 0; /* 좌측에서 0px의 위치 */
    width: 100%;
    height: 60px; /* 헤더 너비를 화면 전체로 설정 */
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    background-color: #f5f5f7;
    color: rgb(0, 0, 0);
    /* padding: 10px 20px; */
    box-shadow: 0px 2px 4px rgba(0,0,0,0.2); /* 하단 그림자 효과 추가 */
    z-index: 1000; /* 다른 요소들 위에 헤더가 오도록 z-index 설정 */
    overflow: hidden;
}
.logo {
    margin-left: 60px;
    width:240px;
    font-size: 24px;
    font-weight: bold;
}
.navbar {
    display: flex;
    justify-content: flex-end;
    margin-right: 60px;
    width: 100%;
}
.navbar a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    margin: 0 20px;
}

/* .navbar a:hover {
    background-color: rgba(160, 158, 158, 0.5); 
     box-shadow: 0 0 10px rgba(0,0,0,0.2), 
                0 0 20px rgba(0,0,0,0.2), 
                0 0 30px rgba(0,0,0,0.2), 
                0 0 40px rgba(0,0,0,0.2);
} */

</style>