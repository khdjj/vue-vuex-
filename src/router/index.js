import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home  = resolve => require.ensure([], () => resolve(require('../components/home/home.vue')), 'home');



export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
