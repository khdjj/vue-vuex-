/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-31 10:25:06
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-16 15:35:41
 */
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
Vue.use(Router)

const home  = resolve => require.ensure([], () => resolve(require('../components/home/home.vue')), 'home');
const playlist  = resolve => require.ensure([], () => resolve(require('../components/playlist/playlist.vue')), 'playlist');
const player = resolve => require.ensure([], () => resolve(require('../components/player/player.vue')), 'player');
const toplist = resolve => require.ensure([], () => resolve(require('../components/toplist/toplist.vue')), 'toplist');
const comment = resolve => require.ensure([], () => resolve(require('../components/comment/comment.vue')), 'comment');
const search = resolve => require.ensure([], () => resolve(require('../components/search/search.vue')), 'search');
const myMusic = resolve => require.ensure([], () => resolve(require('../components/myMusic/myMusic.vue')), 'myMusic');
const modifyPlayList = resolve => require.ensure([], () => resolve(require('../components/modify/modifyPlayList.vue')), 'modifyPlayList');
const mv = resolve => require.ensure([], () => resolve(require('../components/mv/mv.vue')), 'mv');
const discover = resolve => require.ensure([], () => resolve(require('../components/discoverPlayList/discoverPlayList.vue')), 'discoverPlayList');
const sharePop = resolve => require.ensure([], () => resolve(require('../components/sharePop/sharePop.vue')), 'sharePop');
const shareTrend = resolve => require.ensure([], () => resolve(require('../components/shareTrend/shareTrend.vue')), 'shareTrend');


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
          name:'discover',
          path:'/discoverpl',
          component:discover
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
        },
        {
          name:"search",
          path:'/search',
          component:search
        },{
          name:"shareTrend",
          path:"/shareTrend",
          component:shareTrend
        },
        {
          name:'myMusic',
          path:'/myMusic',
          component:myMusic,
          children:[
            {
              name:'modifyPlayList',
              path:'/modify',
              component:modifyPlayList
            }
          ]
        }
      ]
    },
    {
      name:'player',
      path:'/player',
      component:player
    },{
      name:'mv',
      path:'/mv',
      component:mv
    },
    {
      name:'sharePop',
      path:'/sharePop',
      component:sharePop
    },
    {
      name:"comment",
      path:'/comment',
      component:comment
    }
  ]
})
