<template>
  <div class="m-layer" v-if="show">
    <div class="zbar">
      <div class="zttl f-thide">新建歌单</div>
    </div>
    <div class="zcnt">
      <!-- 新建歌单 -->
      <div class="lyct m-crgd f-cb f-tc" id="auto-id-pTs2SUZTqEiXqN1E">
        <p>歌单名：<input type="text" class="u-txt j-flag" v-model="playListName"></p>
        <p class="tip s-fc4">可通过“收藏”将音乐添加到新歌单中</p>
        <div class="btn">
          <a href="javascript:;" class="u-btn2 u-btn2-2 u-btn2-w2 j-flag" hidefocus="true" @click.prevent="createPlayList()"><i>新 建</i></a>
          <a href="javascript:;" class="u-btn2 u-btn2-1 u-btn2-w2 j-flag" hidefocus="true" @click.prevent="showPop()"><i>取 消</i></a>
        </div>
      </div>
    </div>
    <span class="zcls" title="关闭窗体" @click="showPop()">×</span>
  </div>
</template>

<script>
import axiosMethod from '../../../service/axios';
import {getStore} from '../../../service/getStoreData'
import axios from '../../../service/axios';
export default {
  name:'playListPoop',
  data(){
    return {
      show:false,
      playListName:null,
    }
  },
  mounted(){
  },
  methods:{

    showPop(){
      this.show = !this.show;
    },
    createPlayList(){
      axiosMethod('/weapi/playlist/create',{
          userId:getStore('userId'),
          name:this.playListName
      },'POST').then(res=>{
        this.$emit('addCreatePlayList',res.data.data);
        this.showPop();
      })
    }    
  }
}
</script>
<style scoped>
@import "../../common/popWindow.css";
@import "playListPop.css";
</style>
