<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-28 19:51:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-13 11:30:32
 -->
<template>
  <div id="modifyPlayList">
    <div class="g-mn3 f-pr j-flag">
      <div class="g-wrap" id="auto-id-LTTwtRlAxobtrl5x">
        <div>
          <div class="u-bread1"><a href="javascript:;" @click.prevent="$router.go(-1);" class="s-fc7">返回</a>
            <span class="arr s-fc4">&gt;</span><b class="f-fw1">编辑歌单</b></div>
          <div class="n-base f-cb">
            <div class="frm frm-1 m-frm m-frm-1">
              <div class="itm"><span class="must s-fc6">*</span><label class="lab">歌单名：</label>
                <input type="text" class="u-txt txt j-flag" id="auto-id-qzlmTIrUzatkcJob" v-model="playListName">
                <div class="u-err f-vhide j-flag"><i class="u-icn u-icn-25"></i></div>
              </div>
              <div class="itm"><label class="lab">标签：</label>
                <div class="f-cb tags">
                  <span class="j-flag">
                    <a :data-value="item" class="u-tag u-tag-1" href="javascript:void(0)" v-for="(item,index) in label" :key="index">
                      <i>{{item}}<em data-action="delete" @click="deleteLabel(item)">×</em></i>
                    </a>
                  </span>
                  <a @click="showLabel()" href="javascript:void(0)" class="cho s-fc7">选择标签</a></div>
                <div class="s-fc4 tagnote">选择适合的标签，最多选3个</div>
              </div>
              <div class="itm f-cb"><label class="lab">介绍：</label>
                <div class="u-txtwrap f-pr"><textarea class="u-txt area j-flag" id="auto-id-NUzdnOPBBuJ0k7KP" v-model="playListDesc"></textarea><span class="zs s-fc2 j-flag">1000</span></div>
              </div>
              <div class="itm ft">
                <a data-action="save" href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-2 u-btn2-w2 u-btn2-dis j-flag" @click.prevent="savePlayList()"><i>保 存</i></a>
                <a data-action="cc" href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-w2"><i>取 消</i></a></div>
            </div>
            <div class="avatar f-pr">
              <img id="edit_cover" :src="playListImg | imageFilter">
              <span class="btm">编辑封面</span>
              <input type="file" class="upload" @change="showCoverImg($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <label-pop ref="label" @selectLabel="selectLabel"></label-pop>
    <alert ref="alert"></alert>
  </div>
</template>

<script>
import labelPop from '../label/labelPop'
import axios from 'axios'
import alert from '../../components/alert/alert'
import { mapState,mapMutations } from 'vuex'
import { formatImage } from '../../../service/utils'
export default {
  name: 'modifyPlayList',
  components: {
    labelPop, alert
  },
  data() {
    return {
      playListImg: null,
      playListId: null,
      playListName: null,
      label: null,
      playListDesc: ''
    }
  },
  computed: {
    ...mapState([
      'imgBaseUrl', 'HOST','modifyPlayList','myCreatePlayList'
    ])
  },
  filters: {
    imageFilter(value) {
      return formatImage(value);
    }
  },
  mounted() {
    console.log(this.$route.query.img);
    console.log(this.$route.query.value);
    this.playListImg = this.$route.query.img;
    this.playListName = this.$route.query.name;
    this.playListId = this.$route.query.id;
  },
  methods: {
    ...mapMutations([
      'SAVE_CREATPLAYLIST','SAVE_MODIFYPLAYLIST'
    ]),
    showLabel() {
      this.$refs.label.showPop();
    },
    selectLabel(select) {
      console.log(select);
      this.label = select;
    },
    deleteLabel(item) {
      console.log(item);
      for (let i = 0; i < this.label.length; i++) {
        if (this.label[i] == item) {
          this.label.splice(i, 1);
          break;
        }
      }
      console.log(this.label);
    },
    showCoverImg(e) {
      var target = e.target;
      $('#edit_cover').attr('src', window.URL.createObjectURL(target.files[0]));
    },
    savePlayList() {
      var img = $('.upload')[0].files[0];
      console.log(this.playListName);
      let data = new FormData();
      data.append("file", img);
      data.append("id", this.playListId);
      data.append("name", this.playListName);
      data.append("desc", this.playListDesc);
      data.append("label", this.label);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let self = this;
      axios
        .post('http://localhost:8001/weapi/playlist/update', data, config)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            console.log("修改歌单成功");
            let data = self.modifyPlayList;
            data.desc = self.playListDesc;
            data.name = self.playListName;
            data.label = self.label;
            data.img = res.data.imgpath;
            let clist = self.myCreatePlayList;
            let index = clist.indexOf(self.modifyPlayList);
            console.log(index);
            self.SAVE_MODIFYPLAYLIST(data);
            if(index != -1){
              clist.slice(index,1,data);
            }
            console.log(clist);
            self.SAVE_CREATPLAYLIST(clist);
            self.$router.go(-1);//返回上一层
          }
        });
    }
  }
}
</script>

<style scoped>
@import url("./modify.css");
</style>
