var a_ajax = function(url){
	  var xhr = new XMLHttpRequest;
	    xhr.open("GET", url, false);
	    if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain");
	    xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");
	    xhr.send(null);
	    if (xhr.status !== 200 && xhr.status !== 0) throw "XMLHttpRequest failed, status code " + xhr.status;
	    return xhr.responseText;
	}
var a_code;
var imandroid_preload_list =new Array();
window.onscroll = function(){
     //console.log(imandroid_preload_list);
     for(i in imandroid_preload_list){
        obj = imandroid_preload_list[i]
        canvas  = obj[0];
     	// pjs.externals.canvas;
     	var prec1 = getClient();
     	var prec2 = getSubClient(canvas);
     	if (intens(prec1, prec2)) {
     	 var hash =  obj[1];
     	 var w = canvas.width;
     	 var h = canvas.height;
         var pjs = new Processing(canvas,a_code);
     	 pjs.intial(hash,w,h);
     	 imandroid_preload_list.splice(i,1);
     	}else{
     	 //break;
     	}
     }
     
}
function imandroid_load(id,hash,datasrc){
    var canvas = document.getElementById(id);
   
    if(!a_code){
	 //console.log(id,a_code);
	 a_code =  a_ajax(datasrc);
    }
    imandroid_preload_list.push([canvas,hash]);
}

function getClient(){
var l, t, w, h;
l = document.documentElement.scrollLeft || document.body.scrollLeft;
t = document.documentElement.scrollTop || document.body.scrollTop;
w = document.documentElement.clientWidth;
h = document.documentElement.clientHeight;
return { left: l, top: t, width: w, height: h };
}
function getSubClient(p){
var l = 0, t = 0, w, h;
w = p.offsetWidth;
h = p.offsetHeight;
while(p.offsetParent){
l += p.offsetLeft;
t += p.offsetTop;
p = p.offsetParent;
}
return { left: l, top: t, width: w, height: h };
}
function intens(rec1, rec2){
var lc1, lc2, tc1, tc2, w1, h1;
lc1 = rec1.left + rec1.width / 2;
lc2 = rec2.left + rec2.width / 2;
tc1 = rec1.top + rec1.height / 2 ;
tc2 = rec2.top + rec2.height / 2 ;
w1 = (rec1.width + rec2.width) / 2 ;
h1 = (rec1.height + rec2.height) / 2;
return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1 ;
}
