<!--
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-31 10:25:06
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-31 10:25:06
 -->
<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
    <keep-alive>
      <player></player>
    </keep-alive>
   <collection-pop></collection-pop>
   <sharePop></sharePop>
   <!-- <create-playlist-pop></create-playlist-pop> -->
  </div>
</template>

<script>
import headerTop from '../src/components/header/header'
import player from '../src/components/player/player'
import collectionPop from '../src/components/collectionPop/collection'
import sharePop from '../src/components/sharePop/sharePop'
// import createPlayListPop from '../src/components/playListPop/playListPop'
export default {
  components: {
    headerTop,
    player,
    collectionPop,
    sharePop
  }
}
</script>
<style>
</style>
