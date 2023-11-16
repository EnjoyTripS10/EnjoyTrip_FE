import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import request from './utils/request'
import cookie from '@/utils/cookie.js'
import axios from 'axios';
import './style.css'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'


const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:17000';
app.use(VueTailwindDatepicker)
app.use(createPinia())
app.use(router)
app.provide('$axios', request)
app.provide('$cookie', cookie)

app.mount('#app')
