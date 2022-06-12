import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import VueSocketIO from 'vue-socket.io'
import Vuelidate from 'vuelidate'
import '@mdi/font/css/materialdesignicons.css'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('http://localhost:4001');
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(new VueSocketIO({
  debug:true,
  connection:socketConnection
}))

new Vue({
  render: h => h(App),
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
  }),
  store,
  router
}).$mount('#app')
