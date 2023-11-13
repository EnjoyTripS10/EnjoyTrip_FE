<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToMainPage = () => {
    router.push('/login');
};
</script>

<template>
    <div class="container">
<h1>뻔하지 않은<br/>
    로컬 여행의 모든 것</h1>
<br/>
<br/>
<br/>
<button class="btn" @click="navigateToMainPage" >지금 시작하기</button>
<div class="arrow">
    <p>더 보기</p>
    <img src="../../assets/img/arrow.png"/>
</div>
</div>
</template>

<style scoped>
.arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
}
.arrow img {
    width: 50px;
    animation: bounce 1s infinite;
}
.arrow p {
    margin-bottom: 13px;
}
.btn {
    display: inline-block;
    outline: 0;
    text-align: center;
    cursor: pointer;
    padding: 17px 30px;
    border: 0;
    color: #fff;
    font-size: 17.5px;
    border: 2px solid transparent;
    border-color: #000;
    color: #000;
    background: transparent;
    font-weight: 800;
    line-height: 30px;
    transition: background,color 0.1s ease-in-out;
}

.btn:hover {
    background-color: #000;
    color: #fff;
}

h1 {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    animation: animate 5s infinite;
}

@keyframes animate {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes bounce { /* 애니메이션 정의 */
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

</style>