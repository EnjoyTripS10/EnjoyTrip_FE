import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import MainView from '../views/MainView.vue'
import boardList from '../components/board/boardList.vue'
import registPlan from '../components/plan/registPlan.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'redirect', redirect: '/index/section1'},
    {
      path: '/index', name: 'index', component: index, children: [
        { path: 'section1', name: 'section1', component: () => import('../components/index/section1.vue') },
        { path: 'section2', name: 'section2', component: () => import('../components/index/section2.vue') },
        { path: 'section3', name: 'section3', component: () => import('../components/index/section3.vue') },
        { path: 'section4', name: 'section4', component: () => import('../components/index/section4.vue') },
    ] },
    
    { path: '/home', name: 'home', component: MainView },
    { path: '/login', name: 'login', component: () => import('../views/login.vue') },
    { path: '/kakao-login', name: 'KakaoLogin', component: () => import('../views/login/KakaoLogin.vue') },
    { path: '/naver-login', name: 'NaverLogin', component: () => import('../views/login/NaverLogin.vue') },
    { path: '/google-login', name: 'GoogleLogin', component: () => import('../views/login/GoogleLogin.vue')},
    { path: '/boardList', name: 'boardList', component: boardList },
    { path: '/registPlan', name: 'registPlan', component: registPlan },


    { path: '/uploadboard', name: 'addBoard', component: () => import('../views/board/upload.vue')},
  ]
})

export default router
