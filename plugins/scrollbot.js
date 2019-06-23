let scrollbot = function(e, w) {
	// e - Element
	// w - scrollbar width
	var _this = this;
	this.orgPar = document.querySelector(e);
	console.log(this.orgPar);
	// init function, if not ie 8 and below this will run
	this.init = function() {
		if (w == undefined) {
			this.sbw = 5;
		} else {
			this.sbw = w;
		}
		// scrollspeed for scroll trackpad click event
		this.scrollSpeed = 200;
		// parent content
		this.parContent = this.orgPar.innerHTML;
		this.orgPar.innerHTML = "";
		//最外层的par
		this.newPar = document.createElement("div");
		this.sbContainer = document.createElement("div");
		//最长的那根滚动条 不动
		this.scrollBarHolder = document.createElement("div");
		//跟随着滚动的滚动条
		this.scrollBar = document.createElement("div");
		//div中的内容，跟随鼠标滚动而滚动的内容
		this.inP = document.createElement("div");
		this.newPar.className = "scrollbot-outer-parent";
		this.scrollBarHolder.className = "scrollbot-scrollbar-holder";
		this.scrollBar.className = "scrollbot-scrollbar";
		this.inP.className = "scrollbot-inner-parent";
		this.newPar.style.position = "relative";
		this.newPar.style.paddingRight = this.sbw + "px";
		// this.newPar.style.zIndex = "9999999";
		this.newPar.style.height = "100%";
		this.newPar.style.overflow = "hidden";
		this.inPWidth = (this.orgPar.clientWidth - this.sbw) + "px";
		this.inP.style.cssText = "height:100%;overflow-y:auto;overflow-x:hidden;padding-right:" + (this.sbw + 20) +
			"px;width:100%;box-sizing:content-box;";
		this.inP.innerHTML = this.parContent;
		this.inP.style.height = "100%";
		this.newPar.appendChild(this.inP);
		this.scrollBarHolder.appendChild(this.scrollBar);
		this.newPar.appendChild(this.scrollBarHolder);
		this.orgPar.appendChild(this.newPar);
		this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
		this.mdown = false;
		this.customHeight = false;
		this.scrollElement = this.inP;


		this.onScroll = function(f) {
			_this.onScrollF = f
		};

		//小的滚动条
		this.sB = {
			width: _this.sbw + "px",
			height: _this.sbHeight + "%",
			position: "absolute",
			right: 0,
			top: 0,
			backgroundColor: "#444444",
			borderRadius: "15px"
		};

		//最长的滚动条
		this.sBH = {
			width: _this.sbw + "px",
			height: "100%",
			position: "absolute",
			right: 0,
			top: 0,
			backgroundColor: "#ADADAD",
			borderRadius: "15px"
		};


		//将上述的滚动条样式应用
		for (var p in this.sB) {
			this.scrollBar.style[p] = this.sB[p]
		};
		for (var p in this.sBH) {
			this.scrollBarHolder.style[p] = this.sBH[p];
		}


		//当内容滚动时，滚动条也要滚动
		this.inP.addEventListener("scroll", function() {
			_this.scrollBar.style.top = _this.inP.scrollTop * 100 / _this.inP.scrollHeight + "%";
			if ("onScrollF" in _this) {
				_this.onScrollF();
			}
		})

		this.setScroll = function(p, d) {
			
			if (d == undefined || d <= 0) d = 500;
			if (p >= _this.inP.scrollHeight - _this.inP.clientHeight) {
				p = _this.inP.scrollHeight - _this.inP.clientHeight;
			};
			var difference = p - _this.inP.scrollTop;
			var perTick = difference / d * 10;
			setTimeout(function() {
				_this.inP.scrollTop += perTick;
				if (Math.abs(p - _this.inP.scrollTop) < 5) return;
				_this.setScroll(p, d - 10);
			}, 10);
		}

		this.scrollBarHolder.onmousedown = function(e) {
			if (e.target != this) return;
			var relPos = (e.pageY - _this.scrollBarHolder.getBoundingClientRect().top) * 100 / _this.scrollBarHolder.clientHeight;
			_this.setScroll(_this.inP.scrollHeight * relPos / 100, _this.scrollSpeed);
		}

		this.scrollBar.onmousedown = function(e) {
			_this.mdown = true;
			//鼠标点击处到滚动条最上方的高
			_this.posCorrection = e.pageY - _this.scrollBar.getBoundingClientRect().top;
			//最长的那根滚动条和内容高度的比再*100
			_this.btmCorrection = _this.scrollBar.clientHeight * 100 / _this.newPar.clientHeight;
			return false;
		}
		this.orgPar.onmouseup = function() {
			_this.mdown = false;
		}
		this.orgPar.onmousemove = function(e) {
			if (_this.mdown) {
				if (document.selection) {
					document.selection.empty();
				} else {
					window.getSelection().removeAllRanges();
				}
				//鼠标移动处到内容最上方处的高
				_this.relY = e.pageY - _this.newPar.getBoundingClientRect().top;
				// (_this.relY - _this.posCorrection) * 100  为需要内容和滚动条移动的距离
				_this.pC = (_this.relY - _this.posCorrection) * 100 / _this.newPar.clientHeight;
				if (_this.pC >= 0 && (_this.pC + _this.btmCorrection) <= 100) {
					_this.scrollBar.style.top = _this.pC + "%";
					_this.inP.scrollTop = (parseFloat(_this.scrollBar.style.top)) * _this.inP.scrollHeight / 100;
				} else {
					if (_this.pC < 0 && parseFloat(_this.scrollBar.style.top) > 0) {
						_this.scrollBar.style.top = "0%";
						_this.inP.scrollTop = 0;
					}
				}
				if ("onScrollF" in _this) {
					_this.onScrollF();
				}
			} else {
				return false;
			}
		}

		this.refresh = function() {
			_this.sbHeight = _this.inP.clientHeight * 100 / _this.inP.scrollHeight;
			// if (_this.sbHeight >= 100) {
			// 	_this.scrollBarHolder.style.display = "none";
			// } else {
			// 	_this.scrollBarHolder.style.display = "block"
			// }
			_this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
			_this.sB["height"] = _this.customHeight ? _this.sB["height"] : _this.sbHeight + "%";
			if (_this.inP.scrollHeight > _this.inP.clientHeight) {
				_this.scrollBar.style.height = _this.sB.height;
			}
		}
		this.refresh();
	}

	this.destroy = function() {
		_this.orgPar.innerHTML = _this.parContent;
		_this.orgPar.style.overflow = "auto";
		_this.init = null;
	}

	function isIE() {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}

	if (!isIE() || (isIE() && isIE() < 9)) {
		_this.init();
	}
}

export{
	scrollbot
}