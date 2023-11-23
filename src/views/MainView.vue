<script setup>
import { ref, onMounted, watch } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";
import $cookie from "@/utils/cookie.js";

const isNotificationOpen = ref(false);
const receivedMessages = ref([]);
const Msgcnt = ref(0);

// 알림창 토글 함수
const toggleNotification = () => {
  console.log("알림창 토글");
  isNotificationOpen.value = !isNotificationOpen.value;
};

onMounted(() => {
  const email = $cookie.getCookie("user");
  window.sessionStorage.setItem("user", email);

  console.log(email);

  const socket = new SockJS(`http://192.168.120.75:17000/push?userId=${email}`); // 웹소켓 서버 URL
  const stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    (frame) => {
      console.log("Connected: " + frame);
    },
    (error) => {
      console.log("Connection error: " + error);
    }
  );

  // socket.value.onmessage = (event) => {

  //   const message = JSON.parse(event.data);
  //   receivedMessages.value.push(message);
  //   console.log("1")
  //   console.log(message)
  // };

  stompClient.debug = function (message) {
    if (message.includes("<<<")) {
      const index = message.indexOf("<<<");
      if (index !== -1) {
        message = message.substring(index + 3).trim();
      } else {
        message = "";
      }
      receivedMessages.value.push(message);
      Msgcnt.value += 1;
      console.log(message);
    }
  };
});

watch(isNotificationOpen, (newValue, oldValue) => {
  if (!newValue && oldValue) {
    receivedMessages.value = [];
    Msgcnt.value = 0;
  }
});

// onUnmounted(() => {
//   if (socket.value) {
//     socket.value.close();
//   }
// });
</script>
<template>
  <div class="view-container">
    <div class="header">
      <MainHeader />
    </div>
    <div class="view">
      <RouterView />
      <div class="notification-wrapper">
        <span class="notification-count" v-if="Msgcnt > 0">{{ Msgcnt }}</span>
        <button
          @click="toggleNotification"
          :class="{ 'notification-button': true, 'shake-animation': Msgcnt > 0 }"
        >
          🔔
        </button>
      </div>
      <div v-if="isNotificationOpen" class="notification notification-open">
        <ul class="notification-content">
          <li class="noti-msg" v-for="(message, index) in receivedMessages" :key="index">
            {{ message }}
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <!-- <MainFooter/> -->
    </div>
  </div>
</template>
<style scoped>
.notification-wrapper {
  position: relative;
  display: inline-block;
}

.notification-count {
  font-weight: 600;
  font-size: 12px;
  width: 20px;
  height: 20px;
  z-index: 2000;
  position: fixed;
  bottom: 52px;
  left: 30px;
  transform: translate(-20%, -20%);
  background-color: rgb(241, 79, 79);
  border-radius: 50%;
  text-align: center;
  border: 1px solid black;
  align-items: center;
  /* 메시지 개수 표시 스타일링 (배경색, 색상, 패딩 등) */
}
.notification-content {
  list-style: none; /* 목록 스타일 제거 */
  padding: 0; /* 필요에 따라 패딩 조정 */
  /* 추가적인 스타일링 */
}

.notification::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.noti-msg {
  padding: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e3e3;
}
.notification-button {
  position: fixed;
  font-size: 30px;
  bottom: 30px;
  left: 30px;
  z-index: 1000; /* 상위 레이어 설정 */
}

.shake-animation {
  animation: shake 1s infinite;
}

@keyframes shake {
  0%,
  33.33%,
  100% {
    transform: rotate(0);
  }
  16.66% {
    transform: rotate(-20deg);
  }
  25% {
    transform: rotate(20deg);
  }
}

.notification {
  min-height: 100px;
  max-height: 500px;
  overflow-y: auto;
  height: auto;
  width: 250px;
  position: fixed;
  background-color: black;
  padding: 15px;
  color: white;
  border-radius: 10px;
  bottom: 80px; /* 버튼 위에 위치 */
  left: 20px;
  z-index: 1000; /* 상위 레이어 설정 */
  transition: all 1s ease; /* 애니메이션 효과 */
  transform: translateY(100%); /* 기본 상태에서는 숨겨져 있음 */
  opacity: 0; /* 기본 상태에서는 투명 */
  visibility: hidden; /* 기본 상태에서는 보이지 않음 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}

.notification-open {
  transform: translateY(0); /* 표시될 때의 위치 */
  opacity: 1; /* 표시될 때는 불투명 */
  visibility: visible; /* 표시될 때는 보임 */
}
.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.view {
  display: flex;
  padding-top: 60px;
  /*padding-left: 200px;
  padding-right: 200px; */
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  height: 100%;
  border-left: 1px solid #e4e3e3;
  border-right: 1px solid #e4e3e3;
}
</style>
