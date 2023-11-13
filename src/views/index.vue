<script setup>
import { onMounted, onUnmounted, Transition } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const routes = ['/index/section1','/index/section2','/index/section3', '/index/section4']; // 정의한 라우트 경로들

let debounceTimer = null;
const debounceDelay = 80; // 디바운스 지연 시간 (ms)

const handleWheel = (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const currentIndex = routes.indexOf(route.path);
    let newIndex = currentIndex;

    if (e.deltaY > 0 && currentIndex < routes.length - 1) {
      newIndex++;
    } else if (e.deltaY < 0 && currentIndex > 0) {
      newIndex--;
    }

    if (newIndex !== currentIndex) {
      router.push(routes[newIndex]);
    }
  }, debounceDelay);
};

onMounted(() => {
if (route.path !== '/index/section1') {
    router.replace('/index/section1');
  }
  window.addEventListener('wheel', handleWheel, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
});
</script>


<template>
    <div class="wrap hide-scrollbar">
        <div class="container">
            <Transition name="fade-blur" mode="out-in">
                <router-view></router-view>
            </Transition>
        </div>
    </div>
</template>

<style scoped="scoped">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.fade-blur-enter-active, .fade-blur-leave-active {
  transition: opacity 0.5s, filter 0.5s;
}

.fade-blur-enter-from, .fade-blur-leave-to {
  opacity: 0;
  filter: blur(5px);
}

::-webkit-scrollbar {
    display: none;
}
</style>