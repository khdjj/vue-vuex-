<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-31 15:28:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 16:19:38
 -->
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
              <router-link to="/home">发现音乐</router-link>
            </span>
          </li>
          <li>
            <span>
              <router-link to="/myMusic">我的音乐</router-link>
            </span>
          </li>
          <li>
            <span>
              <router-link to="/shareTrend">动态</router-link>
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
            <img :src="userInfo.avatarUrl |imageFilter " @mouseover="show()">
            <a href="javascript:;" class="creator-center"></a>
          </div>
          <a hidefocus="true" href="javascript:;" class="link s-fc3" data-action="login" @mouseover="show()" v-else>登录</a>
          <!-- 登录 -->
          <div class="m-tlist j-uflag" @mouseover="show()" @mouseout="hide()" v-if="!isLogin">
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
          <!-- 个人中心 -->
          <div class="m-tlist m-tlist-lged j-uflag" style="display:none" @mouseover="show()" @mouseout="hide()" v-else>
            <ul class="f-cb lb mg">
              <li><a hidefocus="true" class="itm-1" href="/user/home?id=1340338564"><i class="icn icn-hm"></i><em>我的主页</em></a></li>
              <li><a href="/msg/#/at" class="itm-2"><i class="icn icn-msg"></i><em>我的消息</em><span class="m-topmsg f-pa f-hide j-uflag"></span></a></li>
              <li><a href="/user/level" data-action="viewLevel" class="itm-2"><i class="icn icn-lv"></i><em>我的等级</em></a></li>
              <li><a href="/member" class="itm-2" data-action="bilog" data-log-action="click"><i class="icn icn-mbr"></i><em>VIP会员</em></a></li>
            </ul>
            <ul class="f-cb ltb mg">
              <li><a hidefocus="true" class="itm-2" href="/user/update"><i class="icn icn-st"></i><em>个人设置</em></a></li>
              <li><a hidefocus="true" class="itm-2" href="/login?targetUrl=%2Fst/userbasic/#/nameverify" target="_blank"><i class="icn icn-verify"></i><em>实名认证</em></a></li>
            </ul>
            <ul class="f-cb lt">
              <li><a hidefocus="true" class="itm-3" href="#" @click.prevent="logout()"><i class="icn icn-ex"></i><em>退出</em></a></li>
            </ul><i class="arr"></i>
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
import { formatImage } from '../../../service/utils'
import { removeStore } from "../../../service/getStoreData"
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: "header",
  data() {
    return {
      isLogin: false,
      searchKey: ''
    };
  },
  components: {
    pop
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  filters: {
    imageFilter(value) {
      return formatImage(value);
    }
  },
  mounted() {
    this.getUserInfo();
    console.log("userInfo");
    console.log(this.userInfo);
    console.log(this.isLogin);
    if (this.userInfo) {
      this.isLogin = true;
    }

  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    ...mapMutations([
      'LOGOUT'
    ]),
    changeStatus() {
      this.isLogin = !this.isLogin;
      this.isLogin && this.hide();
      !this.isLogin && this.show();
    },
    showPop() {
      this.$refs.pop.show();
    },
    show() {

      !this.isLogin && $('.m-tlist').css({
        'display': 'block'
      });
      this.isLogin && $('.m-tlist-lged').css({
        'display': 'block'
      });
    },
    hide() {
      !this.isLogin && $('.m-tlist').css({
        'display': 'none'
      });
      this.isLogin && $('.m-tlist-lged').css({
        'display': 'none'
      });
    },
    search() {
      this.$router.push({ name: "search", query: { searchKey: this.searchKey } });
    },
    logout() {
      this.LOGOUT();
      this.isLogin = false;
      console.log(this.isLogin);
      console.log("logout");

    }
  }
};
</script>
<style>
@import url("./header.css");
</style> 


