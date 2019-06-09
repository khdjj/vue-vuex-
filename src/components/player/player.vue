<template>
  <div id="player">
    <div class="g-btmbar">
      <div class="m-playbar row">
        <div class="playbar-btns col-lg-2 col-lg-offset-1">
          <a href="javascript:;" class="prev" title="上一首"></a>
          <a href="javascript:;" class="ply" title="播放"></a>
          <a href="javascript:;" class="next" title="下一首"></a>
        </div>
        <div class="head j-flag col-lg-1">
          <img :src="song.album_img">
          <a href="javascript:;" class="albumimg"></a>
        </div>
        <div class="play col-lg-4">
          <div class="words">
            <a href="#" class="song-name">{{song.song_name}}</a>
            <a href="#" class="mv"></a>
            <span class="by">
              <a
                href="#"
                class="artist"
                v-for="(name,index) in song.artist_names"
                v-bind:key=" index"
              >{{name.artist_name}}</a>
            </span>
          </div>
          <div class="m-pbar">
            <div class="barbg">
              <div class="rdy"></div>
            </div>
            <div class="cur">
              <span class="circle-btn"></span>
            </div>
            <span class="time">
              <em class="cur-time">00:00</em>
              <em class="song-time">00:00</em>
            </span>
          </div>
        </div>
        <div class="oper col-lg-1 col-lg-offset-2">
          <a href="javascript:;" title="收藏" class="icn icn-add"></a>
          <a href="javascript:;" title="分享" class="icn icn-share"></a>
        </div>
        <div class="ctrl col-lg-1">
          <div class="m-vol">
            <div class="barbg"></div>
            <div class="vbg">
              <div class="curr"></div>
            </div>
          </div>
          <a href="#" class="icn icn-vol" title="音量"></a>
          <a href="#" class="icn icn-shuffle" title="播放方式"></a>
          <a href="#" class="icn icn-list" title="播放列表">125</a>
          <!-- </span> -->
        </div>
        <router-link :to="{path:'/player',query: {show: true}}" class="allscreen"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axiosMethod from "../../../service/axios";
import { LPlayer } from "../../../plugins/Lplayer";
import { mapState, mapMutations } from "vuex";
export default {
  name: "player",
  mounted: function() {
    console.log("mounted");
    if (this.$route.query.show) {
      this.isOnlyProgressBar = true;
    }
    if (this.song.song_name != "未知") {
      this.start();
    }
  },
  computed: {
    ...mapState([
      "song","currTime"
      ])
  },
  data() {
    return {
      isOnlyProgressBar: false,
      audioPlayer: null,
      status:"first"
    };
  },
  beforeDestroy:function(){
    this.audioPlayer.pause();
    this.SAVE_CURRTIME(this.audioPlayer.getCurrTime());
  },
  destroyed: function() {
    $("#player")
      .children("#container")
      .remove();
  },
  methods: {
    ...mapMutations([
      'SAVE_CURRTIME','SAVE_SONG_URL','SAVE_SONG_LYRIC'
    ]),
    start:function(id){
      if(!this.songUrl && !this.lyric){
        this.LPlayer();
      }else{
        this.getSongUrl();
      }
    },
    saveCurrTime:function(){
      this.audioPlayer.pause()
      this.audioPlaer && this.SAVE_CURRTIME(this.audioPlayer.getCurrTime());
    },
    LPlayer() {
      console.log(this.currTime);
      this.SAVE_SONG_URL(this.song.song_url);
      this.SAVE_SONG_LYRIC(this.song.song_lyric);
      let artist = "";
      for (let i = 0; i < this.song.artist_names.length; i++) {
        artist += this.song.artist_names[i].artist_name + " / ";
      }
      artist = artist.substring(0, artist.lastIndexOf("/"));
      if(this.status == "first"){
        this.status = "second";
        this.audioPlayer = new LPlayer({
          element: $("#player"),
          autoplay: false, //是否自动播放
          showlrc: true, //是否显示歌词
          theme: "#d4b514", //主题颜色 如进度条颜色,音量的颜色
          isOnlyProgressBar: this.isOnlyProgressBar,
          music: {
            title: this.song.song_name,
            album: this.song.album,
            author: artist,
            url: this.song.song_url,
            pic: this.song.album_img,
            lyric: this.song.song_lyric
          },
          audioCurrTime:this.currTime
        });
      } else {
        this.audioPlayer.changeData({
          autoplay: false, //是否自动播放
          showlrc: true, //是否显示歌词
          theme: "#d4b514", //主题颜色 如进度条颜色,音量的颜色
          isOnlyProgressBar: this.isOnlyProgressBar,
          music: {
            title: this.song.song_name,
            album: this.song.album,
            author: artist,
            url: this.song.song_url,
            pic: this.song.album_img,
            lyric: this.song.song_lyric
          },
          audioCurrTime:this.currTime
        });
      }
  
    },
    getSongUrl(id) {
      if (this.song.song_id == "") {
        this.song.song_id = id;
      }
      let self = this;
      axiosMethod("/discover/song/player", {
        id: self.song.song_id
      }).then(res => {
        console.log("getSongUrl");
        this.song.song_url = res.data.url;
        self.getLyric();
      });
    },
    getLyric() {
      let self = this;
      axiosMethod("/discover/song/lyric", {
        id: self.song.song_id
      }).then(res => {
        console.log("getSongLyric");
        this.song.song_lyric = res.data.lyric;
        self.LPlayer();
      });
    }
  }
};
</script>
<style>
@import url("./player.css");
</style>






