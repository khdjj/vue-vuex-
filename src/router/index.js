import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
Vue.use(Router)

const home  = resolve => require.ensure([], () => resolve(require('../components/home/home.vue')), 'home');
// const app = resolve => require.ensure([], () => resolve(require('../App.vue')), 'app');


export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path:'/',
          component:home,
        },{
          path:'/home',
          component:home
        }
      ]

    }
  ]
})
