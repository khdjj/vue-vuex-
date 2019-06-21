<template>
  <div>
    <div class="n-songtb">
      <div class="u-title u-title-1 f-cb">
        <h3>
          <span class="f-ff2">歌曲列表</span>
        </h3>
        <span class="sub s-fc3">
          <span id="playlist-track-count">{{songList.length}}</span>首歌
        </span>
        <div class="more s-fc3">
          播放：
          <strong id="play-count" class="s-fc6">{{playNum}}</strong>次
        </div>
      </div>
    </div>
    <div class="j-flag">
      <table class="m-table">
        <thead>
          <tr>
            <th class="first w1">
              <div class="wp">&nbsp;</div>
            </th>
            <th>
              <div class="wp af0"></div>
            </th>
            <th class="w2">
              <div class="wp af1"></div>
            </th>
            <th class="w3">
              <div class="wp af2"></div>
            </th>
            <th class="w4">
              <div class="wp af3"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{'even':(index+1) % 2 == 0}" v-for="(song,index) in songList" :key="index">
            <td class="left">
              <div class="hd">
                <span class="ply" @click="play(song,song.song_id)">&nbsp;</span>
                <span class="num">{{index+1}}</span>
              </div>
            </td>
            <td class>
              <div class="f-cb">
                <div class="tt">
                  <div class="ttc">
                    <span class="txt">
                      <a href="javascript:;">
                        <b title="One">{{song.song_name}}</b>
                      </a>
                      <span title="播放mv" class="mv" v-if="song.mv_id != 0">MV</span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td class="s-fc3" @mouseover="mouseover($event)" @mouseout="mouseout($event)">
              <span class="u-dur" style="cursor:pointer">oper</span>
              <div class="opt hshow">
                <a href="javascript:;" class="u-icn u-icn-81" title="添加到播放列表"></a>
                <span class="icn icn-fav" title="收藏"></span>
                <span class="icn icn-share" title="分享">分享</span>
                <span class="icn icn-dl" title="下载"></span>
              </div>
            </td>
            <td class>
              <div class="text" title="Axel Johansson">
                <span title="Axel Johansson">
                  <a
                    class
                    href="javascript:;"
                    hidefocus="true"
                    v-for="(art ,index) in song.artist_names"
                    :key="index"
                  >{{art.artist_name}}</a>
                </span>
              </div>
            </td>
            <td class>
              <div class="text">
                <a href="javascript:;" title="One">{{song.album}}</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <keep-alive>
    <player ref="play"></player>
    </keep-alive>
  </div>
</template>
<script>
import axiosMethod from "../../../service/axios";
import player from "../player/player";
import {mapState,mapMutations} from 'vuex'
export default {
  name: "playListSong",
  mounted: function() {
    this.songIdList && this.getSongList();
  },
  components: {
    player
  },
  props: ["songIdList", "playNum"],
  data() {
    return {
      songList: null
    };
  },
  methods: {
    ...mapMutations([
      'SAVE_SONG','SAVE_CURRTIME'
    ]),
    changeSongList(songList){
      this.songList = songList;
      console.log(this.songList);
    },
    play(song,id,show){
      this.SAVE_SONG(song); //在vuex中存储当前播放歌曲
      this.SAVE_CURRTIME(0); //在vuex中重置当前歌曲播放时间 
      show && this.$router.push({ path: "/player", query: { id: id, show: true } }); //播放栏中的扩展按钮，点击时，可全屏查看歌曲信息
      this.$refs.play.getSongUrl(id); //播放歌曲
    },
    getSongList() {
      axiosMethod("/discover/song/ids",
        {
          ids: this.songIdList,
          limit: 1000,
          offset: 0
        },
        "POST"
      ).then(res => {
        this.songList = res.data.data;
        console.log(this.songList);
      });
    },
    mouseover: function(e) {
      let $target = $(e.currentTarget);
      $target.find('.u-dur').css({
        display: "none"
      });
      $target.find('.opt').css({
        display: "block"
      });
    },
    mouseout: function(e) {
      let $target = $(e.currentTarget);
      $target.find('.u-dur').css({
        display: "block"
      });
      $target.find('.opt').css({
        display: "none"
      });
    }
  }
};
</script>
<style scoped>
  .n-songtb {
    margin-top: 27px;
}
.u-title-1 {
    height: 33px;
}
.u-title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
}
.u-title-1 h3 {
    font-size: 20px;
    line-height: 28px;
}

