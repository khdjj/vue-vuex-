<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-24 16:37:01
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 21:35:20
 -->
<template>
  <div id="m-playlist" class="g-bd4 f-cb">
    <div class="g-wrap6 f-cb" style="position: relative;">
      <div class="m-info f-cb">
        <div class="cover u-cover u-cover-dj">
          <img :src="modifyPlayList.img | imageFilter " class="j-img" v-if="modifyPlayList">
          <span class="msk"></span>
        </div>
        <router-link :to='{name:"modifyPlayList",query:{id:modifyPlayList.id,img:modifyPlayList.img,name:modifyPlayList.name}}' class="edit s-fc7" v-if="!comment">编辑</router-link>
        <div class="cnt">
          <div class="cntc">
            <div class="hd f-cb">
              <i class="f-fl u-icn u-icn-13 f-pr"></i>
              <div class="tit">
                <h2 class="f-ff2 f-brk" v-if="modifyPlayList">{{modifyPlayList.name}}</h2>
              </div>
            </div>
            <div class="user f-cb">
              <a class="face" href="javascript:;">
                <img :src="modifyPlayList.creator_avatar" v-if="modifyPlayList">
              </a>
              <span class="name">
                <a href="javascript:;" class="s-fc7" v-if="modifyPlayList">{{modifyPlayList.creator}}</a>
              </span>
              <span class="time s-fc4" v-if="modifyPlayList">{{modifyPlayList.create_time}}</span>
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
      <play-list-song :songIdList="modifyPlayList.song_ids" :playNum="modifyPlayList.play_num" ref="playlistsong"></play-list-song>
      <comment type="playListComment" :id="id" v-if="!comment"></comment>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axiosMethod from "../../../service/axios"
import playListSong from "../playlist/playlist_song"
import comment from "../comment/comment"
import { mapState } from 'vuex'
import {formatImage} from '../../../service/utils'
export default {
  name: "rightList",
  components: {
    playListSong, comment
  },
  props:['comment'],
  data() {
    return {
      id:''
    }
  },
  computed:{
    ...mapState([
      'modifyPlayList'
    ])
  },
  filters:{
    imageFilter(value){
    return formatImage(value);
    }
  },
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
