import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Icon from '@/components/Icon.vue';

import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;
Vue.component('icon', Icon);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
