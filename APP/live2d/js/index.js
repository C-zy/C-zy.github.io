// 移动端适配
(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window); 

// time
var myhour, myminute, mysecond;

function flipNumber(el, newnumber) {
  var thistop = el.find(".top").clone();
  var thisbottom = el.find(".bottom").clone();
  thistop.addClass("new");
  thisbottom.addClass("new");
  thisbottom.find(".text").text(newnumber);
  el.find(".top").after(thistop);
  el.find(".top.new").append(thisbottom);
  el.addClass("flipping");
  el.find(".top:not(.new)").find(".text").text(newnumber);
  setTimeout(function () {
    el.find(".bottom:not(.new)").find(".text").text(newnumber);
  }, 500);
}
function setTime() {
  $(".flipper").removeClass("flipping");
  $(".flipper .new").remove();
  var date = new Date();
  var seconds = date.getSeconds().toString();
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  var minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  var hour = date.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  hour = hour.toString();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  if ($(myhour[0]).text() !== hour) {
    flipNumber($(myhour[0]).closest(".flipper"), hour);
  }
  if ($(myminute[0]).text() !== minutes) {
    flipNumber($(myminute[0]).closest(".flipper"), minutes);
  }
  if ($(mysecond[0]).text() !== seconds) {
    flipNumber($(mysecond[0]).closest(".flipper"), seconds);
  }
  setTimeout(function () {
    setTime();
  }, 500);
}

$(function () {
  myhour = $(".clock .flipper:nth-child(1) div:not(.new) .text");
  myminute = $(".clock .flipper:nth-child(2) div:not(.new) .text");
  mysecond = $(".clock .flipper:nth-child(3) div:not(.new) .text");
  setTime();
});
// zy
let orientation=0
orientation=screen.orientation
window.addEventListener('orientationchange', ()=>{
	orientation=screen.orientation
	isReversal()
}, true);
function isReversal(){
	if(orientation.angle=='0'){
		// alert('竖屏')
		$(".timeBoxL").removeClass("timeBoxL");
		$(".waifuL").removeClass("waifuL");
	}else{
		// alert('向左')
		$(".timeBox").addClass("timeBoxL");
		$(".waifu").addClass("waifuL");
	}
}
isReversal()
// 进入后全屏显示
function requestFullScreen(element) {
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	if (requestMethod) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") {
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}
$('body').click(function () {
   requestFullScreen(document.documentElement);
})