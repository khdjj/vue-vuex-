

<template>
  <div>
    <nav-compt></nav-compt>
    <div class="m-ban">
      <div class="container">
        <div class="slider-wrap">
          <div class="prev-btn btn">
            <img src="../../../default/btn_l.png">
          </div>
          <ul class="slider">
            <li class="img-items">
              <img src="http://p1.music.126.net/V0VdeRo9a0zTVU3xWnzNMg==/109951164239959392.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/sGSz5MD4FGROpvvfz5ykgw==/109951164239700931.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/pb6prIoyBdFJqLuQkBcBSw==/109951164240544327.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/Qh5o2VheQx070wZ-eMQsyg==/109951164240181070.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/aVuJ51VktKDRc7ugZU5Ugg==/109951164241210024.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/yVa3VX-9B9b3tsp3-Q0JYg==/109951164236362435.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/8DzhuW8dNrmniNk0xbybHQ==/109951164240532956.jpg">
            </li>
          </ul>
          <div class="next-btn btn">
            <img src="../../../default/btn_r.png">
          </div>
          <div class="pagination-wrap">
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
    <div class="discover-module">
      <div class="m-n-rcmd">
        <div class="v-hd2 f-cb">
          <a href="javascript:;" class="tit">热门推荐</a>
          <div class="tabs">
            <a href="javascript:;" class="tabs-a">华语</a>
            <a href="javascript:;" class="tabs-a">流行</a>
            <a href="javascript:;" class="tabs-a">摇滚</a>
            <a href="javascript:;" class="tabs-a">民谣</a>
            <a href="javascript:;" class="tabs-a">电子</a>
          </div>
          <span class="more">
            <a href="javascript:;">更多</a>
            <i class="cor"></i>
          </span>
        </div>
        <ul class="m-cvrlst f-cb">
          <li v-for="item in playList" v-bind:key="item.id">
            <div class="u-cover">
              <img :src="item.img">
              <router-link :to="{name:'playlist',params:{id:item.id}}" class="msk"></router-link>
              <div class="bottom">
                <span class="icon-headset"></span>
                <span class="nb">{{item.play_num}}</span>
              </div>
            </div>
            <p class="desc">
              <router-link :to="{path:'/playlist',query: {id:item.id}}" class="tit">{{item.name}}</router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="n-bill">
        <div class="v-hd2">
          <a href="javascript:;" class="tit">榜单</a>
          <span class="more">
            <a href="javascript:;">更多</a>
            <i class="cor"></i>
          </span>
        </div>
        <div class="n-bilst" id="top-flag">
          <dl class="blk" v-for="(toplist,index) in topList" v-bind:key="index">
            <dt class="top">
              <div class="cver u-cover u-cover-4">
                <img class="j-img" :src="toplist.cover">
                <a href="javascript:;" class="msk" v-bind:title="toplist.top_name"></a>
              </div>
              <div class="tit">
                <router-link
                  :to="{path:'/toplist',query:{name:toplist.top_name}}"
                  v-bind:title="toplist.top_name"
                >
                  <h3 class="f-fs1 f-thide">{{toplist.top_name}}</h3>
                </router-link>
                <div class="btn">
                  <a
                    href="javascript:;"
                    class="s-bg s-bg-9"
                    @click="addToPlayerList(songList,index)"
                  >播放</a>
                  <a href="javascript:;" title="收藏" class="s-bg s-bg-10">收藏</a>
                </div>
              </div>
            </dt>
            <dd>
              <ol>
                <li
                  @mouseover.stop="mouseover($event)"
                  @mouseout.stop="mouseout($event)"
                  v-for="(songlist,index) in songList[index]"
                  v-bind:key="index"
                >
                  <span class="no no-top">{{index+1}}</span>

                  <a
                    @click.stop.prevent="player(songlist,songlist.song_id,true)"
                    class="nm s-fc0 f-thide"
                    v-bind:title="songlist.song_name"
                  >{{songlist.song_name}}</a>
                  <div class="oper">
                    <a
                      class="s-bg s-bg-11"
                      @click.stop.prevent="player(songlist,songlist.song_id,false)"
                      title="播放"
                      hidefocus="true"
                    ></a>
                    <a href="#" class="u-icn u-icn-81" @click.prevent="addToPlayerList(songlist)" title="添加到播放列表" hidefocus="true"></a>
                    <a href="#" class="s-bg s-bg-12" title="收藏" hidefocus="true"></a>
                  </div>
                </li>
              </ol>
              <div class="more">
                <router-link
                  :to="{path:'/toplist',query:{name:toplist.top_name}}"
                  class="s-fc0"
                >查看全部&gt;</router-link>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- <keep-alive>
    <player ref="play"></player>
    </keep-alive> -->
    <foot></foot>
    <router-view></router-view>
  </div>
