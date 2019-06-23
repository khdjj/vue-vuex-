function LPlayer(e,$window) {
	if (!("music" in e && "title" in e.music && "url" in e.music && "pic" in e.music && "author" in e.music)) {
		throw "APlayer Error: Music, music.title, music.author, music.url, music.pic are required in options";
	}
	if (!("element" in e) && e.element == null) {
		throw "error!! the element is required";
	}
	let a = {
		element: $('#player'),
		autoplay: false,
		showlrc: true,
		theme: '#fff',
		isOnlyProgressBar: false,
	}
	this.options = $.extend({}, a, e);
	this._window = $window;
	this.init();
	this.initData();
	
}

export {
	LPlayer
}

/**
 * init 用于初始化数据和画面
 */

LPlayer.prototype = {


	initData: function () {
		let m = this;
		m.player = $('.player');
		m.ply.on('click', c);
		m.player.on('click', c);
		m.img = $('.p-img');


		m.options.isOnlyProgressBar && m.options.autoplay && b();

		function c() {
			if (m.playStatus == 'play') {
				m.playStatus = 'pause';
				m.ply.css({
					"background-position": "-40px -165px"
				});
				m.options.isOnlyProgressBar && b();
				m.play();
			} else {
				m.pause();
				cancelAnimationFrame(m.timer);
				m.d = 0;
				m.playStatus = 'play';
				m.ply.css({
					"background-position": "0 -204px"
				})
			}
		}
		//旋转函数
		function b() {
			m.img.css({
				"transform": "rotate(" + m.d + "deg)"
			});
			m.d += 1;
			m.timer = window.requestAnimationFrame(b);
		}
	},
	updateLrc: function () {
		let e;
		if (e || (e = this.audio.currentTime), e < this.lyrTime[this.lrcIndex] || e >= this.lyrTime[this.lrcIndex + 1]) {
			for (let i = 0; i < this.lyrTime.length; i++) {
				if (e >= this.lyrTime[i] && e < this.lyrTime[i + 1]) {
					this.lrcIndex = i;
					this.lrcContent[0].style.transform = "translateY(" + 30 * -this.lrcIndex + "px)",
						$('.aplayer-lrc-current').css({
							"color": "white",
							"font-size": "16px"
						});
					$('.aplayer-lrc-current').removeClass('aplayer-lrc-current');
					this.lrcContent.find('p').eq(i).addClass('aplayer-lrc-current');
					$('.aplayer-lrc-current').css({
						"color": this.options.theme
					});
				}
			}
		}
	},
	play: function () {
		
		this.options.autoplay && (this.playStatus = 'pause') && this.ply.css({
			"background-position": "-40px -165px"
		});
		this.audio.play();
		let e = this;
		this.playTimer = setInterval(function () {
			e.updateBar(e.audio.currentTime / e.audio.duration, "played", "width");
			e.options.isOnlyProgressBar && e.updateLrc();
			e.curTime.html(e.secondTime(e.audio.currentTime));
		}, 100);
	},
	pause: function () {
		this.audio.pause();
		clearInterval(this.playTimer);
	},
	init: function () {

		let $window = window;
		
		let m = this;
		//如果是只需要显示进度条的话，则不需要解析歌词
		if (this.options.isOnlyProgressBar) {
			this.lyrTime = new Array();
			this.lyrLine = new Array();
			let l = this.options.music.lyric,
				timeRegEx = /\[(\d{2}):(\d{2}).(\d{2,4})\]/, //获取歌词时间正则表达式
				lyricTextRegEx = /](.*)$/; //获取歌词文字的正则表达式
			l = l.split(/\n/);
			//获取歌词文件并解析
			let status = 0;
			for (let i = 0; i < l.length; i++) {
				let c = timeRegEx.exec(l[i]);
				let d = lyricTextRegEx.exec(l[i]);

				if (Object.prototype.toString.call(d) == '[object Array]' && timeRegEx.exec(d[1])) {
					l.splice(i + 1, 0, d[1]);
					d[1] = d[1].replace(/^\[(\d{2}):(\d{2}).(\d{2,4})\]/, '');
					status = 1;
				}
				//将正则表达式的结果转换成时间和歌词文字，时间统一换算成秒
				if (c && d && (this.lyrTime.push(parseInt(c[1]) * 60 + parseInt(c[2]) + parseInt(c[3]) / 1000), this.lyrLine.push(
					d[1])));
			}

			if(status){
				let strtemp, temp, i, j, len = this.lyrTime.length, k;
				for (i = 0; i < len - 1; i++) {
					k = i;
					for (j = i + 1; j < len; j++) {
						if (this.lyrTime[j] < this.lyrTime[k]) {
							k = j;
						}
					}
					temp = this.lyrTime[i], strtemp = this.lyrLine[i];
					this.lyrTime[i] = this.lyrTime[k], this.lyrLine[i] = this.lyrLine[k];
					this.lyrTime[k] = temp, this.lyrLine[k] = strtemp;
				}
			}

			let container = `<div id="container">
			<span class="closePlayer" onclick="javascript:history.back(-1);" title="返回上一级"></span>
			<div id="player" class="lplayer row">
				<div class="player_cvrwrap col-lg-4 col-lg-offset-1">
					<div class="player_u-cover">
						<div class="player_avatar">
							<div class="msk">
								<img src= ${this.options.music.pic} class="p-img" />
							</div>
						</div>
						<div class="content-operation">
							<a href="javascript:;" class="player btns" title="播放">播放</a>
							<a href="javascript:;" class="addTo btns" title="添加到播放列表">+</a>
							<a href="javascript:;" class="btns" title="收藏">收藏</a>
							<a href="javascript:;" class="btns" title="分享">分享</a>
							<a href="javascript:;" class="btns" title="下载">下载</a>
							<a href="javascript:;" class="btns" title="评论">评论</a>
						</div>
					</div>
				</div>
				<div class="lplayer-lrc-container col-lg-6 ">
					<div class="lplayer-music">
						<h1>${this.options.music.title}</h1>
						<span style=" margin-top: 16px; display: inline-block;">歌手：<span style = "color:white">${this.options.music.author}</span></span>
						<span style="margin-left: 20px;">专辑：<a href="javascript:;">${this.options.music.album}</a></span>
					</div>
					<div class="lplayer-lrc">
						<div class="lplayer-lrc-content">
						</div>
					</div>
				</div>
			</div>
		</div>`

			$('#player').prepend(container);

			//将文字信息转换成p的dom元素

			let el = '';
			this.lrcContent = $('.lplayer-lrc-content');
			this.playBar = $('.m-playbar');
			let playBarHeight = this.playBar.height();
			let windowHeight = $(window).height();
			if (this.options.showlrc) {
				for (let i = 0; i < this.lyrLine.length; i++) {
					el += "<p>" + this.lyrLine[i] + "</p>"
				}
				this.lrcContent.html(el);
				this.lrcContent.children().first().addClass('aplayer-lrc-current');
				this.lrcIndex = 0;
			}



			m.d = 0;
			$('.aplayer-lrc-current').css({
				"color": this.options.theme
			})

			$('.aplayer-lrc-current').css({
				"color": this.options.theme
			})





		}
		m.ply = $('.ply');
		m.playStatus = 'play';

		this.audioOver = true;
		$('.next').click(function(){
			this.audioOver = true;
			window.playNextSong()
		})
		$('.prev').click(function(){
			this.audioOver = true;
			window.playPrevSong();
		})

		this.loadpro = $('.m-pbar .rdy');
		this.playpro = $('.m-pbar .cur');
		this.curTime = $('.time .cur-time');
		this.thumb = $('.circle-btn');
		this.bar = $('.m-pbar');
		this.audio = document.createElement('audio');
		this.audio.src = this.options.music.url;
		this.audio.loop =this.options.loop;
		this.audio.preload = "metadata";
		this.audio.currentTime = this.options.audioCurrTime;
		this.loaded = false;
		this.playpro.css({
			"background-color": this.options.theme
		})

		this.audio.onended = function(){
			window.playNextSong();
		}

		this.audio.ondurationchange = function () {
			1 !== m.audio.duration && $('.m-pbar .time .song-time').html(m.secondTime(m.audio.duration));
		};
		this.audio.onloadedmetadata = function () {
			m.loadedTime = setInterval(function () {
				let e = m.audio.buffered.end(m.audio.buffered.length - 1) / m.audio.duration;
				m.updateBar(e, 'loaded', 'width');
				e === 1 && (this.loaded = true) && clearInterval(m.loadedTime);
				e === 1 && console.log(this.loaded);
				this.audioOver && clearInterval(m.loadedTime);
			}, 500);
		};
		this.audio.onerror = function () {
			console.log("加载失败");
		}


		//muted 为静音
		this.audio.volume = .8,
			this.volumepro = $('.m-vol .curr');
		this.vol = $('.m-vol');
		let v = 93;

		this.volStatus = "none";
		//点击音量条时触发的事件
		$('.icn-vol').on("click", function (e) {
			if (m.volStatus == "none") {
				m.vol.css({
					"display": "block"
				});
				m.volStatus = "block";
			} else if (m.volStatus == "block") {
				m.vol.css({
					"display": "none"
				});
				m.volStatus = "none";
			}
		});
		$('.vbg').on("click", function (e) {
			var a = e || window.event,
				y = $(this)[0],
				t = (v - (a.clientY - i(y))) / v;
			t = t > 0 ? t : 0,
				t = 1 > t ? t : 1,
				m.updateBar(t, "volume", "height"),
				m.audio.volume = t;

		});


		this.options.autoplay && this.play();


		this.bar.on('click', function (e) {
			let a = e || window.event;
			let w = $(this).width();
			let b = (e.clientX - t(m.bar)) / w;
			m.updateBar(b, "played", "width");
			m.curTime.html(m.secondTime(b * m.audio.duration));
			m.audio.currentTime = parseFloat(m.playpro.width() / m.bar.width()) * m.audio.duration;
		});

		this.thumb.on('mousedown', function () {
			clearInterval(m.playTimer);
			m.thumb.on('mousemove', x(event));
			m.thumb.on('mouseup', l(event));
		});

		function i(e) {
			for (var a, t = e.offsetTop, i = e.offsetParent; null !== i;)
				t += i.offsetTop,
					i = i.offsetParent;
			return a = document.body.scrollTop + document.documentElement.scrollTop, t - a
		}

		function x(e) {
			e = e || window.event;
			let i = (e.clientX - t(m.bar)) / m.bar.width();
			i = i > 0 ? i : 0,
				i = 1 > i ? i : 1,
				m.updateBar("played", i, "width"),
				m.updateLrc(parseFloat(m.playpro.width()) / 100 * m.audio.duration),
				m.curTime.html(m.secondTime(i * m.audio.duration));
		}

		function l(e) {
			m.thumb.unbind("mouseup"),
				m.thumb.unbind("mousemove"),
				m.audio.currentTime = parseFloat(m.playpro.width() / m.bar.width()) * m.audio.duration, m.play();
		}

		function t(ele) {
			let w = ele[0].offsetLeft;
			for (let t = ele[0].offsetParent; t != null;) {
				w = w + t.offsetLeft;
				t = t.offsetParent;
			}
			return w;
		}
	},
	secondTime: function (e) {
		let f = function (c) {
			return c >= 10 ? '' + c : '0' + c;
		};
		let m = parseInt(e / 60);
		let s = parseInt(e - m * 60);
		return f(m) + ":" + f(s);
	},
	updateBar: function (a, action, option) {
		a = a > 0 ? a : 0;
		a = a < 1 ? a : 1;
		let p = a * 100 + "%";
		if (action == "loaded") {
			this.loadpro.css({
				"width": p
			})
		}
		if (action == "played") {
			this.playpro.css({
				"width": p
			})
		}
		if (action == "volume") {
			this.volumepro.css({
				"height": p
			})
		}
	},
	destroy: function () {
		if (this.audio) {
			this.audio = null;
		}
	},
	changeData: function (e) {
		clearInterval(this.loadedTime)
		this.options = $.extend({}, this.options, e);
		this.audio.pause();
		this.audio = null;
		this.ply.css({
				"background-position": "0 -204px"
		})
		this.init();
		this.initData();
	},
	getAudio: function () {
		return this.audio;
	},
	getCurrTime: function () {
		return this.audio.currentTime;
	}

}
