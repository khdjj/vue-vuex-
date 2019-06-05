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
              <img src="http://p1.music.126.net/bJwniekKyd8disfC-aZJ9A==/109951164108363779.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/P05are-Iqwt513CMlvvo2w==/109951164110504414.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/DQnrPUsbyUSYrbTUYZakJw==/109951164111819482.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/3xukBeaHJCSiHHYTCbLxSA==/109951164110146340.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/11gGZDiLuOZ1mpX-Rune1A==/109951164110498858.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/USAyefWuwIi4k2VIVjBKAg==/109951164111325559.jpg">
            </li>
            <li class="img-items">
              <img src="http://p1.music.126.net/IPc12NgTimcKXYNym2KMcg==/109951164110587739.jpg">
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
              <router-link :to="{name:'playlist',params:item.id}" class="tit">{{item.name}}</router-link>
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
          <dl class="blk" v-for="(toplist,index) in topList" v-bind:key = "index">
            <dt class="top">
              <div class="cver u-cover u-cover-4">
                <img
                  class="j-img"
                  :src="toplist.cover"
                >
                <a href="javascript:;" class="msk" v-bind:title="toplist.top_name"></a>
              </div>
              <div class="tit">
                <a href="/discover/toplist?id=19723756" v-bind:title="toplist.top_name">
                  <h3 class="f-fs1 f-thide">{{toplist.top_name}}</h3>
                </a>
                <div class="btn">
                  <a href="javascript:;" class="s-bg s-bg-9">播放</a>
                  <a href="javascript:;" title="收藏" class="s-bg s-bg-10">收藏</a>
                </div>
              </div>
            </dt>
            <dd>
              <ol>
                <li @mouseover.stop="mouseover($event)" @mouseout.stop="mouseout($event)"  v-for = "(songlist,index) in songList[index]" v-bind:key="index">
                  <span class="no no-top">{{index+1}}</span>
                  <a
                    href="javascript:;"
                    class="nm s-fc0 f-thide"
                    title="Never Really Over"
                  >{{songlist.song_name}}</a>
                  <div class="oper">
                    <a href="#" class="s-bg s-bg-11" title="播放" hidefocus="true"></a>
                    <a href="#" class="u-icn u-icn-81" title="添加到播放列表" hidefocus="true"></a>
                    <a href="#" class="s-bg s-bg-12" title="收藏" hidefocus="true"></a>
                  </div>
                </li>
              </ol>
              <div class="more">
                <a href="javascript:;" class="s-fc0">查看全部&gt;</a>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <player></player>
    <foot></foot>
    <router-view></router-view>
  </div>
</template>

<script>
import navCompt from "../nav/nav";
import $ from "jquery";
// import {show,hide} from '../../../service/core'
import player from "../player/player";
import foot from "../foot/foot";
import axios from "axios";
import { numFormat } from "../../../service/utils";
import { Shuffling } from "../../../plugins/broadcast/Shuffling.js";
import axiosmethod from "../../../service/axios";
export default {
  name: "home",
  components: {
    navCompt,
    player,
    foot
  },
  data() {
    return {
      playList: null,
      topList: null,
      songList:null
    };
  },
  mounted: function() {
    this.getPlayList();
    this.shuffling();
    this.getTopList();
  },
  methods: {
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
    getPlayList() {
      let self = this;
      axiosmethod("/discover/playlist", {
        limit: 8,
        offset: 0
      }).then(res => {
        self.playList = res.data.data;
        if (self.playList) {
          self.playList.forEach(item => {
            item.play_num = numFormat(item.play_num);
          });
        }
      });
    },
    getTopList() {
      let self = this;
      axiosmethod("/discover/toplist", {
        limit: 10,
        offset: 0,
        name:['云音乐飙升榜','云音乐新歌榜','网易原创歌曲榜']
      }).then(res => {
        console.log(res);
        self.topList = res.data.data.topList;
        self.songList = res.data.data.songIds;
      });
    },
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

<style>
@import url("../../../plugins/broadcast/style.css");
@import url("./home.css");
</style>
