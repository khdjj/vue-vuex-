<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-11 17:06:10
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 15:59:38
 -->
<template>
  <div class="n-cmt" id="comment-box">
    <div class="u-title u-title-1">
      <h3>
        <span class="f-ff2">评论</span>
      </h3>
    </div>
    <div class="m-cmmt">
      <div class="iptarea">
        <div class="head">
          <img
            :src="userInfo.avatarUrl | imageFilter"
          >
        </div>
        <div class="j-flag">
          <div>
            <div class="m-cmmtipt f-cb f-pr">
              <div class="u-txtwrap holder-parent f-pr" style="display: block;">
                <textarea
                  class="u-txt area j-flag"
                  data-type="0"
                  placeholder="评论"
                  v-model="content"
                ></textarea>
              </div>
              <div class="btns f-cb f-pr">
                <i class="icn u-icn u-icn-36 j-flag" id="auto-id-TJUU3m331fLhSCou"></i>
                <i class="icn u-icn u-icn-41 j-flag" id="auto-id-8avJnZbxxLbv8oyT"></i>
                <a
                  href="javascript:void(0)"
                  class="btn u-btn u-btn-1 j-flag"
                  id="auto-id-zqhqsM28Topgvzxy"
                  @click="publishComment()"
                >评论</a>
                <span class="zs s-fc4 j-flag">140</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cmmts j-flag">
        <h3 class="u-hd4">精彩评论</h3>
        <div class="itm" v-for="(com,index) in hotcomments" :key="index">
          <div class="head">
            <a href="javascript:;"><img :src="com.user.avatarUrl"></a>
          </div>
          <div class="cntwrap">
            <div class>
              <div class="cnt f-brk">
                <a href="javascript:;" class="s-fc7">{{com.user.nickname}}</a>
                <sup class="u-icn u-icn-84"></sup>
                ：{{com.content}}
              </div>
            </div>
            <div class="que f-brk f-pr s-fc3" v-for="(reply ,index) in com.beReplied" :key="index">
              <a class="s-fc7" href="javascript:;">
                <sup class="u-icn u-icn-84"></sup>
                {{reply.user.nickname}}
              </a>
              :{{reply.content}}
            </div>
            <div class="rp">
              <div class="time s-fc4">{{com.time | date}}</div>
              <a href="javascript:void(0)">
                <i class="zan u-icn2 u-icn2-12"></i> ({{com.likedCount}})
              </a>
              <span class="sep">|</span>
              <a href="javascript:void(0)" class="s-fc3">回复</a>
            </div>
          </div>
        </div>
        <h3 class="u-hd4">最新评论(39008)</h3>
        <div class="itm" v-for="(com,index) in newcomments" :key="index">
          <div class="head">
            <a href="javascript:;"><img :src="com.user.avatarUrl | imageFilter"></a>
          </div>
          <div class="cntwrap">
            <div class>
              <div class="cnt f-brk">
                <a href="javascript:;" class="s-fc7">{{com.user.nickname}}</a>
                <sup class="u-icn u-icn-84"></sup>
                ：{{com.content}}
              </div>
            </div>
            <div class="que f-brk f-pr s-fc3" v-for="(reply ,index) in com.beReplied" :key="index">
              <a class="s-fc7" href="javascript:;">
                <sup class="u-icn u-icn-84"></sup>
                {{reply.user.nickname}}
              </a>
              :{{reply.content}}
            </div>
            <div class="rp">
              <div class="time s-fc4">{{com.time | date}}</div>
              <a href="javascript:void(0)">
                <i class="zan u-icn2 u-icn2-12"></i> ({{com.likedCount}})
              </a>
              <span class="sep">|</span>
              <a href="javascript:void(0)" class="s-fc3">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>

<script>
import axiosMethod from "../../../service/axios";
import { formatDate } from "../../../service/core";
import {formatImage} from '../../../service/utils'
import alert from '../alert/alert'
import {mapState} from "vuex"
export default {
  name: "comment",
  props: ["type", "id"],
  mounted: function() {
    this.getComment();
    console.log(this.userInfo);
  },
  components:{
    alert
  },
  computed:{
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      hotcomments: [],
      comments: null,
      newcomments: [],
      content:''
    };
  },
  watch:{
    id(){
      this.getComment();
    }
  },
  filters:{
    date:function(val){
      return formatDate(val);
    },
    imageFilter(value){
    return formatImage(value);
    }
  },
  methods: {
    publishComment(){
      let vm = this;
      console.log(this.content);
      var com = {};
      let user = this.userInfo;
      com.beReplied = [];
      com.content = this.content;
      com.time = Number(new Date());
      com.likedCount = 0;
      com.user = user;
      this.newcomments.push(com);
      this.content  = '';
      console.log(com);
      axiosMethod('/v1//users/createComment',{
        com:com,
        id:this.id
      },'POST').then(res=>{
        console.log(res);
        if(res.data.code == 200){
          vm.$refs.alert.show("评论添加成功");
        }
      });
    },  
    getComment() {
      let self = this;
      console.log(this.id,this.type);
      axiosMethod("/discover/resource/comments", {
        id: this.id,
        type: this.type,
        offset: 0,
        limit: 20
      }).then(res => {
        self.comments = res.data;
        if (res.data.hotComments) {
          self.newcomments = res.data.comments;
          self.hotcomments = res.data.hotComments;

        } else {
          self.comments.forEach(item => {
            item.hot && self.hotcomments.push(item);
            !item.hot && self.newcomments.push(item);
          });
        }
      });
    }
  }
};
</script>


<style scoped>
@import url("comment.css");
</style>
