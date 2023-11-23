<script setup>
import { ref, onMounted} from "vue";
import MainHeader from "@/components/MainHeader.vue";
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import Stomp from 'stompjs';
import $cookie from '@/utils/cookie.js';

const isNotificationOpen = ref(false);
const receivedMessages = ref([]);

// 알림창 토글 함수
const toggleNotification = () => {
  console.log("알림창 토글");
  isNotificationOpen.value = !isNotificationOpen.value;
};

onMounted(() => {
  const email = $cookie.getCookie('user')
  window.sessionStorage.setItem('user',email)

  console.log(email)


  const socket = new SockJS(`http://localhost:17000/push?userId=${email}`); // 웹소켓 서버 URL
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, frame => {
    console.log('Connected: ' + frame);

    
  }, error => {
    console.log('Connection error: ' + error);
  });

  

  // socket.value.onmessage = (event) => {
    
  //   const message = JSON.parse(event.data);
  //   receivedMessages.value.push(message);
  //   console.log("1")
  //   console.log(message)
  // };

  stompClient.debug = function(message) {
    if (message.includes("<<<")) {
        const index = message.indexOf("<<<");
        if (index !== -1) {
          message = message.substring(index + 3).trim();
        } else {
          message = "";
        }
        receivedMessages.value.push(message);
        console.log(message)
    }
    
  };
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
      <button @click="toggleNotification" class="notification-button">🔔</button>
      <div v-if="isNotificationOpen" class="notification notification-open">
          <li v-for="(message, index) in receivedMessages" :key="index">
          {{ message }}
        </li>
      </div>
    </div>

    <div class="footer">
      <!-- <MainFooter/> -->
    </div>
  </div>
</template>
<style scoped>
.notification-button {
  position: fixed;
  font-size: 30px;
  bottom: 30px;
  left: 30px;
  z-index: 1000; /* 상위 레이어 설정 */
  animation: shake 1s infinite;
}

/* @keyframes shake {
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
} */
.notification {
  min-height: 100px;
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
