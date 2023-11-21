import axios from 'axios';
import cookie from "@/utils/cookie.js";

const token = cookie.getCookie("accessToken");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;