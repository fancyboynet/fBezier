/*!
 * fBezier 0.0.1 2014-10-29
 * Copyright 2014 Fancy
 * http://fancyboy.net/
 */
(function(g){
	if(g.fBezier){
		return;
	}
	var fBezier = function(opt){
		var extend = function (to, from) {
			for (var key in from) {
				if (!from.hasOwnProperty(key)) {
					continue;
				}
				to[key] = from[key];
			}
			return to;
		};
		var b1 = function(t, p1, p2){
			return (1 - t) * p1 + t * p2;
		};
		var b2 = function(t, p1, c1, p2){
			return Math.pow(1 - t, 2) * p1 + 2 * (1 - t) * t * c1 + Math.pow(t, 2) * p2;
		};
		var b3 = function(t, p1, c1, c2, p2){
			return Math.pow(1 - t, 3) * p1 + 3 * Math.pow(1 - t, 2) * t * c1  + 3 * (1 - t) * Math.pow(t, 2) * c2 + Math.pow(t, 3) * p2;
		};

		var initOpt = {
			from : null,
			to : null,
			ctrls : [],
			duration : 1000,
			fps : 60,
			onUpdate : function(x, y){},
			onComplete : function(){}
		};

		var Bezier = function(opt){
			this._init(opt);
		};

		extend(Bezier.prototype, {
			_init : function(opt){
				opt = extend(initOpt, opt);
				var t = 0;
				var spf = 1000 / opt.fps;
				var step = function(){
					if(t <= 1){
						switch (opt.ctrls.length){
							case 0 :
								opt.onUpdate(b1(t, opt.from[0], opt.to[0]), b1(t, opt.from[1], opt.to[1]));
								break;
							case 1 :
								opt.onUpdate(b2(t, opt.from[0], opt.ctrls[0][0], opt.to[0]), b2(t, opt.from[1], opt.ctrls[0][1], opt.to[1]));
								break;
							case 2 :
								opt.onUpdate(b3(t, opt.from[0], opt.ctrls[0][0], opt.ctrls[1][0], opt.to[0]), b3(t, opt.from[1], opt.ctrls[0][1], opt.ctrls[1][1], opt.to[1]));
								break;
						}
						if(t === 1){
							opt.onComplete();
							return;
						}
						t  = Math.min(t + spf / opt.duration, 1);
						setTimeout(step, spf);
					}
				};
				step();
				return this;
			}
		});
		return new Bezier(opt);
	};
	if (typeof define === "function") { //AMD|CMD
		define(function(require, exports, module) {
			module.exports = fBezier;
		});
		return;
	}
	if(typeof require === 'function' && typeof exports === 'object' && typeof module === 'object'){ //CommonJS|NodeJS
		module.exports = fBezier;
		return;
	}
	g.fBezier = fBezier; //normal
})(this);