<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
    <keep-alive>
      <player></player>
    </keep-alive>
  </div>
</template>

<script>
import headerTop from '../src/components/header/header'
import player from '../src/components/player/player'
export default {
  components: {
    headerTop,
    player
  }
}
</script>

<style>
</style>
