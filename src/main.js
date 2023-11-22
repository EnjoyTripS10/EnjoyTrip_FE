import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import request from "./utils/request";
import cookie from "@/utils/cookie.js";
import axios from "axios";
import "./style.css";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import "./axiosConfig"; // 전역 axios 요청 함수

const app = createApp(App);
axios.defaults.baseURL = "http://192.168.120.75:17000";
app.use(VueTailwindDatepicker);
app.use(createPinia());
app.use(router);
app.provide("$axios", request);
app.provide("$cookie", cookie);

app.mount("#app");
