fBezier
======
 
javascript版实现贝塞尔曲线动画插件, 支持1-3次方曲线，也就是最多两个控制点。

Simple demo
======
[http://jsfiddle.net/nczomude/](http://jsfiddle.net/nczomude/)

安装
======
```
bower install f-bezier
```
使用
======
```
fBezier({
	from : [0, 0], //起点
	to : [100, 100], //终点
	ctrls : [[10, 20], [20, 25]], //控制点,
	duration : 1000, //动画时长
	fps : 60, //每秒对应桢
	onUpdate : function(x, y){},//每桢对应回调
	onComplete : function(){} //动画结束回调
});
```
