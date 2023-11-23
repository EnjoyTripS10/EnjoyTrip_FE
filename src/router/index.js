import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import MainView from "../views/MainView.vue";
import MainPage from "../components/MainPage.vue";
import boardList from "../components/board/boardList.vue";
import boardListLiked from "../components/board/boardListLiked.vue";
import registPlan from "../components/plan/registPlan.vue";
import PlanList from "../components/plan/PlanList.vue";
import PlanDetail from "../components/plan/PlanDetail.vue";
import updatePlan from "../components/plan/updatePlan.vue";
import updateBoard from "../views/board/updateBoard.vue";
import boardListCity from "../components/board/boardList_city.vue";
import img from "../components/plan/img.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 항상 페이지 이동 시 최상단으로 스크롤
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "redirect", redirect: "/index/section1" },
    {
      path: "/index",
      name: "index",
      component: index,
      children: [
        {
          path: "section1",
          name: "section1",
          component: () => import("../components/index/section1.vue"),
        },
        {
          path: "section2",
          name: "section2",
          component: () => import("../components/index/section2.vue"),
        },
        {
          path: "section3",
          name: "section3",
          component: () => import("../components/index/section3.vue"),
        },
        {
          path: "section4",
          name: "section4",
          component: () => import("../components/index/section4.vue"),
        },
      ],
    },

    {
      path: "/",
      component: MainView,
      children: [
        {
          path: "home",
          component: MainPage,
        },
        {
          path: "boardList",
          name: "boardList",
          component: boardList,
        },
        {
          path: "planList",
          name: "PlanList",
          component: PlanList,
        },
        {
          path: "planDetail/:planid",
          name: "PlanDetail",
          component: PlanDetail,
        },
        {
          path: "registPlan",
          name: "registPlan",
          component: registPlan,
        },
        {
          path: "updatePlan/:planid",
          name: "updatePlan",
          component: updatePlan,
        },
        {
          path: "updateBoard/:boardId",
          name: "updateBoard",
          component: updateBoard,
        },
        {
          path: "boardListLiked",
          name: "boardListLiked",
          component: boardListLiked,
        },
        {
          path: "boardListCity/:city",
          name: "boardListCity",
          component: boardListCity,
        },

        {
          path: "uploadboard",
          name: "addBoard",
          component: () => import("../views/board/upload.vue"),
        },
        {
          path: "findLocation",
          name: "findLocation",
          component: () => import("../components/location/findlocation.vue"),
        },
        {
          path: "img",
          name: "img",
          component: img,
        },
      ],
    },
    { path: "/login", name: "login", component: () => import("../views/login.vue") },
    {
      path: "/kakao-login",
      name: "KakaoLogin",
      component: () => import("../views/login/KakaoLogin.vue"),
    },
    {
      path: "/naver-login",
      name: "NaverLogin",
      component: () => import("../views/login/NaverLogin.vue"),
    },
    {
      path: "/google-login",
      name: "GoogleLogin",
      component: () => import("../views/login/GoogleLogin.vue"),
    },
  ],
});

export default router;
