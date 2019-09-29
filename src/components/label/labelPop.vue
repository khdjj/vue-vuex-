<template>
  <div class="m-layer z-show" style="top: 75px; left: 10%;width:551px;" v-if="show">
    <div class="zbar" id="auto-id-MR0QDzpw7AqnmWEk">
      <div class="zttl f-thide">选择标签</div>
    </div>
    <div class="zcnt">
      <div id="auto-id-K2UfQmov5bwsyof9">
        <div class="lyct lyct-1 f-cb f-pr">
          <div class="m-seltags">
            <h4>选择合适的标签，最多可选3个</h4>
            <div class="tagtyp f-cb">
              <h5>语种：</h5>
              <div class="taglst">
                <ul class="f-cb">
                  <li  v-for="(item,index) in label[0]" :key="index" @click="showCheck($event)" :data-name="item">
                    <a href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-sm">
                      <i>{{item}}</i>
                    </a>
                    <i class="u-icn u-icn-31"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tagtyp f-cb">
              <h5>风格：</h5>
              <div class="taglst">
                <ul class="f-cb">
                  <li  v-for="(item,index) in label[1]" :key="index" @click="showCheck($event)" :data-name="item">
                    <a href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-sm">
                      <i>{{item}}</i>
                    </a>
                    <i class="u-icn u-icn-31"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tagtyp f-cb">
              <h5>场景：</h5>
              <div class="taglst">
                <ul class="f-cb">
                  <li  v-for="(item,index) in label[2]" :key="index" @click="showCheck($event)" :data-name="item">
                    <a href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-sm">
                      <i>{{item}}</i>
                    </a>
                    <i class="u-icn u-icn-31"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tagtyp f-cb">
              <h5>情感：</h5>
              <div class="taglst">
                <ul class="f-cb">
                  <li  v-for="(item,index) in label[3]" :key="index" @click="showCheck($event)" :data-name="item">
                    <a href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-sm">
                      <i>{{item}}</i>
                    </a>
                    <i class="u-icn u-icn-31"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tagtyp f-cb">
              <h5>主题：</h5>
              <div class="taglst">
                <ul class="f-cb">
                  <li  v-for="(item,index) in label[4]" :key="index" @click="showCheck($event)" :data-name="item">
                    <a href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-1 u-btn2-sm">
                      <i>{{item}}</i>
                    </a>
                    <i class="u-icn u-icn-31"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="lybt">
          <div class="lybtc">
            <a data-name="save" href="javascript:void(0)" hidefocus="true" class="u-btn2 u-btn2-2" @click.prevent="saveAndClose">
              <i>保存并关闭</i>
            </a>
          </div>
        </div>
      </div>
    </div><span class="zcls" title="关闭窗体" @click="showPop()"    id="auto-id-B9TJM7xJfppHDV1i">×</span>
  </div>
</template>
<script>
import $ from 'jquery'
import {label} from "../../common/label"
export default {
  name: 'labelPop',
  data(){
    return{
      show:false,
      label:null
    }
  },
  mounted(){
    this.label = label;
    console.log(label);
  },
  methods:{
    showPop(){
      this.show = !this.show;
    },
    //显示勾选小图标
    showCheck(e){
      var target = e.target;
      $(target).parent().siblings('i').toggleClass('z-sel');
    },
    //保存并关闭
    saveAndClose(){
      var s = $('.z-sel');
      let select = [];
      if(s.length >3){
        return;
      }
      s.each(function(item,index){
        select.push($(this).parent().attr('data-name'));
      });
      this.$emit('selectLabel',select);
      this.showPop();
    }
  }
}
</script>
<style>
@import "../../common/popWindow.css";
@import "./labelPop.css";
</style>


