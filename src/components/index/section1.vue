<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from '@/axiosConfig.js';
import cookie from "@/utils/cookie.js";

const router = useRouter();

const userKey = ref("");
const user = ref({
  id: "",
  userId: "",
  userName: "",
  userEmail: "",
});
const isLogin = ref(false);

const init = () => {
  userKey.value = cookie.getCookie("user-key"); // userKey 초기화
  if (isLogin.value) {
    getUser();
  }
};

const getUser = () => {
  console.log("getUser");
  console.log(userKey.value);
  axios.get("/api/user/" + userKey.value).then((response) => {
    console.log(response.data);
    user.value = response.data;
    console.log(user.value);
  });
  router.push("/home");
};

const login = () => {
  router.push("/home");
};

const doKakaoLogin = () => {
  const url =
    "https://kauth.kakao.com/oauth/authorize?client_id=" +
    import.meta.env.VITE_APP_KAKAO_CLIENT_ID +
    "&redirect_uri=" +
    import.meta.env.VITE_APP_KAKAO_REDIRECT_URL +
    "&response_type=code&" +
    "scope=account_email profile_nickname profile_image";

  showSocialLoginPopup(url);
  init();
};
const showSocialLoginPopup = (url) => {
  const popupHeight = "500";
  const popupWidth = "500";
  // 현재 화면의 중앙 위치 계산
  const popupX = window.innerWidth / 3 - popupWidth / 2;
  const popupY = window.innerHeight / 3 - popupHeight / 2;

  let popupOptions =
    "height=--popupHeight--,width=--popupWidth--,left=--popupX--,top=--popupY--,scrollbars=yes,resizable=yes";

  // 팝업 옵션에 높이, 너비, 위치 설정 적용
  popupOptions = popupOptions
    .replace("--popupHeight--", popupHeight)
    .replace("--popupWidth--", popupWidth)
    .replace("--popupX--", popupX)
    .replace("--popupY--", popupY);

  openPopup(url, popupOptions);
  return false;
};
const openPopup = (url, options) => {
  window.open(url, "_blank", options);
};
const doLogout = () => {
  cookie.removeCookie("user-key");
  cookie.removeCookie("accessToken");
  userKey.value = "";
  user.value = {};
  window.location.reload();
};
const validation = () => {
  let accessToken = this.$cookie.getCookie("accessToken");
  // let id = this.$cookie.getCookie('user-key')
  // let body = {
  //   accessToken,
  //   id,
  // }

  axios.get("/api/token/" + accessToken).then((response) => console.log(response));
};

onMounted(() => {
  userKey.value = cookie.getCookie("user-key");
  isLogin.value = Boolean(userKey.value);
  init();
});

const navigateToMainPage = () => {
  router.push("/login");
};
</script>

<template>
  <div class="container">
    <h1>
      뻔하지 않은<br />
      로컬 여행의 모든 것
    </h1>
    <br />
    <br />
    <br />
    <button class="btn" @click="doKakaoLogin()">카카오톡으로 지금 시작하기</button>
    <div class="arrow">
      <p>더 보기</p>
      <img src="../../assets/img/arrow.png" />
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
  transition: background, color 0.1s ease-in-out;
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

@keyframes bounce {
  /* 애니메이션 정의 */
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
