<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-01 14:53:53
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-28 19:48:13
 -->
<template>
  <div id="player">
    <div id="container" style="display:none;">
			<span class="closePlayer" @click="closePlayer()" title="返回上一级"></span>
			<div id="player" class="lplayer row">
				<div class="player_cvrwrap col-lg-4 col-lg-offset-1">
					<div class="player_u-cover">
						<div class="player_avatar">
							<div class="msk">
								<img :src="song.album_img" class="p-img" />
							</div>
						</div>
						<div class="content-operation">
							<a href="javascript:;" class="player btns" title="播放">播放</a>
							<a href="javascript:;" class="addTo btns" title="添加到播放列表">+</a>
							<a href="javascript:;" class="btns" title="收藏">收藏</a>
							<a href="javascript:;" class="btns" title="分享">分享</a>
							<a href="javascript:;" class="btns" title="下载">下载</a>
							<a href="javascript:;" class="btns" title="评论">评论</a>
						</div>
					</div>
				</div>
         <!-- title: this.song.song_name,
              album: this.song.album,
              author: artist,
              url: this.song.song_url,
              pic: this.song.album_img,
              lyric: this.song.song_lyric -->
				<div class="lplayer-lrc-container col-lg-6 ">
					<div class="lplayer-music">
						<h1>{{song.song_name}} </h1>
						<span style=" margin-top: 16px; display: inline-block;">歌手：<span style = "color:white">{{artist}}</span></span>
						<span style="margin-left: 20px;">专辑：<a href="javascript:;">{{song.album}} </a></span>
					</div>
					<div class="lplayer-lrc">
						<div class="lplayer-lrc-content">
						</div>
					</div>
				</div>
			</div>
		</div>
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
          <a
            href="#"
            class="icn icn-list"
            title="播放列表"
            @click.prevent="playerListClick()"
          >{{playerList.length}}</a>
          <!-- </span> -->
        </div>
        <div class="list" id="g_playlist">
          <div class="listhd">
            <div class="listhdc">
              <h4>
                播放列表&nbsp;
                <span class="j-flag">{{playerList.length}}</span>
              </h4>
              <a href="javascript:;" class="addall">
                <span class="ico ico-add"></span>收藏全部
              </a>
              <span class="line"></span>
              <a href="javascript:;" class="clear">
                <span class="ico icn-del"></span>清除
              </a>
            </div>

            <div class="custom-scroll custom-scroll-1">
              <ul class="f-cb playerul" style="background-color:#262424 ;width:549px">
                <li v-for="(list,index) in playerList" :key="list.song_id">
                  <div class="col col-1">
                    <div class="playicn"></div>
                  </div>
                  <div class="col col-2" @click="start(list.song_id,list,index)">{{list.song_name}}</div>
                  <div class="col col-3">
                    <div class="icns">
                      <i class="ico icn-del" title="删除" data-id="29774167" data-action="delete">删除</i>
                      <i class="ico ico-dl" title="下载" data-id="29774167" data-action="download">下载</i>
                      <i class="ico ico-share" title="分享" data-id="29774167" data-action="share">分享</i>
                      <i class="j-t ico ico-add" title="收藏" data-id="29774167" data-action="like">收藏</i>
                    </div>
                  </div>
                  <div class="col col-4">
                    <span>
                      <a
                        class
                        href="javascript:;"
                        hidefocus="true"
                        v-for="(name,index) in list.artist_names"
                        :key="index"
                      >{{name.artist_name}}&nbsp;</a>
                    </span>
                  </div>
                  <div class="col col-6">
                    <a
                      href="/playlist?id=2765397746&amp;_hash=songlist-29774167"
                      class="ico ico-src"
                      title="来自歌单"
                      data-action="link"
                    >来源</a>
                  </div>
                </li>
              </ul>
              <div style="width:552px;height:32px;background-color:#262424"></div>
            </div>
          </div>
        </div>
        <!-- <router-link :to="{path:'/player',query: {show: true}}" class="allscreen"></router-link> -->
        <a class="allscreen" @click.prevent="changeScreen()"></a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axiosMethod from "../../../service/axios";
