<template>
<div>
  <div class="m-top">
    <div class="wrap f-cb">
      <h1 class="logo">
        <a href="javascript:;" hidefoucus="true"></a>
      </h1>
      <ul class="m-nav">
        <li>
          <span>
            <a href="javascript:;">发现音乐</a>
          </span>
        </li>
        <li>
          <span>
            <a href="javascript:;">我的音乐</a>
          </span>
        </li>
        <li>
          <span>
            <a href="javascript:;">朋友</a>
          </span>
        </li>
        <li>
          <span>
            <a href="javascript:;">商城</a>
          </span>
        </li>
        <li>
          <span>
            <a href="javascript:;">音乐人</a>
          </span>
        </li>
      </ul>
      <div class="m-search">
        <div class="srchbg">
          <i class="srch-btn" @click="search()"></i>
          <input type="text" placeholder="音乐/视频/电台/用户" id="srch" v-model="searchKey">
        </div>
      </div>
      <a href="javascript:;" class="m-creator-center">创作者中心</a>
      <div class="m-tophead">
        <div class="head" v-if="isLogin">
          <img :src="userInfo.avator">
          <a href="javascript:;" class="creator-center"></a>
        </div>
        <a hidefocus="true" href="javascript:;" class="link s-fc3" data-action="login" @mouseover="show()" v-else>登录</a>
        <div class="m-tlist j-uflag" @mouseover="show()" @mouseout="hide()" >
          <!-- style="display: none;" -->
          <div class="inner">
            <ul class="f-cb">
              <li class="lb">
                <a hidefocus="true" class="itm-1" href="#" data-action="login" data-type="mobile" @click.prevent="showPop()">
                  <em>邮箱登录</em>
                </a>
              </li>
              <li class="lb">
                <a hidefocus="true" class="itm-2" href="javascript:;" target="_blank">
                  <em>微博登录</em>
                </a>
              </li>
              <li class="lb">
                <a hidefocus="true" class="itm-2" target="_blank" href="javascript:;">
                  <em>QQ登录</em>
                </a>
              </li>
            </ul>
          </div>
          <i class="arr"></i>
        </div>
      </div>
    </div>
  </div>
  <pop ref="pop" @chageStatus="changeStatus"></pop>
  </div>
</template>
<script>
import $ from 'jquery';
import pop from '../popWindows/pop';
import {mapState} from 'vuex'
export default {
  name: "header",
  data() {
    return {
      isLogin: false,
      searchKey:''
    };
  },
  components:{
    pop
  },
  computed:{
    ...mapState([
      'userInfo'
    ])
  },
  mounted(){
    console.log(this.userInfo);
  },
  methods:{
    changeStatus(){
      console.log(this.userInfo);
      console.log("changeStatus");
      this.isLogin  = !this.isLogin;
      this.isLogin && this.hide();
      !this.isLogin && this.show();
    },
    showPop(){
      this.$refs.pop.show();
    },
    show(){
      $('.m-tlist').css({
        'display':'block'
      });
    },
    hide(){
      $('.m-tlist').css({
        'display':'none'
      });
    },
    search(){
      console.log(this.searchKey);
      this.$router.push({name:"search",query:{searchKey:this.searchKey}});
    }
  }
};
</script>
<style>
@import url("./header.css");
</style> 


