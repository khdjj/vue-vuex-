<template>
  <div class="m-layer z-show">
    <div class="zbar">
      <div class="zttl f-thide" v-if="isLogin">邮箱帐号登录</div>
      <div class="zttl f-thide" v-if="isRegister">注册</div>
    </div>
    <div class="zcnt">
      <div class="lyct lyct-1">
        <div class="n-log2 n-log2-2">
          <div class="j-mob">
            <div class="u-phonewrap">
              <div class="txtwrap">
                <input
                  type="text"
                  name="p"
                  id="p"
                  class="j-phone txt u-txt"
                  placeholder="请输入邮箱"
                  autocomplete="off"
                  v-model="email"
                >
              </div>
            </div>
          </div>
          <div class="f-mgt10">
            <input
              type="password"
              name="pw"
              id="pw"
              class="j-pwd u-txt"
              placeholder="请输入密码"
              autocomplete="new-password"
              v-model="pwd"
            >
          </div>
          <div class="f-mgt10" v-if="isRegister">
            <input type="text" name="code" id="code" class="j-code u-txt" placeholder="请输入验证码" v-model="code">
            <span class="verification_code">发送验证码</span>
            <span class="msg" v-if="hint" >{{hint}}</span>
          </div>
          <div class="j-err u-err" style="display:none;">
            <i class="u-icn u-icn-25"></i>
            <span></span>
          </div>
          <div class="f-mgt10" v-if="isLogin">
            <label class="s-fc3">
              <input type="checkbox" checked="checked" class="j-auto u-auto">自动登录
            </label>
            <a href="#" class="f-fr s-fc3" data-action="forget" style="padding-top:2px;">忘记密码？</a>
          </div>
          <div class="f-mgt20">
            <a
              class="j-primary u-btn2 u-btn2-2"
              hidefocus="true"
              href="#"
              data-action="login"
              v-if="isLogin"
              @click.prevent="login()"
            >
              <i>登 录</i>
            </a>
            <a
              class="j-register u-btn2 u-btn2-2"
              hidefocus="true"
              href="#"
              data-action="login"
              v-if="isRegister"
              @click.prevent="register()"
            >
              <i>注册</i>
            </a>
          </div>
        </div>
        <div class="js-btmbar n-loglink2 f-cb">
          <div v-if="isLogin">
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2 u-mlg2-wx"></a>
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2 u-mlg2-qq"></a>
            <a href="javascript:;" data-action="reg" class="f-fr" @click.prevent="registerAction()">没有帐号？免费注册&nbsp;&nbsp;&gt;</a>
          </div>
          <div v-else>
            <a href="javascript:;" data-action="select" class="f-fl u-mlg2" style="color: blue;width:120px" @click.prevent="register()">&lt;&nbsp;返回登录</a>
          </div>
        </div>
      </div>
    </div>
    <span class="zcls" title="关闭窗体" @click="hide()">×</span>
  </div>
</template>
<script>
export default {
  name: "pop",
  data() {
    return {
      isLogin: true,
      isRegister: false,
      hint:null,
      email:null, //邮箱
      pwd:null, //密码
      code:null //验证码
    };
  },
  methods:{
    show(){
      console.log("show");
      document.getElementsByClassName('m-layer')[0].style.display = "block";
    },
    hide(){
      document.getElementsByClassName('m-layer')[0].style.display = "none";
    },
    registerAction(){
      this.isRegister = !this.isRegister;
      this.isLogin = !this.isLogin;
    },
    login(){

    },
    register(){
      const EMAIL_REGEX = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      console.log("register");
      if(!this.email){
        this.hint = "邮箱未填写";
        return;
      }
      if(!this.pwd && this.pwd.length<6){
        this.hint = "密码必须且必须大于6位";
        return;
      }
      if(!this.code){
        this.hint = "验证码未填写";
        return;
      }
      if(!EMAIL_REGEX.test(this.email)){
        this.hint = "邮箱格式错误";
      }
      
    }
  }
};
</script>

<style scoped >
@import url("./pop.css");
</style>

