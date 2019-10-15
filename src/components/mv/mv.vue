<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-14 15:08:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 20:51:58
 -->
<template>
  <div>
    <header-top></header-top>
    <div class="g-mn4c">
      <div class="g-wrap6">
        <div class="n-mv">
          <div class="title f-cb">
            <h2 class="f-ff2 f-thide" id="flag_title1" :title="songname">
                <i class="f-fl tag u-icn2 u-icn2-mvtag"></i>{{songname}}</h2>
            <span class="name">
              <a href="/artist?id=9548" class="s-fc7" :title="artist" data-res-action="bilog" data-log-action="click" data-log-json="{&quot;page&quot;:&quot;mvplay&quot;,&quot;type&quot;:&quot;intoPersonalPage&quot;,&quot;id&quot;:418026,&quot;sourceid&quot;:9548}">{{artist}}</a> </span>
          </div>
          <div class="mv">
              <video :src="videoSrc" controls></video>
          </div>
        </div>
      </div>
     <comment type = "mvComment" :id="id"></comment>
    </div>
  </div>
</template>

<script>
import headerTop from "../header/header"
import comment from "../comment/comment"
import axiosMethod from "../../../service/axios";
export default {
    data(){
        return{
            videoSrc:'',
            artist:'',
            songname:'',
            id:''
        }
    },
    components:{
        headerTop,comment
    },
    mounted(){
        this.artist = this.$route.query.artist;
        this.songname = this.$route.query.name;
        this.id = this.$route.query.id;
        console.log(this.artist,this.songname,this.id);
        this.getMVUrl(this.id);
    },
    methods:{
        getMVUrl(id){
          var vm = this;
          axiosMethod('/discover/song/play/mv/url',{
            id:id
          },'POST').then(res=>{
            console.log(res);
            if(res.data.code == 200){
              vm.videoSrc = res.data.url;
            }
          });
        }
    }
}
</script>

<style>
.prev, .next, .ply, .mv, .icn-add, .icn-share, .icn-vol, .icn-list, .icn-shuffle {
    background: #eee;
}
.g-mn4c {
    margin: 0 auto;
    width: 71%;
}
.g-wrap6 {
    padding: 47px 30px 40px 39px;
}
.n-mv {
    margin-top: -23px;
}
.mv video{
  width:100%;
  height:100%;
}
.n-mv .title {
    padding-top: 10px;
    margin-bottom: 8px;
}
.n-mv .title h2 {
    float: left;
    max-width: 100%;
    margin-top: -10px;
    margin-right: 8px;
    font-size: 24px;
    line-height: 32px;
    font-weight: normal;
}
.n-mv .mv {
    width: 782px;
    height: 372px;
    background-color: #2e2e2e;
    font-size: 0;
    line-height: 0;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.f-ff2 {
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.n-mv .title h2 .tag {
    margin: 7px 5px auto auto;
}

.u-icn, .u-icn2, .u-icn3 {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn2 {
    background: url(https://s2.music.126.net/style/web2/img/icon2.png?b9593913daf11cda5c77c20c7a741433) no-repeat 0 9999px;
}
.u-icn2-mvtag {
    width: 29px;
    height: 18px;
    background-position: -230px -480px;
}
.n-mv .title .name, .n-mv .title .back {
    float: left;
    margin: 4px 0 0 0;
    line-height: 17px;
}
</style>