<script setup="setup">
import { useRouter } from 'vue-router';
import { ref, onMounted  } from 'vue';
import axios from 'axios';
import cookie from '@/utils/cookie.js';

const router = useRouter();

const userKey = ref('');
const user = ref({
    id: '',
    userId: '',
    userName: '',
    userEmail: ''
});
const isLogin = ref(false);

const init = () => {
    userKey.value = cookie.getCookie('user-key'); // userKey 초기화
    if (isLogin.value) {
        getUser();
    }
};

const getUser = () => {
    console.log("getUser")
    console.log(userKey.value)
    axios.get('/api/user/' + userKey.value).then((response) => {
        console.log(response.data)
        user.value = response.data;
        console.log(user.value)

    });
};

const login = () => {
    router.push('/home');
};

const doGoogleLogin = () => {
    console.log("google")
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
        import.meta.env.VITE_APP_GOOGLE_CLIENT_ID +
        '&redirect_uri=' +
        import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL +
        '&response_type=code' +
        '&scope=email profile';

    showSocialLoginPopup(url)
}
const doNaverLogin = () => {
    const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
        import.meta.env.VITE_APP_NAVER_CLIENT_ID +
        '&redirect_uri=' +
        import.meta.env.VITE_APP_NAVER_REDIRECT_URL +
        '&state=1234';

    showSocialLoginPopup(url)
}
const doKakaoLogin = () => {
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' +
        import.meta.env.VITE_APP_KAKAO_CLIENT_ID +
        '&redirect_uri=' +
        import.meta.env.VITE_APP_KAKAO_REDIRECT_URL +
        '&response_type=code&' +
        'scope=account_email birthday gender profile_nickname profile_image'

    showSocialLoginPopup(url)
}
const showSocialLoginPopup = (url) => {
    const popupHeight = '500'
    const popupWidth = '500'
    let popupOptions = 'height=--popupHeight--,width=--popupWidth--,left=--popupX--,top=--popupY--,scrollbars=yes,resizable=yes'

    popupOptions = popupOptions.replace('--popupHeight--', popupHeight)
    popupOptions = popupOptions.replace('--popupWidth--', popupWidth)

    openPopup(url, popupOptions)
    return false
}
const openPopup = (url, options) => {
    window.open(
        url,
        '_blank',
        options
    )
}
const doLogout = () => {
    cookie.removeCookie('user-key')
    cookie.removeCookie('accessToken')
    userKey.value = ''
    user.value = {}
    window.location.reload();
}
const validation = () => {
    let accessToken = this.$cookie.getCookie('accessToken')
    // let id = this.$cookie.getCookie('user-key')
    // let body = {
    //   accessToken,
    //   id,
    // }

    axios.get('/api/token/' + accessToken)
        .then(response => console.log(response));
}

onMounted(() => {
    userKey.value = cookie.getCookie('user-key');
    isLogin.value = Boolean(userKey.value);
    init();
});

</script>

<template>
    <div class="test" style="text-align: left; padding: 0 15%">
        <div v-if="isLogin">
          <div>
            유저 정보
          </div>
          <div >
            <b-form-group>
                유저 아이디
              {{user.id}}
            </b-form-group>
            <b-form-group
                label="아이디">
              {{user.userId}}
            </b-form-group>
            <b-form-group
                label="이름">
              {{user.userName}}
            </b-form-group>
            <form-group
                label="이메일">
              {{user.userEmail}}
            </form-group>
            </div>
            <button variant="danger" @click="doLogout()">로그아웃</button>
            <button variant="secondary" @click="validation()">유효성 판단</button>
          
        </div>

        <b-card v-else>

            <div class="container login">
                <div class="logo-box">
                    <img class="logo" src="@/assets/img/logo.png" alt="logo">
                </div>
                
                <!-- <h2>여행자들을 위한 <br>모든 것</h2> -->
                <div class="login-box">
                    <button class="login-btn google" @click="doGoogleLogin()">
                        <img src="@/assets/img/login/kakao_login.png" alt="login">
                    </button>
                    <button class="login-btn kakao" @click="doNaverLogin()">
                        <img src="@/assets/img/login/kakao_login.png" alt="login">
                    </button>
                    <button class="login-btn naver" @click="doKakaoLogin()">
                        <img src="@/assets/img/login/kakao_login.png" alt="login">
                    </button>
                </div>
                <!-- <img class="login-btn" src="@/assets/img/login/naver_login.png" alt="login"> -->
            </div>
        </b-card>
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
