<template>
    <div class="g-btmbar">
			<div class="m-playbar row">
				<div class="playbar-btns col-lg-2 col-lg-offset-1">
					<a href="javascript:;" class="prev" title="上一首"></a>
					<a href="javascript:;" class="ply" title="播放"></a>
					<a href="javascript:;" class="next" title="下一首"></a>
				</div>
				<div class="head j-flag col-lg-1">
					<img src="resource/许嵩.jpeg" />
					<a href="javascript:;" class="albumimg"></a>
				</div>
				<div class="play col-lg-4">
					<div class="words">
						<a href="#" class="song-name">清明雨上</a>
						<a href='#' class="mv"></a>
						<span class="by">
							<a href="#" class="artist">许嵩</a>
						</span>
					</div>
					<div class="m-pbar">
						<div class="barbg">
							<div class="rdy"></div>
						</div>
						<div class="cur">
							<span class="circle-btn"></span>
						</div>
						<span class="time">
							<em class="cur-time">00:00</em>
							<em class="song-time">00:00</em>
						</span>
					</div>
				</div>
				<div class="oper col-lg-1 col-lg-offset-2">
					<a href="javascript:;" title="收藏" class="icn icn-add"></a>
					<a href="javascript:;" title="分享" class="icn icn-share"></a>
				</div>
				<div class="ctrl col-lg-1">
					<div class="m-vol">
						<div class="barbg"></div>
						<div class="vbg">
							<div class="curr"></div>
						</div>
					</div>
					<a href="#" class="icn icn-vol" title="音量"></a>
					<a href="#" class="icn icn-shuffle" title="播放方式"></a>
					<a href="#" class="icn icn-list" title="播放列表">125</a>
					<!-- </span> -->
				</div>
			</div>
		</div>
</template>

<script>
import {LPlayer} from '../../../plugins/Lplayer'
export default {
    name:'player',
    mounted:function(){
        this.LPlayer();
    },
    methods:{
        LPlayer(){
            var ap3 = new LPlayer({
				element: $('#player'),
				autoplay: false, //是否自动播放
				showlrc: true, //是否显示歌词
				theme: '#d4b514', //主题颜色 如进度条颜色,音量的颜色
				isOnlyProgressBar: true,
				music: {
					title: '清明雨上',
					album:'清明雨上',
					author: '许嵩',
					url: 'http://m10.music.126.net/20190601162647/7eae6219247017de68cd5878a5acba2e/yyaac/0158/510e/045f/62b7941e74fdccd11b7f3513a61f4665.m4a',
					pic: 'resource/许嵩.jpeg',
					lyric:`	[00:00.10]清明雨上 - 许嵩
							[00:00.20]词：许嵩
							[00:00.30]曲：许嵩
							[00:00.40]编曲：许嵩
							[00:28.06]窗透初晓 日照西桥 云自摇
							[00:33.84]想你当年荷风微摆的衣角
							[00:41.30]木雕流金 岁月涟漪 七年前封笔
							[00:47.52]因为我今生挥毫只为你
							[00:54.47]雨打湿了眼眶 年年倚井盼归堂
							[01:01.07]最怕不觉泪已拆两行
							[01:06.93]我在人间彷徨 寻不到你的天堂
							[01:13.47]东瓶西镜放 恨不能遗忘
							[01:20.16]又是清明雨上 折菊寄到你身旁
							[01:27.20]把你最爱的歌来轻轻唱
							[01:47.48]远方有琴 愀然空灵 声声催天雨
							[01:54.08]涓涓心事说给自己听
							[02:00.66]月影憧憧 烟火几重 烛花红
							[02:07.32]红尘旧梦 梦断都成空
							[02:13.91]雨打湿了眼眶 年年倚井盼归堂
							[02:20.56]最怕不觉泪已拆两行
							[02:26.37]我在人间彷徨 寻不到你的天堂
							[02:32.95]东瓶西镜放 恨不能遗忘
							[02:39.53]又是清明雨上 折菊寄到你身旁
							[02:46.60]把你最爱的歌来轻轻唱
							[02:52.33]我在人间彷徨 寻不到你的天堂
							[02:59.41]东瓶西镜放 恨不能遗忘
							[03:06.00]又是清明雨上 折菊寄到你身旁
							[03:13.03]把你最爱的歌来轻轻唱`
				}
			});
			ap3.init();
        }
    }
}
</script>
<style>
@import url("./player.css");
</style>

