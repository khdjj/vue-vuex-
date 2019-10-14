<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-10 20:39:01
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-10 20:39:01
 -->
<template>
  <div>
    <nav-compt></nav-compt>
    <div id="toplist" class="g-bd3 g-bd3-1 f-cb">
      <div class="g-sd3 g-sd3-1">
        <div class="n-minelst n-minelst-2">
          <h2 class="f-ff1">云音乐排行榜</h2>
          <ul class="f-cb">
            <li :class="item.top_name == currTopListName ? 'z-selected' :'' "  v-for="(item,index) in topList" :key="index">
              <div class="item f-cb">
                <div class="left">
                  <router-link class="avatar" :to="{path:'/home/toplist',query:{name:item.top_name}}" >
                    <img
                      :src="item.cover"
                      :alt="item.top_name"
                    >
                    <span class="msk"></span>
                  </router-link>
                </div>
                <p class="name">
                  <router-link :to="{path:'/toplist',query:{name:item.top_name}}" class="s-fc0">{{item.top_name}}</router-link>
                </p>
                <p class="s-fc4">每天更新</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="g-mn3">
        <div class="g-mn3c">
          <div class="g-wrap">
            <div class="m-info m-info-rank f-cb">
              <div class="cover u-cover u-cover-rank">
                <img
                 :src="currTopListCover"
                >
                <span class="msk"></span>
              </div>
              <div class="cnt">
                <div class="cntc m-info">
                  <div class="hd f-cb">
                    <h2 class="f-ff2">{{currTopListName}}</h2>
                  </div>
                  <div class="user f-cb">
                    <i class="u-icn u-icn-57"></i>
                    <span class="sep s-fc3">最近更新：06月10日</span>
                    <span class="s-fc4">（每天更新）</span>
                  </div>
                  <div class="btns f-cb">
                    <a
                      href="javascript:;"
                      class="u-btn2 u-btn2-2 u-btni-addply f-fl"
                      hidefocus="true"
                      title="播放"
                      @click="addToPlayerList()"
                    >
                      <i>
                        <em class="ply"></em>播放
                      </i>
                    </a>
                    <a
                      href="javascript:;"
                      class="u-btni u-btni-add"
                      hidefocus="true"
                      title="添加到播放列表"
                    ></a>
                    <a id="toplist-fav" class="u-btni u-btni-fav" href="javascript:;">
                      <i>(1978647)</i>
                    </a>
                    <a id="toplist-share" class="u-btni u-btni-share" href="javascript:;">
                      <i>(6038)</i>
                    </a>
                    <a class="u-btni u-btni-dl" href="javascript:;">
                      <i>下载</i>
                    </a>
                    <a href="javascript:;" class="u-btni u-btni-cmmt j-cmt">
                      <i>
                        (
                        <span id="comment-count">155889</span>)
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <play-list-song ref="songList" :playNum = "2019520256" :limit="20" :offset="0"></play-list-song>
            <comment type = "playListComment" :id="currTopListid"></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navCompt from "../nav/nav";
import playListSong from "../playlist/playlist_song"
import axiosMethod from "../../../service/axios"
import comment from "../comment/comment"
export default {
  name: "toplist",
  components: {
    navCompt,playListSong,comment
  },
  mounted:function(){
    this.currTopListName = this.$route.query.name || "云音乐飙升榜";
    this.getAllTopList();
    this.getCurrTopListData();
  },
  data(){
    return {
      currTopListName:null,
      currTopListCover:null,
      currTopListid:null,
      topList:null,
      songList:null
    }
  },
  methods:{
    getAllTopList(){
      axiosMethod('/discover/toplist/all').then(res=>{
        this.topList = res.data.data;
      })
    },
     addToPlayerList(playList, index) {
      this.$root.$emit('addPlayerListEvent', this.songList); //插入歌曲
    },
    getCurrTopListData(){
      axiosMethod('/discover/toplist/',{
        name:this.currTopListName,
        limit:100,
        offset:0
      }).then(res=>{
        this.songList = res.data.songs[0];
        this.$refs.songList.changeSongList(this.songList);
        this.currTopListid  = res.data.topList[0].id;
        console.log(this.currTopListid);
        this.currTopListCover = res.data.topList[0].cover;
      });
    }
  },
  watch:{
    $route(){
      this.currTopListName = this.$route.query.name;
      this.getCurrTopListData();
    }
  }
};
</script>

<style scoped>
@import url("./topList.css");
</style>
