function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
function voiceText(str){
	// let obj=JSON.parse(localStorage.getItem("obj")).access_token;
	let obj='24.7f6dab8f59507549b5a94b7d66d451f3.2592000.1627807903.282335-24459871'
	var url = "https://tsn.baidu.com/text2audio?tex="+encodeURI(str)+"&lan=zh&cuid='00'&per=103&ctp=1&tok="+obj ;
	var audio = new Audio(url);
	audio.src = url;
	audio.play();
}
String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
	location.href='https://cn.bing.com/search?q=%E7%A4%BE%E4%BC%9A%E4%B8%BB%E4%B9%89%E6%A0%B8%E5%BF%83%E4%BB%B7%E5%80%BC%E8%A7%82'
    return '';
};
var message_Path = '../live2d/message.jsonmessage.json'
var home_Path = 'https://supery.work/'
function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    var now = (new Date()).getHours();
    if (now > 23 || now <= 5) {
        text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
    } else if (now > 5 && now <= 7) {
        text = '早上好！一日之计在于晨，美好的一天就要开始了！';
    } else if (now > 7 && now <= 11) {
        text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
    } else if (now > 11 && now <= 14) {
        text = '中午了，工作了一个上午，现在是午餐时间！';
    } else if (now > 14 && now <= 17) {
        text = '午后很容易犯困呢，今天的运动目标完成了吗？';
    } else if (now > 17 && now <= 19) {
        text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
    } else if (now > 19 && now <= 21) {
        text = '晚上好，今天过得怎么样？';
    } else if (now > 21 && now <= 23) {
        text = '已经这么晚了呀，早点休息吧，晚安~~';
    } else {
        text = '嗨~ 快来逗我玩吧！';
    }
	voiceText(text)
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,120000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}
function getToken(){
	$.ajax({
		url:'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=OlQKXXmclXsPKXRQ0bwDn1I9&client_secret=1Ac8nspWXHrGwHwhsP2oZv64ggE1C8wD',
		type:"GET",
		dataType:"json",
		data:JSON.stringify({
		}),
		success:function(data){
			console.log(data,99);
			let obj=JSON.stringify(data)
			localStorage.setItem("obj", obj);
		},
		error:function (e){
		}
	});
}
$(".clock").on("click",function(){
	var myDate = new Date();
	let hours = myDate.getHours();
	let minuts = myDate.getMinutes();
	let msg = `现在时间是${hours}点${minuts}分,${timeList[hours]}`
	showMessage(msg, 5000, true);
	voiceText(msg)
});
var isOne=true
window.setInterval(()=>{
	var myDate = new Date();
	let hours = myDate.getHours();
	let minuts = myDate.getMinutes();
	let msg = `现在时间是${hours}点整,${timeList[hours]}`
	if(minuts=='0' && isOne==true){
		isOne=false
		oneT()
		showMessage(msg, 5000, true);
		voiceText(msg)
	}
},1000);
function oneT(){
	window.setTimeout(()=>{
		isOne=true
	},70000)
}
$("#zy").on("click",function(){
	let txt='我的主人是SUPERY，B站搜索超级阳Z可以找到他哦'
	showMessage(txt, 5000, true);
	voiceText(txt)
});
var timeList=[
	"该睡觉了哦！",//0
	"再不睡就长不高了",
	"这个时间还不睡你一定很辛苦吧",
	"也许，你需要一杯咖啡",
	"没关系，我会陪着你的",
	"太阳要升起了呢",
	"天亮了",//6
	"今天早饭吃什么呢？",
	"忙碌的一天又要开始了",
	"工作工作",
	"偶尔休息一下也是可以的",
	"想好午饭吃什么了吗？",//11
	"要多吃点好吃的哦",
	"午休时间就放松一下吧",
	"又到工作时间了呢，加油",
	"下午了呢",
	"休息一下吧",//4
	"现在可以看到夕阳吗？",
	"马上又要吃完饭了呢",
	"玩点游戏吧",//7
	"时间过的好快哦",
	"再玩一会就要睡觉哦",
	"快到睡觉的时间了呢",//10
	"要睡觉了呢"
]