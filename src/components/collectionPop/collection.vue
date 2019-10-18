<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-13 18:47:11
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 09:04:36
 -->
<template>
  <div class="m-layer z-show m-layer-w2" style="top: 100px; left: 434.5px;" v-if="show">
    <div class="zbar" id="auto-id-GZpvCpBcUeAnxDTR">
      <div class="zttl f-thide">添加到歌单</div>
    </div>
    <div class="zcnt">
      <div class="lyct lyct-1 m-favgd f-cb">
        <div class="tit j-flag" id="auto-id-2vXGM3dVdFLAkXqu"><i class="u-icn u-icn-33"></i>新歌单</div>
        <div class="j-flag" id="auto-id-uatXCU0BtAWQ5vm5">
          <ul>
            <li data-id="2056817752" class="xtag " v-for="(item,index) in playlist" :key="index" @click="addToCollection(item)">
              <div class="item f-cb">
                <div class="left"><a href="javascript:void(0)" class="avatar" target="_blank">
                    <img alt="" :src="item.img|imageFilter"></a></div>
                <p class="name f-thide"><a class="s-fc0" href="javascript:void(0)" target="_blank">{{item.name}}</a></p>
                <p class="s-fc3">{{item.song_ids.length}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div><span class="zcls" title="关闭窗体" @click="show = false">×</span>
  </div>
</template>

<script>
import axiosMethod from "../../../service/axios";
import { formatImage } from '../../../service/utils'
export default {
  data() {
    return {
      show: false,
      songid: null,
      playlist: []
    }
  },
  filters: {
    imageFilter(value) {
      return formatImage(value);
    }
  },
  mounted() {
    this.$root.$on('addCollectionSong', (id) => {
      this.show = true;
      this.songid = id;
      this.getPlayList();
    });
  },
  methods: {
    getPlayList() {
      axiosMethod('/weapi/playlist/getcreateplaylist', {}, 'POST').then(res => {
        console.log(res);
        this.playlist = res.data.results
      })
    },
    addToCollection(item){
      axiosMethod('/weapi/playlist/addCollection',{
        songid:this.songid,
        playlistid:item.id
      },'POST').then(res=>{
        console.log(res);
        if(res.data.code == 200){
          this.show = false;
        }
      })
    }
  }
}
</script>
<style>
@import url("./collection.css");
</style>