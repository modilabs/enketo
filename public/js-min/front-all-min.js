var d;$(document).ready(function(){d=new f;d.e();"undefined"==typeof console&&(console={log:function(){}});"undefined"==typeof window.console.debug&&(console.debug=console.log);var a;a:{a=window.location.search.substring(1).split("&");for(var c=0;c<a.length;c++){var b=a[c].split("=");if("debug"==b[0]){a=encodeURI(b[1]);break a}}a=!1}"true"!==a&&(window.console.log=function(){},window.console.debug=function(){})});function f(){}
f.prototype.e=function(){this.h.i();g(this).e();var a=this;$("#feedback-bar-close").button({icons:{primary:"ui-icon-closethick"},text:!1}).click(function(a){a.preventDefault();$("#feedback-bar p").remove();$("#feedback-bar").trigger("change")});$("#page-close").button({icons:{primary:"ui-icon-closethick"},text:!1}).click(function(c){c.preventDefault();g(a).close()});$("#feedback-bar-close, #page-close").removeClass().addClass("custom-button ui-widget-header ui-corner-all");$(document).on("click",
'a[href^="#"]:not([href="#"]):not(nav ul li a)',function(a){var b=$(this).attr("href");"#"!==b&&(a.preventDefault(),$('nav li a[href="'+b+'"]').click())});$('nav ul li a[href^="#"]').click(function(c){c.preventDefault();c=$(this).attr("href").substr(1);g(a).open(c);$(this).closest("li").addClass("nav-state-active")});$(window).on("onlinestatuschange",function(c,b){a.updateStatus.k(b)});$(document).on("edit","form.jr",function(c,b){a.updateStatus.l(b)});$(document).on("browsersupport",function(c,b){a.updateStatus.support(b)});
$("#page, #feedback-bar").on("change",function(){a.display()});$("header #status-connection").click(function(a){var b=$(this).attr("title"),e,h;e=e?1E3*e:1E4;$("#feedback-bar p").eq(1).remove();$("#feedback-bar p").html()!==b&&(h=$("<p></p>"),h.text(b),$("#feedback-bar").prepend(h));$("#feedback-bar").trigger("change");setTimeout(function(){typeof h!=="undefined"&&h.remove();$("#feedback-bar").trigger("change")},e);a.stopPropagation()});$(window).resize(function(){$("#container").css("top",$("header").outerHeight());
$("body:not(.no-scroll) #container").height($(window).height()-$("header").outerHeight()-$("#form-controls.bottom").outerHeight());var a=$("nav").offset().left,b=$("#logo").offset().left+$("#logo").outerWidth();a<b?$("#logo").css("visibility","hidden"):$("#logo").css("visibility","visible")});"function"===typeof this.m&&this.m();Modernizr.borderradius&&(Modernizr.boxshadow&&Modernizr.csstransitions&&Modernizr.opacity)&&$(document).trigger("browsersupport","fancy-visuals");$("footer").detach().appendTo("#container")};
f.prototype.i=function(){$(window).trigger("resize")};f.prototype.h={i:function(){$("article.page").each(function(){var a,c="",b;b=$(this).attr("id");a=$(this).attr("data-display")?$(this).attr("data-display"):b;c=$(this).attr("data-title")?$(this).attr("data-title"):b;b=$(this).attr("data-ext-link")?$(this).attr("data-ext-link"):"#"+b;$('<li class="ui-corner-tl ui-corner-tr"><a href="'+b+'" title="'+c+'" >'+a+"</a></li>").appendTo($("nav ul"))})},reset:function(){$("nav ul li").removeClass("nav-state-active")}};
function g(a){a.e=function(){this.c=$("<pages></pages>");$("article.page").detach().appendTo(this.c)};a.get=function(a){var b=this.c.find('article[id="'+a+'"]');return b=0<b.length?b:$('article[id="'+a+'"]')};a.b=function(a){return 0<$("#page article.page"+("undefined"!==typeof a?'[id="'+a+'"]':"")).length};a.open=function(a){var b;if(!this.b(a)){b=this.get(a);if(1!==b.length)return console.error("page not found");this.b()&&this.close();$("#page-content").prepend(b.show()).trigger("change");$("#overlay").show();
setTimeout(function(){b.find(".scroll-list").j();$("#overlay, header").bind("click.pageEvents",function(){$("#page-close").trigger("click")})},50);$(window).bind("resize.pageEvents",function(){$("#page").trigger("change")})}};a.close=function(){var a;a=$("#page .page").detach();this.c.append(a);$("#page").trigger("change");this.h.reset();$("#overlay").hide();$("#overlay, header").unbind(".pageEvents");$(window).unbind(".pageEvents")};return a}
f.prototype.updateStatus={k:function(a){console.log("updating online status in menu bar to:");console.log(a);a?$("header #status-connection").removeClass().addClass("ui-icon ui-icon-signal-diag").attr("title","It appears there is currently an Internet connection available."):$("header #status-connection").removeClass().addClass("ui-icon ui-icon-cancel").attr("title","It appears there is currently no Internet connection")},l:function(a){a?$("header #status-editing").removeClass().addClass("ui-icon ui-icon-pencil").attr("title",
"Form is being edited."):$("header #status-editing").removeClass().attr("title","")},support:function(a){var c=g(d).get("settings");0<c.length&&(console.debug("updating browser support for "+a),c.find("#settings-browserSupport-"+a+" span.ui-icon").addClass("ui-icon-check"))}};
f.prototype.display=function(){var a,c;c=$("header");var b=$("#feedback-bar"),e=$("#page");0<b.find("p").length?(a=c.outerHeight(),c=g(this).b()?c.outerHeight()+b.outerHeight():c.outerHeight()+b.outerHeight()-e.outerHeight()):(a=c.outerHeight()-b.outerHeight(),c=g(this).b()?c.outerHeight():c.outerHeight()-e.outerHeight());b.css("top",a);e.css("top",c)};var i=jQuery;i.fn.p=function(){var a=0;return this.each(function(){i(this).width()>a&&(a=i(this).width())}).each(function(){i(this).width(a)})};
i.fn.reverse=[].reverse;
i.fn.f=function(a){a=i.extend({g:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",a:"",d:""},a);this.each(function(){a.q&&(a.a+="ABCDEFGHIJKLMNOPQRSTUVWXYZ");a.n&&(a.a+="abcdefghijklmnopqrstuvwxyz");for(var c=a.d.split(""),b=0;b<c.length;b++)-1!=a.g.indexOf(c[b])&&(c[b]="\\"+c[b]);a.d=c.join("|");var e=a.g+a.a,e=e.replace(RegExp(a.d,"gi"),"");i(this).keypress(function(a){var b;b=a.charCode?String.fromCharCode(a.charCode):String.fromCharCode(a.which);e.indexOf(b)!=-1&&a.preventDefault();a.ctrlKey&&b=="v"&&a.preventDefault()});
i(this).bind("contextmenu",function(){return false})})};i.fn.r=function(a){var c="abcdefghijklmnopqrstuvwxyz",c=c+c.toUpperCase(),a=i.extend({a:c},a);return this.each(function(){i(this).f(a)})};i.fn.alpha=function(a){a=i.extend({a:"1234567890"},a);return this.each(function(){i(this).f(a)})};
i.fn.o=function(a){a||(a=1);var c=this.contents().filter(function(){return 3==this.nodeType}).first(),b=c.text(),a=b.split(" ",a).join(" ");c.length&&(c[0].nodeValue=b.slice(a.length),c.before('<span class="capitalize">'+a+"</span>"))};
i.fn.j=function(){this.each(function(){var a=i(this),c=i(this).find("ol");a.css("overflow","hidden");var b=c.height()-a.height();if(0<b){var e=b/c.height(),e=Math.round((1-e)*a.height()),e=e-e%2;i("#records .column.middle").html('<div id="slider-wrap" class="ui-corner-all"><div id="slider-vertical"></div></div>');i("#slider-wrap").height(a.outerHeight());i("#slider-vertical").slider({orientation:"vertical",s:"max",min:0,max:100,value:100,t:function(a,e){c.css({top:-((100-e.value)*b/100)})}});i("#slider-wrap").css("margin-top",
i("#records-saved h3").outerHeight(!0));i(".ui-slider-handle").css({height:e,"margin-bottom":-0.5*e});a=i("#slider-vertical").height();e=a-e;a=0.5*(a-e);i(".ui-slider").css({height:e,"margin-top":a});i(".ui-slider-range").css({top:-a});i("#slider-wrap").click(function(){i("#slider-vertical").slider("value",0);c.css({top:-b})})}})};