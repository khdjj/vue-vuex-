<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-15 16:20:36
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 21:09:39
 -->
<template>
  <div class="gd">
    <ul class="m-cvrlst f-cb">
      <li v-for="item in playList" v-bind:key="item.id">
        <div class="u-cover">
          <img :src="item.img | imageFilter">
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
    <div id="m-pl-pager">
      <div class="u-page">
        <a href="javascript:void(0)" :class="{'zbtn':true,'zprv':true,'js-disabled':offset==0}" @click="getPrev()">上一页</a>
        <a href="javascript:;" :class="{'zbtn':true,'znxt':true,'js-disabled':offset+limit>=total}" @click="getNext()">下一页</a>
      </div>
    </div>
  </div>
</template>
<script>
import axiosmethod from "../../../service/axios";
import { formatImage } from '../../../service/utils'

export default {
  data() {
    return {
      playList: null,
      limit: 24,
      offset: 0,
      total: 50
    };
  },
  filters: {
    imageFilter(value) {
      return formatImage(value);
    }
  },
  mounted() {
    this.getPlayList();
    this.getTotal();
  },
  methods: {
    getPrev() {
      this.offset = this.offset - this.limit;
      this.getPlayList();
    },
    getNext() {
      this.offset = this.offset + this.limit;
      this.getPlayList();
    },
    getTotal() {
      let self = this;
      axiosmethod('/discover/playlist/total', {}, 'POST').then((res) => {
        self.total = res.data.result;
      })
    },
    getPlayList() {
      let self = this;
      axiosmethod("/discover/playlist", {
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        self.playList = res.data.data;
        if (self.playList) {
          //对歌单数据进行处理 将歌曲播放量进行格式化
          //   self.playList.forEach(item => {
          //     item.play_num = numFormat(item.play_num);
          //   });
        }
      });
    },
  }
}
</script>

<style>
@import url("../home/home.css");
.gd {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
}
div.u-page {
  margin: 14x 0;
  margin-bottom: 60px;
  text-align: center;
}
.u-btn,
div.u-page a,
div.u-page a.js-selected,
div.u-page a.znxt.js-disabled,
div.u-page a.zprv.js-disabled {
  background: url(https://s2.music.126.net/style/web2/img/button.png?eb6155834bae665a57a31f7daa7ddace)
    no-repeat 0 9999px;
}

div.u-page .zbtn,
div.u-page .zpgi {
  margin: 0 1px 0 2px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 2px;
  vertical-align: middle;
}
div.u-page .zprv {
  width: 47px;
  padding-left: 12px;
  background-position: 0 -560px;
}
div.u-page .znxt {
  width: 57px;
  padding-left: 12px;
  background-position: -75px -560px;
  text-align: left !important;
}
div.u-page .zbtn {
  width: 69px;
  height: 24px;
  line-height: 24px;
  color: #333;
  text-align: left;
  text-align: center;
}

div.u-page a.zprv.js-disabled,
div.u-page a.zprv.js-disabled:hover {
  background-position: 0 -620px;
  color: #cacaca;
  cursor: default;
}
div.u-page a.znxt.js-disabled,
div.u-page a.znxt.js-disabled:hover {
  background-position: -75px -620px;
  color: #cacaca;
  cursor: default;
}
</style>