window.ice||(window.ice={});
window.ice.icefaces||(window.ice.globalEval=function(f){window.execScript?window.execScript(f):window.eval.call(window,f)},function(f){function t(a){return function(b){return b==a}}function u(a,b){return function(){var c=reject(a,b);empty(a);each(c,curry(append,a))}}function w(a){var b=Z(a);if(b||(b=Z(document.getElementById(a.id))))return b;debug(k,"configuration not found for "+a.nodeName);return{}}function Z(a){configParent=detect(parents(a),function(a){return null!=a?a.configuration:{}});return null!=
configParent?configParent.configuration:null}function $(a){return"form"==toLowerCase(a.nodeName)?a:enclosingForm(a)}function g(a){var b;if("javax.faces.ViewRoot"==a)b=document.documentElement;else if("javax.faces.ViewBody"==a)b=document.body;else try{b=document.getElementById(a)}catch(c){}return b}function n(a,b){var c=a[b];c||(c=detect(a.getElementsByTagName("input"),function(a){return a.name&&a.name==b}));return c}function I(a){return detect(a.getElementsByTagName("input"),function(a){return a.name&&
endsWith(a.name,"javax.faces.ViewState")},function(){throw"cannot find javax.faces.ViewState input element";})}function J(a){return"v"+a.replace(":","-")+"-retrieve-update"}function K(a){return"v"+a.replace(":","-")+"-single-submit"}function aa(a,b){var c=w(a).parameterPrefix+"javax.faces.ViewState",d=document.createElement("input");d.setAttribute("name",c);d.setAttribute("value",b);d.setAttribute("type","hidden");d.setAttribute("autocomplete","off");b&&(d.defaultValue=b);a.appendChild(d)}function oa(a,
b,c){var d=0,e=inject(reverse(c),[b],function(b,e){return insert(b,curry(runOnce,Delay(a,e)))});return function(){d<e.length&&(apply(e[d],arguments),d++)}}function L(a,b){append(F,a);var c=J(a),c=g(c),d=w(c).parameterPrefix;if(c)try{debug(k,"picking updates for view "+a),jsf.ajax.request(c,null,{"com.sun.faces.namingContainerId":d,"ice.submit.type":"ice.push","ice.view":a,"ice.window":f.window,execute:"@form",render:"@all",onerror:b})}catch(e){warn(k,"failed to pick updates",e)}}function M(a,b){var c=
function(){if(ba)setTimeout(c,20);else{var d=oa(function(){info(k,"retrying to pick updates for view "+a);L(a,d)},broadcaster(y),b||[1E3,2E3,4E3]);L(a,d)}};return c}function pa(a){return function(){var b=g(K(a));if(b){var c=w(b).parameterPrefix;try{var d=n(b,"javax.faces.encodedURL");b.action=(d?d.value:b.action).replace(/(\?|&)cid=[0-9]+/,"$1");debug(k,"dispose window and associated views "+F);postSynchronously(qa,b.action,function(a){addNameValue(a,c+"ice.submit.type","ice.dispose.window");addNameValue(a,
c+"ice.window",f.window);addNameValue(a,c+"javax.faces.ViewState",I(b).value);each(F,curry(addNameValue,a,"ice.view"))},FormPost,noop)}catch(e){warn(k,"failed to notify window disposal",e)}}}}function N(a,b,c){a=a||[];b=b||[];c=c||[];var d;return function(e){var l=e.source;if(l){l=g(l.id);try{d=w(l).viewID}catch(f){}if(d)switch(e.status){case "begin":e=!1;l.id!=J(w(l).viewID)&&(e=!0);broadcast(a,[l,e]);break;case "complete":(e=e.responseXML)&&e.documentElement?"html"==e.documentElement.nodeName?document.location=
document.location.href:broadcast(b,[e,l]):(warn(k,"the response does not contain XML data"),w(l).reloadOnUpdateFailure&&(warn(k,"reloading page ..."),document.location=document.location.href));break;case "success":e=e.responseXML,broadcast(c,[e,l])}}else warn(k,"Source element is undefined, cannot determine if this view is ICEfaces enabled.")}}function O(a,b,c){a=a||[];b=b||[];return function(d){if("serverError"==d.status){var e=d.responseXML;if(e&&e.documentElement&&c){var l=e.getElementsByTagName("error-name")[0].firstChild.nodeValue;
if(l&&contains(l,"org.icefaces.application.SessionExpiredException")){info(k,"received session expired message");c();return}}info(k,"received error message [code: "+d.responseCode+"]: "+d.responseText);broadcast(b,[d.responseCode,d.responseText,e&&e.documentElement?e:null])}else"httpError"==d.status?(warn(k,"HTTP error [code: "+d.responseCode+"]: "+d.description+"\n"+d.responseText),not(d.source&&containsSubstring(d.source.id,"-retrieve-update"))&&broadcast(a,[d.responseCode,d.description])):"malformedXML"==
d.status?(warn(k,"HTML parsing or JS evaluation error [code: "+d.responseCode+"]: "+d.description+"\n"+d.responseText),200<d.responseCode&&broadcast(a,[d.responseCode,d.description])):error(k,"Error [status: "+d.status+" code: "+d.responseCode+"]: "+d.description+"\n"+d.responseText)}}function ca(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&(append(b,c),append(b,a[c]));return b.join("")}f.icefaces=!0;f.configuration={};f.disableDefaultErrorPopups=!1;f.submitFunction=function(a,b,c){jsf.ajax.request(a,
b,c)};var H=[];f.onSessionExpiry=function(a){append(H,a);return u(H,t(a))};var y=[];f.onNetworkError=function(a){append(y,a);return u(y,t(a))};var P=[];f.onServerError=function(a){append(P,a);return u(P,t(a))};var da=[];f.onViewDisposal=function(a){append(da,a);return u(da,t(a))};var Q=[];f.onBeforeSubmit=function(a){append(Q,a);return u(Q,t(a))};f.onSubmitSend=f.onBeforeSubmit;var R=[];f.onBeforeUpdate=function(a){append(R,a);return u(R,t(a))};f.onSubmitResponse=f.onBeforeUpdate;var S=[];f.onAfterUpdate=
function(a){append(S,a);return u(S,t(a))};eval(ice.importFrom("ice.lib.functional"));eval(ice.importFrom("ice.lib.oo"));eval(ice.importFrom("ice.lib.collection"));eval(ice.importFrom("ice.lib.hashtable"));eval(ice.importFrom("ice.lib.string"));eval(ice.importFrom("ice.lib.delay"));eval(ice.importFrom("ice.lib.window"));eval(ice.importFrom("ice.lib.event"));eval(ice.importFrom("ice.lib.element"));eval(ice.importFrom("ice.lib.logger"));eval(ice.importFrom("ice.lib.query"));eval(ice.importFrom("ice.lib.http"));
f.onLoad=curry(onLoad,window);f.onBeforeUnload=curry(onBeforeUnload,window);f.onUnload=curry(onUnload,window);f.onPortletRemove=function(a,b){window.Liferay&&window.Liferay.bind("closePortlet",function(c){c=document.getElementById("_"+c.portletId+"_");for(var d=document.getElementById(a);d;)if(d==c){b();break}else d=d.parentNode})};var ra=LocalStorageLogHandler(window.console&&window.console.log?ConsoleLogHandler(debug):WindowLogHandler(debug,window.location.href)),k=Logger(["icefaces"],ra);f.log=
k;f.log.debug=debug;f.log.info=info;f.log.warn=warn;f.log.error=error;f.log.childLogger=childLogger;var C,T,U="",V,ea;(function(){function a(a){return!detect(parents(a),function(a){return"hidden"==a.style.visibility||"none"==a.style.display})}function b(a,b,e){var c=a[b];a[b]=c?function(b){b=[b];c.apply(a,b);e.apply(a,b)}:e}function c(a){a=a||window.event;C((a.srcElement||a.target).id)}C=function(a){U=a?a:"";debug(k,'persisted focus for element "'+a+'"')};var d=/MSIE/.test(navigator.userAgent),e=
function(b){runOnce(Delay(function(){if(b&&/^\w[\w\-\:]*$/.test(b)){var e=document.getElementById(b);if(e&&e!=document.activeElement&&(C(b),e.focus)){var c=window.scrollX||document.documentElement.scrollLeft,l=window.scrollY||document.documentElement.scrollTop;try{e.focus(),window.scrollTo(c,l)}catch(f){}finally{if(d)try{e.focus(),window.scrollTo(c,l)}catch(m){}debug(k,'focused element "'+b+'"');if("input"==toLowerCase(e.nodeName)&&"text"==e.type||"textarea"==toLowerCase(e.nodeName))c=e.value.length,
e.createTextRange?(e=e.createTextRange(),e.move("character",c),e.select()):(e.selectionStart||0==e.selectionStart)&&a(e)&&e.setSelectionRange(c,c)}}}},100))},l=e;T=function(a){l(a)};if(d){var m;onLoad(window,function(){m=document.activeElement});(function(a){b(document,"onfocusout",function(){m==document.activeElement?a():m=document.activeElement})})(function(){l=C});(function(a){b(window,"onfocus",a)})(function(){l=e})}V=function(a){a.attachEvent?a.attachEvent("onfocusin",c):(a.addEventListener("focus",
c,!0),a.addEventListener("click",c,!0));return function(){a.attachEvent?a.detachEvent("onfocusin",c):(a.removeEventListener("focus",c),a.removeEventListener("click",c))}};ea=function(a){var b=a.id;return f.onAfterUpdate(function(a){detect(a,function(a){return a.getAttribute("id")==b})&&V(g(b))})}})();f.setFocus=C;f.sf=C;f.applyFocus=T;f.af=T;var F=[],qa=Client();f.submitCallback=N(Q,R,S);jsf.ajax.addOnEvent(f.submitCallback);f.errorCallback=O(y,P,function(){L=noop;f.push&&each(F,f.push.deregister);
broadcast(H)});jsf.ajax.addOnError(f.errorCallback);var ba;jsf.ajax.addOnEvent(function(a){ba="begin"==a.status?a:null;"success"==a.status&&(a=collect(a.responseXML.documentElement.firstChild.childNodes,function(a){var c=a.getAttribute("id"),d=a.nodeName,c=d+(c?'["'+c+'"]':"");"update"==d?c+=": "+substring(a.firstChild.data,0,40)+"....":"insert"==d?(d=a.firstChild.getAttribute("id"),c+=": "+a.firstChild.nodeName+" "+d+": "+substring(a.firstChild.firstChild.data,0,40)+"...."):"eval"==d&&(c+=": "+substring(a.firstChild.data,
0,40)+"....");return c}),debug(k,"applied updates >>\n"+join(a,"\n")))});var fa,ga,x,W,A,X;(function(){function a(a){return isString(a)?document.getElementById(a):a}function b(a){return"form"==toLowerCase(a.nodeName)?a:enclosingForm(a)}function c(a,b){var e=b.id,c=document.getElementById(a+":ajaxDisabled");return c&&contains(split(trim(c.value)," "),e)}function d(a,b){var e=object(function(a){a(addNameValue,function(a,e,c){b[e]=c})});serializeOn(a,e)}function e(a){return a["javax.faces.encodedURL"]?
a["javax.faces.encodedURL"].value:a.action}function l(a,b){a&&a(function(a,e){b[a]=e})}function m(a,b){if(a&&b.name&&b.id){for(var e=a.split(" "),c=0,d=e.length;c<d;c++)if(e[c]==b.name)return a;a=a+" "+b.name}return a}function D(a,b){var e=a.length,c={},d;for(d in b)startsWith(d,a)?c[substring(d,e,d.length)]=b[d]:c[d]=b[d];return c}function h(a){var b=toLowerCase(a.nodeName);return"input"==b&&"javax.faces.ViewState"!=a.name||"select"==b||"textarea"==b}function E(a,b){return function(a){a=inject(a.getElementsByTagName("update"),
[],function(a,b){var e=b.getAttribute("id");return contains(e,"javax.faces.ViewState")||contains(e,"javax.faces.ClientWindow")||endsWith(e,"_fixviewstate")?a:append(a,g(e))});a=inject(a,[b],function(a,b){b&&(h(b)&&not(contains(a,b.form))?append(a,b.form):each(b.getElementsByTagName("form"),function(b){append(a,b)}));return a});each(a,function(a){debug(k,'recalculate initial parameters for updated form["'+a.id+'"]');a.previousParameters=HashSet(jsf.getViewState(a).split("&"))})}}X=function(a,b,c,h,
z,B){var q=w(h).viewID,s=document.getElementById(K(q)),v=[];try{var p=h.cloneNode(!1),ha=function(a,b){each(a.childNodes,function(a){if("SCRIPT"!=a.nodeName){var e=b.appendChild(a.cloneNode(!1));ha(a,e)}})};ha(h,p);s.appendChild(p);append(v,p);var g=toLowerCase(h.nodeName);if("input"==g){if("radio"==h.type&&(p.checked=h.checked,a=m(a,h)),"checkbox"==h.type){p.checked=h.checked;var u=h.name;each(h.form.elements,function(a){if(a.name==u&&a!=h){var b=s.appendChild(a.cloneNode(!0));append(v,b);b.checked=
a.checked}});a=m(a,h)}}else if("select"==g){var sa=p.options;each(h.options,function(a,b){sa[b].selected=a.selected})}else"textarea"==g&&(p.value=h.value);c=c||null;var g=[],t=[],n=[],ia=[],ja=[];B&&B(curry(append,g),curry(append,t),curry(append,n),curry(append,ia),curry(append,ja));w(h).deltaSubmit&&append(n,E(h,s));var x=N(g,t,n),C=O(ia,ja),A=w(h||s).parameterPrefix,y={execute:a,render:b,onevent:x,onerror:C,"com.sun.faces.namingContainerId":A,"ice.window":f.window,"ice.view":q,"ice.focus":U},G=
$event(c,h);isKeyEvent(G)&&isEnterKey(G)&&(cancelBubbling(G),cancelDefaultAction(G));d(G,y);l(z,y);debug(k,join(["partial submit to "+e(s),"javax.faces.execute: "+a,"javax.faces.render: "+b,"javax.faces.source: "+h.id,"view ID: "+q,"event type: "+type(G)],"\n"));f.submitFunction(p,c,D(A,y))}catch(F){debug(k,"singleSubmit failed "+F)}finally{each(v,function(a){s.removeChild(a)})}};fa=function(b,e,c,d){e=a(e);return w(e).standardFormSerialization?A("@this","@all",b,e,function(a){a("ice.submit.type",
"ice.se");a("ice.submit.serialization","form");c&&c(a)},d):X("@this","@all",b,e,function(a){a("ice.submit.type","ice.se");a("ice.submit.serialization","element");c&&c(a)},d)};ga=function(b,e,c,d){e=a(e);return w(e).standardFormSerialization?A("@this","@this",b,e,function(a){a("ice.submit.type","ice.ser");a("ice.submit.serialization","form");c&&c(a)},d):X("@this","@this",b,e,function(a){a("ice.submit.type","ice.ser");a("ice.submit.serialization","element");c&&c(a)},d)};A=function(a,m,h,r,z,B){var q=
null;q=h?h.currentTarget?h.currentTarget:h.target?h.target:h.srcElement:null;var s=q?q:triggeredBy($event(h,r));s&&s.tagName&&"form"==toLowerCase(s.tagName)&&(s=r);for(var q="form"==toLowerCase(r.tagName)?r:b(r),v=q.id,p=!1,g=s;null!=g&&(!g.tagName||"form"!=toLowerCase(g.tagName));){if(c(v,g)){p=!0;break}g=g.parentNode}if(p)q&&q.nativeSubmit&&(h=document.createElement("input"),h.setAttribute("type","hidden"),h.setAttribute("name",s.name),h.setAttribute("value",s.value),h.setAttribute("autocomplete",
"off"),q.appendChild(h),q.nativeSubmit(),q.removeChild(h));else{h=h||null;var t=[],u=[],v=[],p=[],g=[];B&&B(curry(append,t),curry(append,u),curry(append,v),curry(append,p),curry(append,g));B=w(r||q).parameterPrefix;var s=w(r).viewID,t=N(t,u,v),p=O(p,g),n={execute:a,render:m,onevent:t,onerror:p,"com.sun.faces.namingContainerId":B,"ice.window":f.window,"ice.view":s,"ice.focus":U},p=$event(h,r);isKeyEvent(p)&&isEnterKey(p)&&(cancelBubbling(p),cancelDefaultAction(p));try{d(p,n)}catch(y){debug(k,"Unable to serialize event "+
y)}l(z,n);z=b(r);g=w(r).deltaSubmit;debug(k,join([(g?"delta ":"")+"full submit to "+e(z),"javax.faces.execute: "+a,"javax.faces.render: "+m,"javax.faces.source: "+r.id,"view ID: "+s,"event type: "+type(p)],"\n"));if(g){append(v,E(r,q));m=z.previousParameters||HashSet();q=HashSet(jsf.getViewState(z).split("&"));a=complement(q,m);m=complement(m,q);var q=function(a){return function(b){b=split(b,"=");a(decodeURIComponent(b[0]),decodeURIComponent(b[1]))}},x=document.getElementById(K(s)),s=[];"form"==toLowerCase(r.nodeName)?
(v=document.createElement("input"),v.setAttribute("id",r.id),v.setAttribute("name",r.id),v.setAttribute("value",r.id),v.setAttribute("type","hidden"),v.setAttribute("autocomplete","off")):(v=r.cloneNode(!0),v.value=r.value);v._original=r;append(s,x.appendChild(v));n["ice.deltasubmit.form"]=z.id;n[z.id]=z.id;try{n["ice.deltasubmit.form"]=z.id,each(a,q(function(a,b){n["patch+"+a]=b})),each(m,q(function(a,b){n["patch-"+a]=b})),f.submitFunction(v,h,D(B,n))}finally{each(s,function(a){x.removeChild(a)})}}else f.submitFunction(r,
h,D(B,n))}};x=function(b,e,c,d){return A("@all","@all",b,a(e),function(a){a("ice.submit.type","ice.s");a("ice.submit.serialization","form");c&&c(a)},d)};W=function(b,e,c,d){return A("@form","@all",b,a(e),function(a){a("ice.submit.type","ice.s");a("ice.submit.serialization","form");c&&c(a)},d)}})();var Y;(function(){function a(a){var b=a||document.body,e=b.ownerDocument.createElement("iframe");e.setAttribute("src","about:blank");e.setAttribute("frameborder","0");a=e.style;a.position="absolute";a.filter=
"alpha(opacity=0)";a.top="0";a.left="0";a.zIndex=3E3;var c=b.ownerDocument.createElement("div");c.className="ice-blockui-overlay";var l=c.style;l.position="absolute";l.top="0";l.left="0";l.zIndex=3001;"body"==b.tagName.toLowerCase()?(a.width=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)+"px",a.height=Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight,document.body.scrollHeight)+"px"):(a.width=b.offsetWidth+"px",a.height=b.offsetHeight+"px");
l.width=a.width;l.height=a.height;b.appendChild(e);b.appendChild(c);return object(function(a){a(d,function(a){if(e)try{b.removeChild(e),b.removeChild(c)}catch(d){}})})}function b(a){return function(b){b=$event(b,a);var e=type(b),c=triggeredBy(b),d=capturedBy(b);cancel(b);debug(k,"event [type: "+e+", triggered by: "+(identifier(c)||c)+", captured in: "+(identifier(d)||d)+"] was discarded.")}}function c(){for(var a=arguments.callee.caller;a;){if(a==f.fullSubmit){if(a=a.arguments[2])return"blur"==a.type;
break}try{a=a.arguments.callee.caller}catch(b){break}}return!1}var d=operator();Y=function(){debug(k,"blocking UI");var e=a(),c=inject(["input","select","textarea","button","a"],[],function(a,e){return concatenate(a,asArray(collect(document.body.getElementsByTagName(e),function(a){var e=b(a),c=a.onkeypress,d=a.onkeyup,l=a.onkeydown,f=a.onclick;a.onkeypress=e;a.onkeyup=e;a.onkeydown=e;a.onclick=e;return function(){try{a.onkeypress=c,a.onkeyup=d,a.onkeydown=l,a.onclick=f}catch(b){}}})))});return function(){broadcast(c);
d(e);debug(k,"unblocked UI")}};var e=!1,l=ice.submitFunction;ice.submitFunction=function(a,b,d){if(w(a).blockUIOnSubmit&&not(c())){if(!e){e=!0;var f=d.onevent;d.onevent=function(a){"success"==a.status&&(e=!1);f&&f(a)};l(a,b,d)}}else l(a,b,d)};var m=noop;f.onBeforeSubmit(function(a,b){m=b&&w(a).blockUIOnSubmit&&not(c())?Y():noop});f.onBeforeUpdate(function(){m()})})();f.se=fa;f.ser=ga;f.submit=x;f.s=x;f.sef=W;f.fullSubmit=A;f.ajaxRefresh=function(a,b){a=a||(document.body.configuration?document.body.configuration.viewID:
null);if(!a)throw"viewID parameter required";var c=w(g(J(a)));c.ajaxRefresh||(c.ajaxRefresh=M(a,b));c.ajaxRefresh()};var ka=noop;f.setupBridge=function(a,b,c,d){a=document.getElementById(a).parentNode;if(ca(d)!=ca(a.configuration)){ka();var e=[];a.configuration=d;a.configuration.viewID=b;f.window=c;d.sendDisposeWindow&&append(e,onBeforeUnload(window,pa(b)));d.focusManaged&&(append(e,V(a)),append(e,ea(a)));d.clientSideElementUpdateDetermination&&append(e,la());d.blockUIOnSubmit&&append(e,onBeforeUnload(window,
function(){Y()}));ka=broadcaster(e)}a.setupCount=a.setupCount?a.setupCount+1:1;1==a.setupCount&&(ma(a),na(a))};f.setupPush=function(a,b,c,d){c=asArray(collect(split(c," "),Number));c=M(b,c);ice.push.register([b],c);if(d)ice.onBlockingConnectionReEstablished(c);b=curry(f.unsetupPush,b);f.onSessionExpiry(b);f.onNetworkError(b);f.onServerError(b);f.onUnload(b);f.onPortletRemove(a,b)};f.unsetupPush=function(a){ice.push.deregister([a])};f.setupRefresh=function(a,b,c,d,e){c=0>c?null:Math.floor(c/b);e=asArray(collect(split(e,
" "),Number));a=M(a,e);b=Delay(a,b);run(b,c);b=curry(stop,b);f.onSessionExpiry(b);f.onNetworkError(b);f.onServerError(b);f.onUnload(b);f.onElementUpdate(d,b)};f.calculateInitialParameters=function(a){a=document.getElementById(a);a.previousParameters=HashSet(jsf.getViewState(a).split("&"))};onBeforeUnload(window,function(){empty(y)});onKeyPress(document,function(a){a=$event(a);isEscKey(a)&&cancelDefaultAction(a)});(function(){var a=[];f.onBeforeSessionExpiry=function(b){append(a,b);return u(a,t(b))};
var b=object(function(a){a(stop,noop)}),c=object(function(a){a(stop,noop)});f.resetSessionExpiryTimeout=function(d,e){stop(b);stop(c);var l=Math.round(e/1E3);b=runOnce(Delay(function(){broadcast(a,[l]);runOnce(Delay(function(){c=broadcast(H)},e))},d))}})();var na;(function(){function a(a){a.onkeypress=null;a.onmousedown=null;a.onmousemove=null;a.onmouseout=null;a.onmouseover=null;a.onclick=null;a.oncontextmenu=null;a.onchange=null;a.onfocus=null;a.onblur=null;a.submit=null;a.onsubmit=null;a.onkeydown=
null;a.onkeyup=null;a.ondblclick=null;a.onfocusout=null}na=function(b){onUnload(window,function(){b.configuration=null;each(["a","iframe"],function(c){each(b.getElementsByTagName(c),a)});each(b.getElementsByTagName("form"),function(b){try{b.submit=null}catch(d){}b.onsubmit=null;(b=b.elements)&&each(b,a)})})};f.onBeforeUpdate(function(b){each(b.getElementsByTagName("update"),function(b){b=b.getAttribute("id");var d=g(b);d&&(a(d),each("a iframe input select button textarea".split(" "),function(b){each(d.getElementsByTagName(b),
a)}),each(d.getElementsByTagName("form"),function(b){a(b);b.submit=null;b.onsubmit=null}))})})})();(function(){f.captureKeypress=function(a,b){var c=document.getElementById(a),d=function(a){var d=$event(a,c),f=triggeredBy(d),D=toLowerCase(f.nodeName);if("textarea"!=D&&"a"!=D){if(b&&(D=b[keyCode(d)]))return f.preventDefaultAction||(f=g(D),cancel(d),W(a||window.event,f)),!1;if(isEnterKey(d)){for(d=f;d&&!d.submitOnEnter;)d=d.parentNode;d&&"disabled"==d.submitOnEnter||f&&f.id&&x(a||window.event,f);return!1}return!0}};
c.addEventListener?c.addEventListener("keydown",d,!0):c.attachEvent("onkeydown",d)};f.captureSubmit=function(a){var b=document.getElementById(a);"multipart/form-data"!=b.enctype&&(b.nativeSubmit=b.submit,b.submit=function(){var a;if(window.event)a=window.event;else{a=arguments.callee.caller;for(var d;!a||!d||!d.target&&!d.srcElement;)a=a.caller,d=a.arguments[0];a=d}x(a,b)});each("onkeydown onkeypress onkeyup onclick ondblclick onchange".split(" "),function(a){b[a]=function(a){var e=a||window.event,
c=e.target||e.srcElement,m=f.onAfterUpdate(function(){b.onsubmit=null;Delay(m,1)});b.onsubmit=function(){if(c.name&&!c.id){var a=document.getElementById(c.name);a&&a.id||(c.id=c.name)}window.mojarra&&arguments.callee.caller==window.mojarra.jsfcljs?x(null,b):(a=document.getElementById(c.id),x(e,a?a:b),b.onsubmit=null);return!1}}})}})();(function(){function a(a){return n(a,"javax.faces.encodedURL")||n(a,"javax.faces.ViewState")||n(a,"ice.window")||n(a,"ice.view")||a.id&&a[a.id]&&a.id==a[a.id].value}
function b(a,b){var c=detect(a.getElementsByTagName("update"),function(a){return contains(a.getAttribute("id"),"javax.faces.ViewState")});c&&b(c.firstChild.data)}function c(b,c){each(b.getElementsByTagName("update"),function(b){var e=b.getAttribute("id");if(e=g(e))"form"==toLowerCase(e.nodeName)?a(e)&&c(e):(b=join(collect(b.childNodes,function(a){return a.data}),"").match(/\<form[^\<]*\>/g))&&each(b,function(b){(b=b.match(/id="([\S]*?)"/im))&&b[1]&&(b=document.getElementById(b[1]))&&a(b)&&c(b)})})}
f.onAfterUpdate(function(a){b(a,function(b){c(a,function(a){try{var e=I(a);e.value!=b&&(e.value=b)}catch(c){aa(a,b),debug(k,'append missing "javax.faces.ViewState" input element to form["'+a.id+'"]')}})})});var d;f.onBeforeSubmit(function(a){var b=n,c;try{c=$(a)}catch(f){c=$(document.getElementById(a.id))}d=(a=b(c,"ice.view"))?a.value:null});f.onAfterUpdate(function(a){b(a,function(a){each(document.getElementsByTagName("form"),function(b){var e=n(b,"ice.view");(b=n(b,"javax.faces.ViewState"))&&e&&
e.value==d&&(b.value=a)})})});f.fixViewStates=function(a,b){for(var c=0;c<a.length;c++){var d=b,f=g(a[c]);try{var E=I(f);E.value!=d&&(E.value=d)}catch(k){aa(f,d)}}}})();var la;(function(){function a(a,b){var c=g(a);c?c["data-onElementUpdate"]=b:warn(k,"Cannot find element ["+a+"] to assign onElementUpdate callback.")}function b(a,b){for(var c=[],f=g(a);f;){var h;(h=f==document.body?"javax.faces.ViewBody":f==document.documentElement?"javax.faces.ViewRoot":f==document.getElementsByTagName("head")[0]?
"javax.faces.ViewHead":f.id)&&c.push(h);f=f.parentNode}append(d,{identifier:a,handler:b,ancestors:"*"+c.join("*")+"*"});return u(d,function(b){return a==b.id})}function c(a){var b=a.getAttribute("id");contains(b,"javax.faces.ViewState")||"_fixviewstate"!==b.substr(b.length-13)&&g(b)&&(d=reject(d,function(a){if(contains(a.ancestors,"*"+b+"*")){var c=g(a.identifier);if(c){a=a.handler;try{a(c)}catch(e){}}return!0}return!1}))}var d=[];f.onElementUpdate=a;la=function(){f.onElementUpdate=b;var e=f.onBeforeUpdate(function(a){each(a.getElementsByTagName("update"),
c);each(a.getElementsByTagName("delete"),c)});return function(){f.onElementUpdate=a;e()}};f.notifyOnElementUpdateCallbacks=function(a){each(a,function(a){var b=g(a);if(b){var c=b["data-onElementUpdate"];if(c)try{c(a)}catch(e){warn(k,"onElementUpdate callback for ["+a+"] failed to run properly",e)}finally{b["data-onElementUpdate"]=null}}})};f.notifyAllOnElementUpdateCallbacks=function(){for(var a=document.body.getElementsByTagName("*"),b=0,c=a.length;b<c;b++){var d=a[b],f;d&&(f=d["data-onElementUpdate"]);
if(f){var E=d.id;try{f(E)}catch(g){warn(k,"onElementUpdate callback for ["+E+"] failed to run properly",g)}finally{d&&(d["data-onElementUpdate"]=null)}}}}})();(function(){var a=[];f.onElementRemove=function(b,c){append(a,{i:b,c:c});return u(a,t(c))};f.onAfterUpdate(function(){each(a,function(a){var c=!0;try{c=!document.getElementById(a.i)}catch(d){c=!0}if(c)try{a.c()}catch(e){warn(k,"failed to execute onElementRemove callback for element "+a.i)}})})})();(function(){function a(a){function d(){g=(new Date).getTime();
notEmpty(c)&&(each(c,function(a){if(a=a.activeCallback)try{a()}catch(b){warn(k,"onUserInactivity active user callback failed to run",b)}}),b=concatenate(b,c),c=[])}var m=Delay(function(){var a=(new Date).getTime(),e=select(b,function(b){var c=a>g+b.interval;if(c){b=b.idleCallback;try{b()}catch(e){warn(k,"onUserInactivity idle user callback failed to run",e)}}return c});b=complement(b,e);c=concatenate(c,e)},3E3);run(m);m=curry(stop,m);f.onSessionExpiry(m);f.onNetworkError(m);f.onServerError(m);f.onUnload(m);
var g=(new Date).getTime();each(a,function(a){registerListener(a,document,d)})}var b=[],c=[],d=!1;f.onUserInactivity=function(c,f,m,g){d||(d=!0,a(g||["keydown","mouseover"]));c={interval:1E3*c,idleCallback:f,activeCallback:m};append(b,c);return u(b,t(c))}})();var ma;(function(){function a(a,b,c){var f=c(),h=document.body.appendChild(document.createElement("div"));h.className="ice-status-indicator";var g=h.style;g.position="absolute";g.textAlign="center";g.zIndex="28001";g.color="black";g.backgroundColor=
"white";g.paddingLeft="10px";g.paddingRight="10px";g.paddingTop="15px";g.paddingBottom="15px";g.borderBottomColor="gray";g.borderRightColor="gray";g.borderTopColor="silver";g.borderLeftColor="silver";g.borderWidth="2px";g.borderStyle="solid";c=h.appendChild(document.createElement("div"));c.appendChild(document.createTextNode(a));c.className="ice-status-indicator-message";a=c.style;a.textAlign="left";a.fontSize="14px";a.fontSize="14px";a.fontWeight="bold";a=c.appendChild(document.createElement("div"));
a.innerHTML=b;a.className="ice-status-indicator-description";b=a.style;b.fontSize="11px";b.marginTop="7px";b.marginBottom="7px";b.fontWeight="normal";b=function(){g.left=(window.width()-h.clientWidth)/2+"px";g.top=(window.height()-h.clientHeight)/2+"px"};b();var k=onResize(window,b);return object(function(a){a(d,function(a){if(h)try{document.body.removeChild(h),k(),d(f)}finally{h=null}})})}function b(a){return function(){var b=a.ownerDocument.createElement("iframe");b.setAttribute("src","about:blank");
b.setAttribute("frameborder","0");b.className="ice-status-indicator-overlay";var c=b.style;c.top="0";c.left="0";a.appendChild(b);var f="body"==a.tagName.toLowerCase()?function(){c.width=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)+"px";c.height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)+"px"}:function(){c.width=a.offsetWidth+"px";c.height=a.offsetHeight+"px"};f();var h=onResize(window,f);return object(function(c){c(d,function(c){if(b)try{a.removeChild(b),
h()}finally{b=null}})})}}function c(a,b){var c=RegExp("<"+a+"[^<]*>","g").exec(b),d=RegExp("</"+a+">","g").exec(b),c=b.substring(c.index,d.index+d[0].length);return c.substring(c.indexOf(">")+1,c.lastIndexOf("<"))}var d=operator();ma=function(e){function g(){return!(f.disableDefaultErrorPopups||e.configuration.disableDefaultErrorPopups)}var m=b(e),k=object(function(a){a(d,noop)});f.onServerError(function(b,d,e){g()&&(e?(b=e.getElementsByTagName("error-message")[0].firstChild.nodeValue,d=e.getElementsByTagName("error-name")[0].firstChild.nodeValue):
(b=c("title",d),d=c("body",d)),a(b,d,m))});f.onNetworkError(function(){g()&&a("Network Connection Interrupted","Reload this page to try to reconnect.",m)});f.onSessionExpiry(function(){g()&&(d(k),a("User Session Expired","Reload this page to start a new user session.",m))});f.onBeforeSessionExpiry(function(b){g()&&(k=a("User Session is about to expire in "+b+" seconds.","Reload this page to keep your current user session.",m))})}})();(function(){if(window.addEventListener){var a=function(a){return function(c){window.addEventListener(a,
c,!1);return function(){window.removeEventListener(a,c)}}};f.onOffline=a("offline");f.onOnline=a("online")}else f.onOffline=noop,f.onOnline=noop})();(function(){function a(a,b){var c=RegExp("<"+a+"[^<]*>","g").exec(b),d=RegExp("</"+a+">","g").exec(b);return c&&d&&c.index&&d.index?(c=b.substring(c.index,d.index+d[0].length),c.substring(c.indexOf(">")+1,c.lastIndexOf("<"))):""}function b(a,b,c){return(a=a.match(RegExp(b+'="([\\S]*?)"',"im")))?a[1]:c}function c(a){if(a){var b=document.createElement("div");
b.innerHTML=a;a=b.firstChild.data;b.removeChild(b.firstChild)}return a}function d(a){try{var b=indexOf(a,";"),c=substring(a,0,b);try{var d=indexOf(a,"?");return c+substring(a,d,a.length)}catch(e){return c}}catch(f){return a}}function e(e){if(e=e.match(t))e=collect(e,function(e){var f=b(e,"src"),g;f?(f=d(c(f)),contains(u,f)?g="":(getSynchronously(h,f,noop,noop,function(a){g=contentAsText(a)}),append(u,f))):g=c(a("script",e));return g}),each(select(e,identity),f.globalEval)}function l(a){if(a=a.match(w)){a=
collect(select(a,function(a){return"text/css"==b(a,"type")}),function(a){return replace(b(a,"href"),"&amp;","&")});var c=document.getElementsByTagName("head")[0],d=complement(a,x);each(d,function(a){var b;getSynchronously(h,a,noop,noop,function(a){b=contentAsText(a)});a=document.createElement("style");a.type="text/css";c.appendChild(a);if(a.styleSheet)a.styleSheet.cssText=b;else{var d=document.createTextNode(b);a.appendChild(d)}});x=a}}function k(a){return function(b,c){var e=c.getAttribute(a);e&&
append(b,d(e));return b}}function n(a){return detect(a.getElementsByTagName("update"),function(a){return"javax.faces.ViewRoot"==a.getAttribute("id")})}var h=Client(),t=/<script[^>]*>([\S\s]*?)<\/script>/igm,w=/<link[^>]*>/igm,u=[],x=[];onLoad(window,function(){var a=document.documentElement.getElementsByTagName("script");inject(a,u,k("src"))});onLoad(window,function(){var a=document.documentElement.getElementsByTagName("link");inject(a,x,k("href"))});onLoad(window,function(){document.documentElement.isHeadUpdateSuccessful=
null});f.onBeforeUpdate(function(b){var c=detect(b.getElementsByTagName("extension"),function(a){return"javax.faces.ViewHead"==a.getAttribute("type")});b=document.write;document.write=noop;c&&(c=c.firstChild.data,e(c),l(c),document.title=a("title",c));document.write=b});f.onAfterUpdate(function(b){if((b=n(b))&&!document.documentElement.isHeadUpdateSuccessful){var c=a("head",b.firstChild.data);e(c);l(c)}else document.documentElement.isHeadUpdateSuccessful=null;b&&(document.title=a("title",b.firstChild.data))});
f.onBeforeUpdate(function(a){each(a.getElementsByTagName("update"),function(a){a=a.getAttribute("id");(a=g(a))&&each(a.getElementsByTagName("iframe"),function(a){a&&a.parentNode&&a.parentNode.removeChild(a)})})});if(!/MSIE/.test(navigator.userAgent))f.onBeforeUpdate(function(a){n(a)&&(a=document.body.configuration)&&(document.documentElement.configuration=a)});try{document.execCommand("BackgroundImageCache",!1,!0)}catch(r){}})()}(window.ice));