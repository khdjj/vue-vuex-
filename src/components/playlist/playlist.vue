<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-03 17:08:53
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 21:27:57
 -->
<template>
  <div>
    <nav-compt></nav-compt>
    <div id="m-playlist" class="g-bd4 f-cb">
      <div class="g-wrap6 f-cb">
        <div class="m-info f-cb">
          <div class="cover u-cover u-cover-dj">
            <img :src="playList.img" class="j-img" v-if="playList">
            <span class="msk"></span>
          </div>
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
                <a
                  href="javascript:;"
                  class="u-btn2 u-btn2-2 u-btni-addply f-fl"
                  hidefocus="true"
                  title="播放"
                  @click.prevent="addToPlayList();"
                >
                  <i>
                    <em class="ply"></em>播放
                  </i>
                </a>
                <a href="javascript:;" class="u-btni u-btni-add" hidefocus="true" title="添加到播放列表"></a>
                <a class="u-btni u-btni-fav" href="javascript:;" @click="addToCollectPlayList(playList)">
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
              <div class="tags f-cb" v-if="playList">
                <b>标签：</b>
                <a
                  class="u-tag"
                  href="javascript:;"
                  v-for="tag in playList.label"
                  v-bind:key="tag.cat"
                >
                  <i>{{tag.cat}}</i>
                </a>
              </div>
              <p id="album-desc-more" class="intr f-brk" v-if="playList">{{playList.desc}}</p>
            </div>
          </div>
        </div>
        <play-list-song :songIdList="playList.song_ids" :playNum = "playList.play_num" ref = "playlistsong"></play-list-song>
        <comment type = "playListComment" :id="id"></comment>
      </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>



<script>
import navCompt from "../nav/nav";
import comment from "../comment/comment"
import axiosMethod from "../../../service/axios";
import playListSong from "./playlist_song";
import alert from "../alert/alert"
import {collectPlayList} from "../../common/addToCollectPlayList"
export default {
  name: "playlist",
  components: {
    navCompt,
    playListSong,
    comment,
    alert
  },
  data() {
    return {
      id: null,
      playList: null
    };
  },
  mounted: function() {
    this.id = this.$route.params.id;
    this.id && this.getPlayList();
  },
  methods: {
    addToCollectPlayList(playlist){
      var vm = this;
      collectPlayList(playlist).then(res=>{
      
        if(res.data.code == 200){
          console.log("收藏歌单成功");
          vm.$refs.alert.show("收藏歌单成功");
        }
      })
    },
    addToPlayList(){
      this.$refs.playlistsong.addToPlayerList();
    },
    getPlayList() {
      axiosMethod("/discover/playlist/id", {
        id: this.id
      }).then(res => {
        this.playList = res.data.data[0];
      });
    }
  }
};
</script>
<style scoped>
@import url("./playlist.css");
</style>

