<template>
  <div id="g_mymusic" class="g-mymusic">
    <div class="g-bd3 p-mymusic f-cb">
      <div class="g-sd3 u-scroll n-musicsd f-pr j-flag" style="height: 209px;">
        <div id="auto-id-7RAPl94anxraXzBq">
          <div class="n-minelst n-minelst-1">
            <h2 class="f-ff1">
              <a hidefocus="true" href="javascript:void(0);" class="u-btn u-btn-crt f-fr j-flag" @click.prevent="create_playlist()"><i>新建</i></a>
              <span class="rtitle f-pr" data-action="spread"><i class="tri tri1"></i>创建的歌单<span class="f-pa f-r-black-icon" style="display:inline-block;width:8px;height:8px;background-size:cover;"></span>&nbsp;(<span class="j-flag">6</span>)</span>
            </h2>
            <ul class="j-flag f-cb">
              <li class="j-iflag z-selected" v-for="(playlist,index) in createList" :key="index" @click="changeList(playlist)">
                <div class="item f-cb">
                  <div class="left"><a hidefocus="true" class="avatar">
                    <img :src="playlist.img" alt=""></a>
                  </div>
                  <p class="name f-thide">
                    <a hidefocus="true" href="javascript:void(0);" class="s-fc0" :title="playlist.name">{{playlist.name}}</a></p>
                  <p class="s-fc4 f-thide num">{{createList.length}}首</p>
                 </div>

              </li>
            </ul>
          </div>
          <div class="n-minelst n-minelst-1">
            <h2 class="f-ff1">
              <span class="rtitle f-pr" data-action="spread"><i class="tri tri1"></i>收藏的歌单<span class="f-pa f-r-black-icon" style="display:inline-block;width:8px;height:8px;background-size:cover;"></span>&nbsp;(<span class="j-flag">13</span>)</span>
            </h2>
            <ul class="f-cb j-flag">
              <li class="j-iflag" id="auto-id-N0yzVL3kxNsM218y" @click="changeList(playlist)">
                <div class="item f-cb">
                  <div class="left"><a hidefocus="true" class="avatar"><img src="https://p2.music.126.net/hB4lqF-LiFYx_yvbChb7gg==/109951163754920641.jpg?param=40y40" alt=""></a></div>
                  <p class="name f-thide"><a hidefocus="true" href="javascript:void(0);" class="s-fc0" title="700首流行经典老歌【80/90/00后KTV珍藏】">700首流行经典老歌【80/90/00后KTV珍藏】</a></p>
                  <p class="s-fc4 f-thide num">700首&nbsp;by PolooStudio</p>
                </div><span class="oper hshow" style="display: none;"><a data-action="delete" hidefocus="true" title="删除" href="javascript:void(0);" class="u-icn u-icn-11"></a></span>
              </li>
            </ul>
          </div>
          <div style="height:100px;"></div>
        </div>
      </div>
      <right-list :playList="list"></right-list>
      <play-list-pop ref="play_list_pop" @addCreatePlayList="addToCreatePlayList"></play-list-pop>
    </div>
  </div>
</template>
<script>
import axiosMethod from '../../../service/axios';
import rightList from '../rightList/rightList';
import playListPop from '../playListPop/playListPop';

export default {
  name: 'myMusic',
  components: {
    rightList, playListPop
  },
  data() {
    return {
      createList: [],
      collectionList: [],
      list:{
        img: '',
        song_ids: [],
        desc: '',
        label: [],
        create_time: '',
        creator: '',
        creator_avatar: '',
        name: '',
      }
    }
  },
  mounted() {
    this.getCreatePlayList();
    this.getCollPlayList();
  },
  methods: {
    create_playlist() {
      this.$refs.play_list_pop.showPop();
    },
    /**
* 获取用户自己创建的歌单 
*/
    getCreatePlayList() {
      axiosMethod('/weapi/playlist/getcreateplaylist', {}, 'POST').then(res => {
        this.createList = res.data.results;
         this.changeList(this.createList[0]);
      })
    },
    /**
     * 获取用户收藏的歌单
     */
    getCollPlayList() {

    },
    /**
     * 接收子类传递的歌单数据
     */
    addToCreatePlayList(playList) {
      this.createList.push(playList);
    },
    /**
     * 将每个歌单的详细信息传给子组件right_list，因为自创歌单和收藏歌单不同，所以要用同一个list来接收
     */
    changeList(list){
      this.list = list;
    }
  }
}
</script>
<style scoped>
@import url("myMusic.css");
</style>
