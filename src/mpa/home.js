import Vue from 'vue'

import App from '../Home.vue'
import router from '../router'

new Vue({
    render: h => h(App),
    router
}).$mount('#app')