import { LPlayer } from "../../../plugins/Lplayer";
import { scrollbot } from "../../../plugins/scrollbot";
import { mapState, mapMutations,mapActions } from "vuex";
import { formatArtist } from "../../../service/core";
import {removeStore} from "../../../service/getStoreData"
export default {
  name: "player",
  created(){
    this.$root.$on('playEvent',(id)=>{
      this.getSongUrl(id);
    });
    this.$root.$on('addPlayerListEvent',(playList,index)=>{
      this.addPlayerList(playList,index);
    });
  },
  mounted: function() {
    this.getSong();
    this.getPlayerList();

    //如果url函数中带有show，则表明需要全屏显示歌曲播放信息
    if (this.$route.query.show) {
      this.isOnlyProgressBar = true;
      this.LPlayer();
    }
    if (this.song.song_name != "未知") {
      //开始获取歌曲信息
      this.start();
    }
    this.closePlayer();
    window.playNextSong = this.playNextSong;
    window.playPrevSong = this.playPrevSong;
  },
  computed: {
    ...mapState(["song", "currTime", "playerList"])
  },
  data() {
    return {
      isOnlyProgressBar: false,
      audioPlayer: null,
      status: "first",
      currSongIndex: 0,
      firstPlayerListSong: "未知",
      artist:null
    };
  },
  watch: {
    playerList() {
      // new scrollbot(".custom-scroll");
    }
  },
  beforeDestroy: function() {
    //在vue实例销毁之前将歌曲暂停并存储当前歌曲播放时间
    // this.audioPlayer.pause();
    // this.removeContainer();
    this.SAVE_CURRTIME(this.audioPlayer.getCurrTime());
  },
  // destroyed: function() {
  //   this.removeContainer();
  // },
  methods: {
    ...mapMutations([
      "SAVE_CURRTIME",
      "SAVE_SONG_URL",
      "SAVE_SONG_LYRIC",
      "SAVE_SONG",
      "SAVE_PLAYERLIST"
    ]),

    ...mapActions([
      "getSong",
      "getPlayerList"
    ]),

    changeScreen(){
      $("#container").css({
        display:"block"
      })
      // this.isOnlyProgressBar = !this.isOnlyProgressBar;
      // this.LPlayer();
    },
    //添加到播放列表
    addPlayerList(playList, index) {
      let data,isRepeat = false;
      //vuex的mutations不能传递多个参数，所以只能作为对象传进去
      let obj;
      if(index){
        if (Object.prototype.toString.call(playList[index]) == "[object Array]") {
            obj = JSON.parse(JSON.stringify(playList[index]));
            data = {
              list:obj,
              isArray:true
            }
        }
      }else{
        if(Object.prototype.toString.call(playList) == "[object Array]"){
            obj = JSON.parse(JSON.stringify(playList));
               data = {
              list:obj,
              isArray:true
            }
        }
      }
     if (Object.prototype.toString.call(playList) == "[object Object]") {
        for(let i = 0; i< this.playerList.length;i++){
          if(this.playerList[i].song_id == playList.song_id){
            isRepeat = true;
            break;
          }
        }
        data = {
          list: playList,
          isArray: false
        };
      }
      !isRepeat && this.SAVE_PLAYERLIST(data);
    },
    // //每次一首歌结束之后，就要将container去掉，因为它会重新生成一个节点
    // removeContainer() {
    //   $("#player")
    //     .children("#container")
    //     .remove();
    // },
    start: function(id, song, index) {
      if (id) {
        this.currSongIndex = index || this.currSongIndex;
        this.SAVE_SONG(song);
        this.SAVE_CURRTIME(0);
      }
      //如果当前歌曲信息已存在，则无需获取，直接播放，否则先获取歌曲播放地址
      if (
        this.songUrl != "" &&
        !this.lyric != "" &&
        this.songUrl &&
        this.lyric
      ) {
        this.LPlayer();
      } else {
        this.getSongUrl(id);
      }
    },

    //播放上一首歌曲
    playNextSong: function() {
      // this.removeContainer();
      this.currSongIndex = this.currSongIndex + 1;
      if (this.currSongIndex == this.playerList.length) {
        this.currSongIndex = 0;
      }
      this.start(
        this.playerList[this.currSongIndex].song_id,
        this.playerList[this.currSongIndex]
      );
    },

    //播放下一首歌曲
    playPrevSong: function() {
      // this.removeContainer();
      this.currSongIndex = this.currSongIndex - 1;
      if (this.currSongIndex - 1 < 0) {
        this.currSongIndex = this.playerList.length - 1;
      }
      this.start(
        this.playerList[this.currSongIndex].song_id,
        this.playerList[this.currSongIndex]
      );
    },

    //存储当前歌曲播放时间
    saveCurrTime: function() {
      //父组件调用此函数，调用此函数时，则说明父组件正在销毁，需要存储父组件的歌曲信息
      this.audioPlayer.pause();
      this.audioPlaer && this.SAVE_CURRTIME(this.audioPlayer.getCurrTime());
    },
    /**
     * 歌曲播放组件
     */
    LPlayer() {
      /**
       * 在vue中存储当前歌曲的信息
       */
      this.SAVE_SONG_URL(this.song.song_url);
      this.SAVE_SONG_LYRIC(this.song.song_lyric);
      //歌曲可能有多个，需要对后台的数据进行处理
      this.artist = formatArtist(this.song.artist_names);

      //全局只需要一个Lplayer实例，所以根据状态，如果还没有此实例，则创建，否则，更改数据，无需创建
      if (this.status == "first") {
        this.status = "second";
        this.audioPlayer = new LPlayer(
          {
            element: $("#player"),
            loop: false,
            autoplay: true, //是否自动播放
            showlrc: true, //是否显示歌词
            theme: "#d4b514", //主题颜色 如进度条颜色,音量的颜色
            isOnlyProgressBar:true,
            music: {
              title: this.song.song_name,
              album: this.song.album,
              author: this.artist,
              url: this.song.song_url,
              pic: this.song.album_img,
              lyric: this.song.song_lyric
            },
            audioCurrTime: this.currTime
          },
        );
      } else {
        this.audioPlayer.changeData({
          autoplay: true, //是否自动播放
          loop: false,
          showlrc: true, //是否显示歌词
          theme: "#d4b514", //主题颜色 如进度条颜色,音量的颜色
          isOnlyProgressBar: true,
          music: {
            title: this.song.song_name,
            album: this.song.album,
            author: this.artist,
            url: this.song.song_url,
            pic: this.song.album_img,
            lyric: this.song.song_lyric
          },
          audioCurrTime: this.currTime
        });
      }
    },
    /**
     * 后台获取歌曲url
     */
    getSongUrl(id) {
      if (this.song.song_id == "") {
        this.song.song_id = id;
      }
      let self = this;
      axiosMethod("/discover/song/player", {
        id: self.song.song_id
      }).then(res => {
        this.song.song_url = res.data.url;
        self.getLyric();
      });
    },
    /**
     * 后台获取歌曲歌曲
     */
    getLyric() {
      let self = this;
      axiosMethod("/discover/song/lyric", {
        id: self.song.song_id
      }).then(res => {
        this.song.song_lyric = res.data.lyric;
        self.LPlayer();
      });
    },
    playerListClick() {
      let g_playList = document.getElementById("g_playlist");
      if (g_playList.style.display == "block") {
        g_playList.style.display = "none";
      } else {
        g_playList.style.display = "block";
      }
    },
    closePlayer(){
      $("#container").css({
        display:"none"
      })
    }
  }
};
</script>

<style>
@import url("player.css");
</style>