</template>

<script>
import navCompt from "../nav/nav";
import $ from "jquery";
// import player from "../player/player";
import foot from "../foot/foot";
import axios from "axios";
import { numFormat } from "../../../service/utils";
import { Shuffling } from "../../../plugins/broadcast/Shuffling.js";
import axiosmethod from "../../../service/axios";
import { mapMutations, mapState } from "vuex";
import pop from "../popWindows/pop"
export default {
  name: "home",
  components: {
    navCompt,
    // player,
    foot,
    pop
  },
  data() {
    return {
      playList: null,
      topList: null,
      songList: null
    };
  },
  mounted: function() {
    this.getPlayList();
    this.shuffling();
    this.getTopList();
  },
  /**
   * 在vue实例销毁之前的钩子函数，调用播放组件的存储函数存储当前歌曲播放时间
   */
  beforeDestroy: function() {
    // this.$refs.play.saveCurrTime();
  },
  computed: {
    ...mapState(["playerList"])
  },
  methods: {
    ...mapMutations(["SAVE_SONG", "SAVE_CURRTIME", "SAVE_PLAYERLIST"]),
    /**
     * 点击排行榜播放按钮时，进行歌曲播放
     */
    player(song, id, show) {
      this.SAVE_SONG(song); //在vuex中存储当前播放歌曲
      this.SAVE_CURRTIME(0); //在vuex中重置当前歌曲播放时间
      show && this.$router.push({ path: "/player", query: { id: id, show: true } }); //播放栏中的扩展按钮，点击时，可全屏查看歌曲信息
      // this.$refs.play.getSongUrl(id); //播放歌曲
      this.$root.$emit('playEvent', id); //插入歌曲
    },

    addToPlayerList(playList, index) {
      // this.$refs.play.addPlayerList(playList,index);
      this.$root.$emit('addPlayerListEvent', playList,index); //插入歌曲
    },
    /**
     * 轮播插件
     */
    shuffling() {
      var setting = {
        model: "slide", //slide or carousel
        delay: 1000, //延迟
        posterWidth: 640, //此为幻灯片模式情况下第一帧的宽度
        posterHeight: 400, //此为幻灯片模式情况下第一帧的高度
        width: 900, //在普通轮播模式下,width为第一张图片的宽度,幻灯片模式下,width为整个显示轮播特效的总宽度,高度也是如此
        height: 336,
        autoPlay: true, //自动播放
        scale: 0.8, //carousel模式下图片的缩放比例
        paginationModel: "square" // circular or square
      };
      $(function() {
        new Shuffling($(".slider-wrap"), setting);
      });
    },

    /**
     * 后台获取歌单数据
     */
    getPlayList() {
      let self = this;
      axiosmethod("/discover/playlist", {
        limit: 8,
        offset: 0
      }).then(res => {
        self.playList = res.data.data;
        if (self.playList) {
          //对歌单数据进行处理 将歌曲播放量进行格式化
          self.playList.forEach(item => {
            item.play_num = numFormat(item.play_num);
          });
        }
      });
    },
    /**
     * 获取排行榜数据
     */
    getTopList() {
      let self = this;
      axiosmethod("/discover/toplist", {
        limit: 10,
        offset: 0,
        name: ["云音乐飙升榜", "云音乐新歌榜", "网易原创歌曲榜"]
      }).then(res => {
        self.topList = res.data.topList;
        self.songList = res.data.songs;
      });
    },
    /**
     * 对排行榜的鼠标移动操作进行处理
     */
    mouseover: function(e) {
      let target = e.currentTarget;
      $(target).addClass("z-hvr");
    },
    mouseout: function(e) {
      let target = e.currentTarget;
      $(target).removeClass("z-hvr");
    }
  }
};
</script>

<style scoped>
@import url("../../../plugins/broadcast/style.css");
@import url("./home.css");
</style>
