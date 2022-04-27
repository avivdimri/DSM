import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '888330668226-3vlji3kfopq4q79a0ddetdf7rtd7ldnr.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);


// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')