.u-title h3 {
    float: left;
    font-size: 24px;
    font-weight: normal;
    color:black;
}
.u-title-1 .sub {
    margin: 9px 0 0 20px;
}
.u-title .sub {
    float: left;
    margin: 13px 0 0 10px;
    color: #999;
    font-size: 12px;
}
.u-title-1 .more {
    margin-top: 5px;
}

.u-title .more {
    float: right;
    margin-top: 14px;
}
.s-fc6, a.s-fc6:hover {
    color: #c20c0c;
}

.m-table {
    width: 100%;
    border: 1px solid #d9d9d9;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.m-table .w1 {
    width: 74px;
}
.m-table th {
    height: 38px;
    background-color: #f7f7f7;
    background-position: 0 0;
    background-repeat: repeat-x;
}
.m-table th {
    vertical-align: top;
    text-align: left;
    font-weight: normal;
    color: #666;
}
.m-table th.first .wp {
    background: none;
}
.m-table th .wp {
    height: 18px;
    line-height: 18px;
    padding: 8px 10px;
    background-position: 0 -56px;
}
.m-table .af0:after {
    content: '\6b4c \66f2 \6807 \9898';
}
.m-table .af1:after {
    content: '播放';
}
.m-table .af2:after {
    content: '\6b4c \624b';
}
.m-table .af3:after {
    content: '\4e13 \8f91';
}
                 
.m-table .even td {
    background-color: #f7f7f7;
}

.m-table td {
    padding: 6px 10px;
    line-height: 18px;
    text-align: left;
}
.m-table .hd {
    height: 18px;
}
.m-table .ply {
    width: 17px;
    height: 17px;
    cursor: pointer;
    background-position: 0 -103px !important;
}
.m-table .ply {
    float: left;
}
.m-table .hd .num {
    width: 25px;
    margin-left: 5px;
    color: #999;
}
.m-table .tt {
    float: left;
    width: 100%;
}
.m-table .ttc {
    height: 18px;
    margin-right: 20px;
}
.m-table .txt {
    position: relative;
    display: inline-block;
    padding-right: 25px;
    margin-right: -25px;
    max-width: 99%;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.m-table .mv {
    width: 23px;
    height: 17px;
    margin: 1px 0 0 0;
    background-position: 0 -151px;
}
.m-table .mv, .m-table .icnfix {
    position: absolute;
    top: 0;
    right: 0;
}
.m-table .mv, .m-table .icn {
    float: left;
    width: 18px;
    height: 16px;
    margin: 2px 0 0 4px;
    overflow: hidden;
    text-indent: -999px;
    cursor: pointer;
}
.m-table b {
    font-weight: normal;
}
.m-table .hshow {
    display: none;
}
.m-table .opt {
    float: left;
}
.m-table .u-icn-81 {
    float: left;
    margin-top: 2px;
}

.u-icn-81 {
    width: 13px;
    height: 13px;
    background-position: 0 -700px !important;
}
.u-icn, .u-icn2, .u-icn3 {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.m-table .icn-fav {
    background-position: 0 -174px;
}
.m-table .mv, .m-table .icn {
    float: left;
    width: 18px;
    height: 16px;
    margin: 2px 0 0 4px;
    overflow: hidden;
    text-indent: -999px;
    cursor: pointer;
}
.m-table .icn-share {
    background-position: 0 -195px;
}
.m-table .icn-dl {
    background-position: -81px -174px;
}
.m-table .text {
    width: 100%;
    position: relative;
    zoom: 1;
    overflow: hidden;
    white-space: nowrap;
    font-size:14px;
    text-overflow: ellipsis;
}
td {
    font-size:14px;
}
.icn{
    padding-left:5px;
}
</style>

