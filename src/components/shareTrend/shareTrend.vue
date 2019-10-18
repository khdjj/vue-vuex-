<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-17 08:45:01
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-17 22:21:00
 -->
<template>
  <div class="g-bd5">
    <div class="g-wrap8" id="trackListBox">
      <div class="m-timeline-title u-title f-cb">
        <h3><span class="f-ff2">动态</span></h3>
      </div>
      <a class="m-dynamicbar f-ff1" href="#" id="newTrackLink" style="display:none;" hidefocus="true"><em>0</em>条新动态<i class="u-icn u-icn-63"></i></a>
      <div id="auto-id-psOgTpH16HxcfW1v">
        <a data-action="pull" class="m-dynamicbar f-ff1 j-flag" style="display:none;" href="javascript:;"></a>
        <div class="m-timeline">
          <ul class="m-dlist j-flag">
            <li class="itm" id="auto-id-2GNgRytZ8iZqQ4Bf" v-for="(item,index) in shareList" :key="index">
              <div class="gface">
                <a href="/user/home?id=609804833" class="ficon">
                  <img class="j-flag" :src="item.user.avatarUrl | imageFilter "></a>
              </div>
              <div class="gcnt j-flag">
                <div class="dcntc" id="auto-id-ZdWiSMAk7Tz4bRW1">
                  <div class="type f-pr f-fs1"><a href="/user/home?id=609804833" class="s-fc7">{{item.user.nickname}}</a><sup class="u-icn u-icn-84"></sup><span class="sep s-fc3">分享{{item.type}}</span>
                  </div>
                  <div class="time"><a class="s-fc4" data-action="logdetail" href="/event?id=6758237667&amp;uid=609804833">{{item.time | date}}</a>
                  </div>
                  <div class="text f-fs1  f-brk j-text">{{item.content}}</div>
                  <div class="j-flag">
                    <div id="auto-id-yhVeUn0CoCFmQns8">
                      <div class="src f-cb">
                        <div class="cover cover-ply"><span class="lnk">
                            <img :src="item.shareContent.image"></span>
                          <router-link v-if="item.type=='歌单'" :to="{name:'playlist',params:{id:item.shareContent.id}}" data-log="event" data-event-id="6758237667" class="ply u-dicn u-dicn-8 f-alpha" data-res-action="play" data-res-type="18" data-res-id="31997564"></router-link>
                          <a class="ply u-dicn u-dicn-8 f-alpha"  v-else @click="playSong(item.shareContent)"/>
                          </div>
                        <div class="scnt">
                          <h3 class="tit f-thide f-fs1"><a href="/song?id=31997564" class="s-fc1" data-log="event" data-event-id="6758237667">{{item.shareContent.title}}</a></h3>
                          <h4 class="from f-thide s-fc3"><a href="/artist?id=7891"  class="s-fc3" data-log="event" data-event-id="6758237667">{{item.shareContent.name}}</a></h4>
                        </div>
                      </div>
                    </div>
                    <div id="auto-id-Ozw2PKl4t4sHRHQ7">
                      <ul class="pics f-cb j-flag">
                        <li class="pic pic-s clear"   v-for="(i,index) in item.con_img" :key="index"    data-action="expand" data-index="0" data-log="event" data-event-id="">
                          <img class="f-img j-img f-curbig" :src="i.src | imageFilter" style="" id="auto-id-9tBLFyV38NPZTLWS"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="u-page j-flag"></div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMethod from '../../../service/axios';
import { formatImage } from '../../../service/utils'
import { formatDate } from "../../../service/core";
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      shareList: []
    }
  },
  filters: {
    imageFilter(value) {
      return formatImage(value);
    },
    date: function (val) {
      return formatDate(val);
    },
  },
  mounted() {
    this.getShareData();
  },
  methods: {
    ...mapMutations([
      "SAVE_CURRTIME",
      "SAVE_SONG",
    ]),
    playSong(data){
      var song = {};
      song.song_id = data.id;
      song.album_img = data.image;
      song.song_name = data.title;
      song.artist_names = data.name;
      song.album = data.title;
      this.SAVE_SONG(song); //在vuex中存储当前播放歌曲
      this.SAVE_CURRTIME(0); //在vuex中重置当前歌曲播放时间
      this.$root.$emit('playEvent',data.id);
    },
    getShareData() {
      var vm = this;
      axiosMethod('/weapi/share/getShare', {}, 'POST').then(res => {
        console.log(res);
        vm.shareList = res.data.result;
      })
    }
  }
}
</script>

<style scoped>
@import "./shareTrend.css";
</style>