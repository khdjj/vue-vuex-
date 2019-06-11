import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
Vue.use(Router)

const home  = resolve => require.ensure([], () => resolve(require('../components/home/home.vue')), 'home');
const playlist  = resolve => require.ensure([], () => resolve(require('../components/playlist/playlist.vue')), 'playlist');
const player = resolve => require.ensure([], () => resolve(require('../components/player/player.vue')), 'player');
const toplist = resolve => require.ensure([], () => resolve(require('../components/toplist/toplist.vue')), 'toplist');
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
        },
        {
          name:'playlist',
          path:'/playlist/:id',
          component:playlist
        },
        {
          naem:'toplist',
          path:'/toplist',
          component:toplist
        }
      ]
    },
    {
      name:'player',
      path:'/player',
      component:player
    }
  ]
})
