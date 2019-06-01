<template>
  <div class="m-top">
    <div class="wrap f-cb">
      <h1 class="logo">
        <a href="javascript:;" hidefoucus="true"></a>
      </h1>
      <ul class="m-nav">
        <li>
          <span> <a href="javascript:;"> 发现音乐 </a></span>
        </li>
        <li>
          <span> <a href="javascript:;">我的音乐 </a> </span>
        </li>
        <li>
          <span> <a href="javascript:;"> 朋友</a></span>
        </li>
        <li>
          <span> <a href="javascript:;">商城</a></span>
        </li>
        <li>
          <span> <a href="javascript:;">音乐人</a></span>
        </li>
      </ul>
      <div class="m-search">
        <div class="srchbg">
          <i class="srch-btn"></i>
          <input type="text" placeholder="音乐/视频/电台/用户" id="srch"/>
        </div>
      </div>
      <a href="javascript:;" class="m-creator-center" >创作者中心</a>
      <div class="m-tophead">
        <div class="head">
          <img src="../../../default/default.png" alt="">
          <a href="javascript:;" class="creator-center"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "header"
};
</script>
<style>
@import url("./header.css");
</style>


