<template>
  <div class="m-layer z-show">
    <div class="zbar">
      <div class="zttl f-thide" v-if="isLogin">邮箱帐号登录</div>
      <div class="zttl f-thide" v-if="isRegister">注册</div>
      <div class="zttl f-thide" v-if="isRegisterSucc">编辑个人资料</div>
    </div>
    <div class="zcnt">
      <!-- 注册 -->
      <div class="lyct lyct-1" v-if="!isRegisterSucc">
        <div class="n-log2 n-log2-2">
          <div class="j-mob">
            <div class="u-phonewrap">
              <div class="txtwrap">
                <input type="text" name="p" id="p" class="j-phone txt u-txt" placeholder="请输入邮箱" autocomplete="off" v-model="email" />
              </div>
            </div>
          </div>
          <div class="f-mgt10">
            <input type="password" name="pw" id="pw" class="j-pwd u-txt" placeholder="请输入密码" autocomplete="new-password" v-model="pwd" />
          </div>
          <div class="f-mgt10" v-if="isRegister">
            <input type="text" name="code" id="code" class="j-code u-txt" placeholder="请输入验证码" v-model="code" />
            <span class="verification_code" @click="getCapchas()" v-if="send">发送验证码</span>
            <span class="verification_code" v-else>重新发送({{this.time}})</span>
            <span class="msg" v-if="hint">{{hint}}</span>
          </div>
          <div class="j-err u-err" style="display:none;">
            <i class="u-icn u-icn-25"></i>
            <span></span>
          </div>
          <div class="f-mgt10" v-if="isLogin">
            <label class="s-fc3">
              <input type="checkbox" checked="checked" class="j-auto u-auto" />自动登录
            </label>
            <a href="#" class="f-fr s-fc3" data-action="forget" style="padding-top:2px;">忘记密码？</a>
          </div>
          <div class="f-mgt20">
            <a class="j-primary u-btn2 u-btn2-2" hidefocus="true" href="#" data-action="login" v-if="isLogin" @click.prevent="login()">
              <i>登 录</i>
            </a>
            <a class="j-register u-btn2 u-btn2-2" hidefocus="true" href="#" data-action="login" v-if="isRegister" @click.prevent="register()">
              <i>注册</i>
            </a>
          </div>
        </div>
        <div class="js-btmbar n-loglink2 f-cb">
          <div v-if="isLogin">
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2 u-mlg2-wb"></a>
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2 u-mlg2-qq"></a>
            <a href="javascript:;" data-action="reg" class="f-fr" @click.prevent="registerAction()">没有帐号？免费注册&nbsp;&nbsp;&gt;</a>
          </div>
          <div v-else>
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2" style="color: blue;width:120px" @click.prevent="registerAction()">&lt;&nbsp;返回登录</a>
          </div>
        </div>
      </div>
      <!-- 注册成功后填写资料 -->
      <div v-if="isRegisterSucc" class="g-update per_update">
        <form id="update_form">
          <div class="n-base f-cb">
            <div class="frm m-frm">
              <div class="itm">
                <label class="lab">昵称：</label>
                <input type="text" class="u-txt txt" id="nickname" maxlength="30" v-model="nickname" @blur="nicknameisRepeat()" />
                <div class="u-err" style="display:none;" id="err">
                  <span>昵称已存在！</span>
                </div>
              </div>
              <div class="itm f-cb">
                <label class="lab">介绍：</label>
                <div class="u-txtwrap f-pr">
                  <textarea class="u-txt area" id="signature" v-model="desc"></textarea>
                  <span class="zs s-fc2" id="remain">300</span>
                </div>
              </div>
              <div class="itm f-cb">
                <label class="lab">性别：</label>
                <div class="f-cb">
                  <label class="check">
                    <input name="gender" type="radio" class="u-rdi" value="男" v-model="sex" /> 男
                  </label>
                  <label class="check">
                    <input name="gender" type="radio" class="u-rdi" value="女" v-model="sex" /> 女
                  </label>
                </div>
              </div>
              <div class="itm ft">
                <a class="pop_btn" hidefocus="true" href="#" data-action="save" @click.prevent="improve()">
                  <i>保 存</i>
                </a>
                <a class="pop_btn cancel_btn" hidefocus="true" href="#" data-action="cancel" @click="cancel()">
                  <i>取 消</i>
                </a>
              </div>
            </div>
            <div class="pop_avatar f-pr">
              <img :src="imgsrc" id="avatar" />
              <span class="btm"></span>
              <a href="javascript:;" class="upload" id="upload">
                <input type="file" class="addTofile" @change="upload($event)"/>更换头像
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <span class="zcls" title="关闭窗体" @click="hide()">×</span>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
import axiosMethod from "../../../service/axios";
import alert from "../alert/alert";
import axios from "axios";
import {mapMutations} from "vuex";
import {setStore} from '../../../service/getStoreData'
export default {
  name: "pop",
  components: {
    alert
  },
  data() {
    return {
      isLogin: true,
      isRegister: false,
      hint: null,
      email: null, //邮箱
      pwd: null, //密码
      code: null, //验证码
      send: true, //是否发送验证码
      time: 120, //等待秒数
      nickname: null,
      oldnickname: null,
      desc: null, //个人描述
      sex: null, //性别
      updateavatar: null, //上传图像值
      userId:null,
      imgsrc:
        "http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180",
      isRegisterSucc: false,
      EMAIL_REGEX: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ //邮箱验证正则表达式
    };
  },
  mounted() {
  },
  methods: {
    ...mapMutations([
      'SAVE_USER'
    ]),
    /**
     * 上传图片,当文件改变时,将图片上传
     */
    upload(e) {
        var input = e.currentTarget;
        this.$refs.alert.show("正在上传，请稍候");
        let data = new FormData();
        data.append("file", input.files[0]);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios
          .post("http://localhost:8001/v1//users/avatar", data, config)
          .then(res => {
            if (res.data.code == 200) {
              this.imgsrc = "http://localhost:8001/img/" + res.data.url;
              this.$refs.alert.show("上传成功");
            }
          });
    },

    login(){
        axiosMethod('/v1/users/login',{
          email:this.email,
          pwd:this.pwd
        },'POST').then(res=>{
          let data = res.data;
          if(data.code == 200){
            var token = data.token;
            setStore("Authorization",token);
            this.SAVE_USER(data.userData);
            this.$emit('chageStatus');
            this.hide();
          }
        })
    },
    /**
     * 检查用户填写的昵称是否已存在
     */
    nicknameisRepeat() {
      let self = this;
      if (this.nickname) {
        axiosMethod("/v1/search/nickname", {
          nickname:this.nickname
        }).then(res => {
          if (res.status == 0) {
            self.oldnickname = self.nickname;
            self.$refs.alert.show("对不起，用户名已存在，请重新输入");
          }
        });
      }
    },
    //显示此pop组件
    show() {
      document.getElementsByClassName("m-layer")[0].style.display = "block";
    },
    //隐藏此pop组件
    hide() {
      this.reset();
      document.getElementsByClassName("m-layer")[0].style.display = "none";
    },
    //是否是注册行为，如果是，则将登录隐藏
    registerAction() {
      this.reset();
      this.isRegister = !this.isRegister;
      this.isLogin = !this.isLogin;
    },


    //重置所有填写信息
    reset() {
      this.hint = null;
      this.email = null;
      this.pwd = null;
      this.code = null;
    },
    //注册后填写具体信息
    improve() {

      let _self = this;
      this.desc = this.desc || null;
      this.sex = this.sex || null;
      axiosMethod("/v1/users/improve", {
          nickname: this.nickname,
          desc: this.desc,
          sex: this.sex
        },"POST").then(res => {
          this.$refs.alert.show(res.data.msg);
          if (res.data.code == 200) {
            this.reset();
            this.$refs.alert.show(res.data.msg);
            this.isRegister = false;
            this.isLogin = true;
            this.isRegisterSucc = false;
            this.login();
          }
        });
    },
    /**
     * 注册方法
     */
    async register() {

      // if (this.nickname != null && this.nickname == this.oldnickname) {
      //   this.$refs.alert.show("对不起，此用户名已存在，请重新填写");
      //   return;
      // }
      if (!this.email) {
        this.hint = "邮箱未填写";
        return;
      }
      if (!this.pwd && this.pwd.length < 6) {
        this.hint = "密码必须且必须大于6位";
        return;
      }
      if (!this.code) {
        this.hint = "验证码未填写";
        return;
      }
      if (!this.EMAIL_REGEX.test(this.email)) {
        this.hint = "邮箱格式错误";
        return;
      }
      axiosMethod("/v1/register", {
        email: this.email,
        pwd: this.pwd,
        code: this.code
      }).then(res => {
        this.$refs.alert.show(res.data.msg);
        if (res.data.code == 200) {
          this.reset();
          this.userId = res.data.userId;
          this.isRegister = false;
          this.isLogin = false;
          this.isRegisterSucc = true;
        }
      });
    },
    /**
     * 获取验证码
     */
    getCapchas() {
      if (!this.EMAIL_REGEX.test(this.email)) {
        this.hint = "邮箱格式错误";
        return;
      }
      clearInterval(timer);
      this.send = false;
      axiosMethod("/v1/getCaptchas", {
        email: this.email
      }).then(res => {
          this.$refs.alert.show(res.data.msg);
        if (res.data.code == 200) {
          this.hint = res.data.msg;
        }
      });
      let timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          this.time = 120;
          this.hint = null;
          clearInterval(timer);
          this.send = true;
        }
      }, 1000);
    },
    cancel() {
      this.isLogin = true;
      this.isRegister = false;
      this.isRegisterSucc = false;
    }
  }

};
</script>

<style scoped >
@import url("./pop.css");
</style>

