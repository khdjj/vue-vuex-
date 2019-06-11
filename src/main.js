// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueLazyload from 'vue-lazyload' 
import store from '../src/store/index'
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(VueLazyload,{
  loading:require('../default/loading.gif'),
	attempt: 1
});

new Vue({
  el: '#app',
  store,
  router,
}).$mount('#app')
