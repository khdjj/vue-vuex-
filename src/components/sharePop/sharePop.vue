<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-16 15:25:33
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-17 20:56:20
 -->
<template>
  <div class="auto-1571210610826 m-layer z-show" style="top: 103px; left: 251px;display:block" v-if="show">
    <div class="zbar" id="auto-id-JBH1RVSOloBPk319">
      <div class="zttl f-thide">分享</div>
    </div>
    <div class="zcnt">
      <div class="lyct lyct-1 f-cb" id="auto-id-Nld67dah8EVhCwCO">
        <div class="m-lyshare">
          <ul class="m-tabs1 j-flag">
            <li id="auto-id-bx3Rc7XTR9l7iPBe" class="z-slt"><a href="#"><em>分享给大家</em></a></li>
          </ul>
          <div class="j-slogan"></div>
          <div class="u-txtwrap f-pr">
            <textarea class="u-txt area j-flag" v-model="content" placeholder="说点什么吧" data-action="txt" id="auto-id-Xd2KZbedDkaIVwCa"></textarea>
            <div class="info f-pr j-flag z-dis" data-action="search"><i class="highlight"></i>
              <div class="text f-fl f-fs1">
                <p class="f-thide">{{type}}：{{data.title}}</p>
              </div>
            </div>
          </div>
          <div class="f-cb j-flag" style="">
            <div class="f-pr choose f-cb" style="">
              <ul class="pics f-pr f-cb j-flag">
                <li v-for="(img,index) in imgList" :key="index" class="pic f-pr z-fail" id="auto-id-AWCFt2CFMPAh2tRL" style="position: relative;" @mouseover="showDel($event)" @mouseout="hideDel($event)">
                  <img class="f-img" :src="img.src | imageFilter" draggable="false">
                  <span class="del f-pa u-icn2 u-icn2-delimg" title="删除" id="auto-id-lFP08ZA21yFKt8qF"></span></li>
                <li class="f-pr add j-flag u-icn2 u-icn2-addimg" title="添加新图片" id="auto-id-DyGsJ2lomO587ABX">
                  <input type="file" id="uploadImg" @change="upload($event)" />
                </li>
              </ul>
            </div>
          </div>
          <div class="f-cb">
            <div class="btnwrap f-fl">
              <a class="u-btn2 u-btn2-2 u-btn2-w2 j-flag" hidefocus="true" href="javascript:;" data-action="share" @click="share()"><i>分享</i></a>
              <a class="u-btn2 u-btn2-1 u-btn2-w2 j-flag" hidefocus="true" href="javascript:;" data-action="close"><i>取消</i></a>
            </div>
          </div>
          <div class="u-err j-flag" style="display: none;"><i class="u-icn u-icn-25"></i><span></span></div>
        </div>
      </div>
    </div><span class="zcls" title="关闭窗体" id="auto-id-kKTbvpkMdcu6DKxG" @click="show = false">×</span>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import { formatImage } from '../../../service/utils'
import axiosMethod from "../../../service/axios";
import { formatArtist } from "../../../service/core";
import { mapState } from 'vuex'
export default {
  data() {
    return {
      imgList: [],
      show: false,
      type: '',
      data: null,
      content: null
    }
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
    var vm = this;
    this.$root.$on('shareEvent', function(type, rs){
      vm.data = null;
      vm.show = true;
      vm.type = type;
      let d = {};
      if (type == "单曲") {
        d.name = formatArtist(rs.artist_names);
        d.title = rs.song_name;
        d.id = rs.song_id;
        d.image = rs.album_img;
      } else if (type == "歌单") {
        d.title = rs.name;
        d.name = rs.creator;
        d.id = rs.id;
        d.image = rs.img;
      }
      vm.data  = JSON.parse(JSON.stringify(d));
    });
  },
  methods: {
    share() {
      var vm = this;
      console.log(this.userInfo);
      axiosMethod('/weapi/share/create', {
        userInfo: {
          userId: this.userInfo.userId,
          nickname: this.userInfo.nickname || '未命名用户',
          avatarUrl: this.userInfo.avatarUrl
        },
        content: this.content,
        imgList: this.imgList,
        type: this.type,
        shareContent: {
          id: this.data.id,
          title: this.data.title,
          name: this.data.name,
          image:this.data.image
        },
        type: this.type
      }, 'POST').then(res => {
        console.log(res);
        if (res.data.code == 200) {
          vm.show = false;
          alert("分享成功");
          vm.imgList = [];
          vm.content = '';
        }
      });
    },
    upload(e) {
      var img = e.target.files[0];
      let data = new FormData();
      data.append("file", img);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var vm = this;
      axios
        .post("http://localhost:8001/weapi/upload/share/img", data, config)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res);
            var imgsrc = res.data.src;
            vm.imgList.push({ src: imgsrc });
            console.log(vm.imgList);
          }
        });
    },
    showDel(e) {
      var target = e.target;
      $(target).siblings().addClass('show');
    },
    hideDel(e) {
      var target = e.target;
      $(target).siblings().removeClass('show');
    }
  }
}
</script>
<style>
@import "../popWindows/pop.css";
@import "./sharePop.css";
</style>