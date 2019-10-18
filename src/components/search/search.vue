<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-18 19:18:50
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 22:08:21
 -->
<template>
  <div class="g-bd">
    <div class="g-wrap n-srch">
      <div class="pgsrch f-pr j-suggest" id="auto-id-EJU4ez31Rek3mEBR">
        <input id="m-search-input" type="text" class="srch j-flag" value="searchKey" v-model="searchKey" style="opacity: 1;">
        <span class="j-flag" style="display:none;" id="auto-id-qXUo4n08KRzlPVCJ">&nbsp;</span>
        <a hidefocus="true" href="javascript:void(0)" class="btn j-flag" title="搜索" @click.prevent="getData()">搜索</a>
      </div>
      <!-- 搜索页面主体 -->
      <div id="m-search">
        <div class="snote s-fc4 ztag">搜索“{{searchKey}}”，找到 <em class="s-fc6">{{resultCount}}</em> 个结果</div>
        <ul class="m-tabs m-tabs-srch f-cb ztag" data-xname="" id="auto-id-RxSRrMI7QtemfQgw" style="margin-bottom: auto;">
          <li class="fst"><a data-type="1" href="javascript:void(0)" :class="{'z-slt':searchSong}" @click="changeSearchView($event)"><em>单曲</em></a></li>
          <li><a hidefocus="true" data-type="100" href="javascript:void(0)" :class="{'z-slt':searchArtist}" @click="changeSearchView($event)"><em>歌手</em></a></li>
          <li><a hidefocus="true" data-type="10" href="javascript:void(0)" :class="{'z-slt':searchAlbum}" @click="changeSearchView($event)"><em>专辑</em></a></li>
          <li><a hidefocus="true" data-type="1014" href="javascript:void(0)" :class="{'z-slt':searchVideo}" @click="changeSearchView($event)"><em>视频</em></a></li>
          <li><a hidefocus="true" data-type="1000" href="javascript:void(0)" :class="{'z-slt':searchPlayList}" @click="changeSearchView($event)"><em>歌单</em></a></li>
          <!-- <li><a hidefocus="true" data-type="1009" href="javascript:void(0)" :class="{'z-slt':searchRadio}" @click="changeSearchView($event)"><em>主播电台</em></a></li> -->
        </ul>
        <div class="ztag j-flag" id="auto-id-BSkMCZ8vK1FXJpsU">
          <div class="n-srchrst">
            <!--  搜索歌曲列表  -->
            <div class="srchsongst" v-if="searchSong">
              <div class="item f-cb h-flag " v-for="(item,index) in searchData.result.songs" :key="index">
                <div class="td">
                  <div class="hd"><a class="splay " title="播放"></a></div>
                </div>
                <div class="td w0">
                  <div class="sn">
                    <div class="text">
                      <a href="#"><b v-bind:title="item.name"> <span class="s-fc7">{{item.name}}</span></b></a>
                    </div>
                  </div>
                </div>
                <div class="td">
                  <div class="opt hshow">
                    <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表" hidefocus="true"></a>
                    <span class="icn icn-fav" title="收藏"></span>
                    <span class="icn icn-share" title="分享"></span>
                    <span class="icn icn-dl" title="下载"></span>
                  </div>
                </div>
                <div class="td w1">
                  <div class="text"><a href="#" v-for="(ar,index) in item.ar" :key="index">{{ar.name}}</a></div>
                </div>
                <div class="td w2">
                  <div class="text"><a class="s-fc3" href="#" v-bind:title="item.al.name">《{{item.al.name}}》</a></div>
                </div>
                <div class="td">04:39</div>
              </div>
            </div>
            <!-- 搜索歌手列表 -->
            <div class="m-sgerlist m-sgerlist-1" v-if="searchArtist">
              <ul class="m-cvrlst m-cvrlst-5 f-cb">
                <li v-for="(item,index) in searchData.result.artists" :key="index">
                  <div class="u-cover u-cover-5">
                    <a href="#">
                      <img :src="item.picUrl">
                      <span :title="item.name" class="msk"></span>
                    </a></div>
                  <p><a class="nm f-thide s-fc0" href="#" :title="item.name">{{item.name}}</a><a href="#" v-if="item.accountId"><i class="u-icn u-icn-5"></i></a></p>
                </li>
              </ul>
            </div>
            <!-- 搜索专辑列表 -->
            <div class="n-srchrst ztag" v-if="searchAlbum">
              <ul class="m-cvrlst m-cvrlst-alb3 f-cb">
                <li v-for="(item,index) in searchData.result.albums" :key="index">
                  <div class="u-cover u-cover-alb2"><a href="#"><img :src="item.picUrl"><span :title="item.name" class="msk"></span></a><a title="播放" data-res-action="splay" data-res-type="19" data-res-id="34943039" class="icon-play f-alpha f-fr " href="javascript:void(0)"></a></div>
                  <p class="dec"><a href="#" class="tit f-thide s-fc0" :title="item.name">{{item.name}}</a></p>
                  <p><span class="nm f-thide" :title="item.artist.name"><a href="#" class="s-fc3">{{item.artist.name}}</a></span></p>
                </li>
              </ul>
            </div>

            <!-- 搜索视频列表 -->

            <div class="ztag j-flag" id="auto-id-NnoGrP3bcFMPnOBN" v-if="searchVideo">
              <div class="n-srchrst ztag">
                <ul class="m-mvlist f-cb">
                  <li v-for="(item,index) in searchData.result.videos" :key="index">
                    <div class="cover f-pr"><img :src="item.coverUrl"><span :title="item.title" class="msk"></span>
                      <p class="tr u-msk u-msk-1"><span class="u-icn2 u-icn2-mv"></span>{{item.playTime}}</p>
                      <p class="bl u-msk u-msk-2">04:17</p><a class="link" data-res-action="bilog" data-log-action="new|search" href="#"></a>
                    </div>
                    <h4 class="title f-thide"><i class="tag u-icn2 u-icn2-smvtag"></i><a  href="#" class="s-fc0" :title="item.title">{{item.title}}</a></h4>
                    <h5 class="name f-thide"><span class="f-thide" title="陈奕迅"><a href="#" class="s-fc3" v-for="(creator,index) in item.creator" :key="index">{{creator.userName}}</a></span></h5>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 搜索歌单列表 -->
            <div class="ztag j-flag"  v-if="searchPlayList">
              <div class="n-srchrst ztag">
                <table cellspacing="0" cellpadding="0" class="m-table m-table-2 m-table-2-cover">
                  <tbody>
                    <tr class="h-flag"  v-for="(item,index) in searchData.result.playlists" :key="index">
                      <td class="first w0">
                        <div class="hd"><span class="splay " title="播放" ></span></div>
                      </td>
                      <td class="w7">
                        <div class="u-cover u-cover-3"><a href="">
                          <img :src="item.coverImgUrl">
                          <span :title="item.name" class="msk"></span></a></div>
                      </td>
                      <td>
                        <div class="f-cb">
                          <div class="opt hshow" style="display: none;">
                            <a class="u-icn u-icn-81" href="javascript:;" title="添加到播放列表" hidefocus="true" ></a>
                            <span class="icn icn-fav " title="收藏">收藏</span>
                            <span  class="icn icn-share" title="分享">分享</span></div>
                          <div class="tt">
                            <div class="ttc"><span class="txt"><a href="#" :title="item.name">{{item.name}}</a></span></div>
                          </div>
                        </div>
                      </td>
                      <td class="w11 s-fc4">{{item.trackCount}}首</td>
                      <td class="w4">
                        <div class="text"><span class="s-fc3">by</span>&nbsp;&nbsp;<a class="s-fc3" href="#" title="Gardenia0515">{{item.creator.nickname}}</a></div>
                      </td>
                      <td class="w6 s-fc4">收藏：<span id="flag_fav_count-432667945">{{item.bookCount}}</span></td>
                      <td class="last w6 s-fc4">收听：<span id="flag_play_count-432667945">{{item.playCount}}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 搜索主播电台列表 -->
          </div>
        </div>
        <div class="j-flag"></div>
      </div>
    </div>
  </div>

