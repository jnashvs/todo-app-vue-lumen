import Vue from 'vue'
//import App from './App.vue'

import router from './router/index.js'
import { store } from './store/index' // importa store e bai usar globalmente: this.$store
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import Master from './components/layouts/Master'

import VuetifyDialog from "vuetify-dialog";
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});

new Vue({
  el: '#app',
  router,
  vuetify,
  store: store,
  render: h => h(Master)
})