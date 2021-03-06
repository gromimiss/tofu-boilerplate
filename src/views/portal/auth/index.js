import CommonServices from 'service/common.js';

import tpl from './index.html';

export default {
    template: tpl,

    data() {
        return {
            loading: true
        };
    },

    mounted() {
        var params = {
            res_category: 'APPCLIENT',
            token: this.$route.params.token || ''
        };
        var token = sessionStorage.getItem('token');
        if (token) {
            if (token !== params.token) {
                sessionStorage.clear();
            }
        }
        sessionStorage.setItem('token', token);

        CommonServices.authLogin(params).then(res => {
            let self = this;

            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: '登录成功'
                });
                sessionStorage.setItem('userInfo', JSON.stringify(res.obj));

                this.$router.push('/system/dashboard');
            } else {
                this.$message.error('登录失败！');
            }
        });
    }
};