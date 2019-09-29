<template>
  <div id="m-playlist" class="g-bd4 f-cb">
    <div class="g-wrap6 f-cb" style="position: relative;">
      <div class="m-info f-cb">
        <div class="cover u-cover u-cover-dj">
          <img :src="playList.img" class="j-img" v-if="playList">
          <span class="msk"></span>
        </div>
        <router-link :to='{name:"modifyPlayList",query:{id:playList.id,img:playList.img,name:playList.name}}' class="edit s-fc7">编辑</router-link>
        <div class="cnt">
          <div class="cntc">
            <div class="hd f-cb">
              <i class="f-fl u-icn u-icn-13 f-pr"></i>
              <div class="tit">
                <h2 class="f-ff2 f-brk" v-if="playList">{{playList.name}}</h2>
              </div>
            </div>
            <div class="user f-cb">
              <a class="face" href="javascript:;">
                <img :src="playList.creator_avatar" v-if="playList">
              </a>
              <span class="name">
                <a href="javascript:;" class="s-fc7" v-if="playList">{{playList.creator}}</a>
              </span>
              <span class="time s-fc4" v-if="playList">{{playList.create_time}}</span>
            </div>
            <div id="content-operation" class="btns f-cb">
              <a href="javascript:;" class="u-btn2 u-btn2-2 u-btni-addply f-fl" hidefocus="true" title="播放" @click.prevent="addToPlayList();">
                <i>
                  <em class="ply"></em>播放
                </i>
              </a>
              <a href="javascript:;" class="u-btni u-btni-add" hidefocus="true" title="添加到播放列表"></a>
              <a class="u-btni u-btni-fav" href="javascript:;">
                <i>(22283)</i>
              </a>
              <a class="u-btni u-btni-share" href="javascript:;">
                <i>(258)</i>
              </a>
              <a class="u-btni u-btni-dl" href="javascript:;">
                <i>下载</i>
              </a>
              <a href="javascript:;" class="u-btni u-btni-cmmt">
                <i>
                  (
                  <span id="cnt_comment_count">107</span>)
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <play-list-song :songIdList="playList.song_ids" :playNum="playList.play_num" ref="playlistsong"></play-list-song>
      <comment type="playListComment" :id="id"></comment>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axiosMethod from "../../../service/axios"
import playListSong from "../playlist/playlist_song"
import comment from "../comment/comment"
import { mapState } from 'vuex'
export default {
  name: "rightList",
  components: {
    playListSong, comment
  },
  props: ["playList"],
  data() {
    return {
      id:''
    }
  },
  watch:{
    playList(){
    }
  }
}
</script>

<style scoped>
@import "../playlist/playlist.css";
.g-bd4 {
  width: 740px;
  float: right;
}
.u-btn2-2 i{
  width:56px;
}
</style>
