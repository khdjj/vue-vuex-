<template>
	<div id="app">
		<header-top></header-top>
		<router-view></router-view>
	</div>
</template>

<script>
import headerTop from '../src/components/header/header'
	export default {
		components:{
			headerTop,
		}
	}
</script>

<style>

</style>
