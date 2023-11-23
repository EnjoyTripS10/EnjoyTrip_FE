import $cookie from '@/utils/cookie.js';
import $request from '@/utils/request'
import axios from '@/axiosConfig.js';
const socialLogin = {
    data() {
        return {
            loginResult: {
                status: ''
            }
        }
    },
    //inject :  ['$axios', '$cookie'],
    methods: {
        doSocialLogin(socialType) {
            console.log("doSocialLogin")

            // const $axios = inject('$axios');
            // const $cookie = inject('$cookie');

            const apiPath = '/api/user/social-login'
            const bodyData = {
                code: this.$route.query.code,
                userType: socialType
            }
            console.log(bodyData.code)
            console.log(bodyData.userType)

            axios
            .post(apiPath, bodyData)
            .then(response => {
                console.log("post")
                this.loginResult.status = 'SUCCESS'
                $cookie.setCookie('user-key', response.data.id)
                $cookie.setCookie('accessToken',response.data.accessToken)
                $cookie.setCookie('user',response.data.userEmail)
                console.log(response.data.userEmail)
                window.sessionStorage.setItem('user',response.data.userEmail)
                window.opener.location.replace('/')
                window.close()
            }).catch(error => {
                this.loginResult.status = 'FAIL'
                console.log('error', error)
            })
        }
    }
}
export default socialLogin
