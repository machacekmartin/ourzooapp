import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import Loading from '@/components/Loading.vue';

import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;
Vue.component('icon', Icon);
Vue.component('loading', Loading);
Vue.component('custom-button', Button);

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
