<script setup="setup">
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
    router.push('/home');
};
</script>

<template>
    <div class="test">

        <div class="container login">
            <div class="logo-box">
                <img class="logo" src="@/assets/img/logo.png" alt="logo">
            </div>
            
            <!-- <h2>여행자들을 위한 <br>모든 것</h2> -->
            <div class="login-box">
                <button class="login-btn google" @click="login">
                    <img src="@/assets/img/login/kakao_login.png" alt="login">
                </button>
                <button class="login-btn kakao" @click="login">
                    <img src="@/assets/img/login/kakao_login.png" alt="login">
                </button>
                <button class="login-btn naver" @click="login">
                    <img src="@/assets/img/login/kakao_login.png" alt="login">
                </button>
            </div>
            <!-- <img class="login-btn" src="@/assets/img/login/naver_login.png" alt="login"> -->
        </div>
    </div>
</template>

<style scoped>
.test {
    display: flex;
    justify-content: center;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.login-btn {
    width: 300px;
    height: 45px;
    margin: 15px auto;
    background-size: cover; /* 이미지 크기 조정 */
    background-color: white;
    border: none; /* 기본 테두리 제거 */
    text-indent: -9999px; /* 텍스트 숨기기 */
}

.login-btn:hover {
    opacity: 0.8;
}

.naver {
    background-image: url("@/assets/img/login/kakao_login.png");
    /* background-image: url("@/assets/img/login/naver_login.png"); 이미지 경로 */
}

.kakao {
    background-image: url("@/assets/img/login/kakao_login.png"); /* 이미지 경로 */
}

.google {
    background-image: url("@/assets/img/login/kakao_login.png");
    /* background-image: url("@/assets/img/login/google_login.png"); 이미지 경로 */
}

.login-box {
    width: 400px;
    border-top: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 30px;
}

.login {
    width: 600px;
}
.logo {
    width: 180px;
    margin-bottom: 30px;
}

.container h2 {
    text-align: left;
}

::-webkit-scrollbar {
    display: none;
}

</style>