</template>

<script>
import $ from 'jquery';
import axiosMethod from '../../../service/axios'
export default {
  name: 'search',
  data() {
    return {
      searchSong: true,
      searchArtist: false,
      searchAlbum: false,
      searchVideo: false,
      searchPlayList: false,
      searchRadio: false,
      searchKey: '',
      searchData: {
        result: []
      },
      resultCount:0
    }
  },
  mounted() {
    //获取搜索关键字
    this.searchKey = this.$route.query.searchKey;
    //获取搜索数据
    this.getData("1", "30", "0");
  },
  methods: {
    reset() {
      this.searchSong = false;
      this.searchArtist = false;
      this.searchAlbum = false;
      this.searchVideo = false;
      this.searchPlayList = false;
      this.searchRadio = false;
    },
    changeSearchView(e) {
      var target = e.currentTarget;
      var dataType = $(target).attr('data-type');

      //重置
      this.reset();
      switch (dataType) {
        case '100':
          this.searchArtist = !this.searchSong;
          this.getData("100", "90", "0");
          break;
        case '1':
          this.searchSong = !this.searchSong;
          this.getData("1", "30", "0");
          break;
        case '10':
          this.searchAlbum = !this.searchAlbum;
          this.getData("10", "72", "0");
          break;
        case '1014':
          this.searchVideo = !this.searchVideo;
          this.getData("1014", "20", "0")
          break;
        case '1000':
          this.searchPlayList = !this.searchPlayList;
          this.getData("1000", "30", "0")
          break;
        case '1009':
          this.searchRadio = !this.searchRadio;
          break;
        default:
          break;
      }
    },
    getData(type, limit, offset) {
      type = type || "1";
      limit = limit || "30";
      offset = offset || "0";
      let s = this.searchKey;
      console.log(s);
      axiosMethod('/weapi/cloudsearch/get/web', {
        type: type,
        limit: limit,
        offset: offset,
        s: s
      }, 'POST').then((res) => {
        console.log(res);
        this.searchData = res.data;   
      })
    }
  }
}

</script>

<style scoped>
@import url("search.css");
</style>
