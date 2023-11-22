import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import request from "./utils/request";
import cookie from "@/utils/cookie.js";
import "./style.css";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import axiosInstance from '@/axiosConfig.js'; // 전역 axios 요청 함수

const app = createApp(App);
app.use(VueTailwindDatepicker);
app.use(createPinia());
app.use(router);
app.provide("$axios", request);
app.provide("$cookie", cookie);
app.config.globalProperties.$axios = axiosInstance;

app.mount("#app");
