(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAWCAYAAADXYyzPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBvZSBCYJAFIZ/j6goqDYoaoMGKGiRRgjawAYIWiBokIIGcAcdIDCCLAKtZxyked2d3fmBKMfzPT/f4znJC3xw3+0QrVaIfR+2iAGX5Q8b8zk6+316twkrPBwM0N5u04ueKyvMsWnPpAGW7NllNkMcBNJA0/bscTziPB7jttnIgw3ap786CUNcl0tUaZ/pcZX2X8NVlb1wqrl95LqQJilh75wYS1QSdw4HsH5fFpquWlq5tHqFMUUrU5QsHA6N2isZ5xOr2tO8kH1+WJWNMy9p2Du9Hlrr9ftDc/bahTlkEo5GSpNfm07R9Tw0F4v/CxNl7euTiX6PRej0HmV6LELHnjBWmKPae+OFCRV7K4U5v+yfW0isVFYNLj4AAAAASUVORK5CYII="},35:function(e,t,a){e.exports=a(69)},40:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(17),s=a.n(c),i=a(34),o=a(10),l=a(11),u=a(13),m=a(12),p=a(14),d=(a(40),a(1)),h=a.n(d),f=a(2),v=a(8),b={user:void 0},E=r.a.createContext(b);function y(e){return g.apply(this,arguments)}function g(){return(g=Object(f.a)(h.a.mark(function e(t){var a,n,r,c,s,i=arguments;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null==(a=i.length>1&&void 0!==i[1]?i[1]:{}).headers&&(a.headers={}),a.headers["Content-Type"]="application/json",e.next=5,fetch(t,a);case 5:if(!(n=e.sent).ok){e.next=11;break}return e.next=9,n.json();case 9:return r=e.sent,e.abrupt("return",r);case 11:return c="",e.prev=12,e.next=15,n.json();case 15:s=e.sent,c=s.error,e.next=22;break;case 19:e.prev=19,e.t0=e.catch(12),c=n.statusText;case 22:throw new Error(c);case 23:case"end":return e.stop()}},e,null,[[12,19]])}))).apply(this,arguments)}function x(e,t){return w.apply(this,arguments)}function w(){return(w=Object(f.a)(h.a.mark(function e(t,a){var n,r=arguments;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null==(n=r.length>2&&void 0!==r[2]?r[2]:{}).headers&&(n.headers={}),n.headers.Authorization="Bearer ".concat(a),e.abrupt("return",y(t,n));case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function N(){return k.apply(this,arguments)}function k(){return(k=Object(f.a)(h.a.mark(function e(){var t,a,n=arguments;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{limit:"10"},a=new URLSearchParams(t),e.abrupt("return",y("/api/countries?".concat(a.toString())));case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function j(){return O.apply(this,arguments)}function O(){return(O=Object(f.a)(h.a.mark(function e(){var t,a,n,r=arguments;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:{country_name:"Thailand",limit:"10"},a=new URLSearchParams(t),e.next=4,y("/api/cities?".concat(a.toString()));case 4:return(n=e.sent).results=n.results.map(function(e){return e.country_name=t.country_name,e}),e.abrupt("return",n);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function A(e,t){return S.apply(this,arguments)}function S(){return(S=Object(f.a)(h.a.mark(function e(t,a){var n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URLSearchParams({country_name:t,city_name:a,include_divesites:"true"}),e.next=3,y("/api/cities?".concat(n.toString()));case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}var T={updateNote:function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n,r,c,s,i;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.diveSiteId,n=t.user,r=t.content,c={"Content-Type":"application/json",Authorization:"Bearer ".concat(n.access_token)},s=JSON.stringify({content:r}),e.next=5,y("/api/notes/divesites/".concat(a,"/users/").concat(n.id),{method:"POST",headers:c,body:s});case 5:return i=e.sent,e.abrupt("return",i);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),getNote:function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n,r,c;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.diveSiteId,n=t.user,r={"Content-Type":"application/json",Authorization:"Bearer ".concat(n.access_token)},e.next=4,y("/api/notes/divesites/".concat(a,"/users/").concat(n.id),{headers:r,methods:"POST"});case 4:if(null!=(c=e.sent)){e.next=7;break}return e.abrupt("return","");case 7:return e.abrupt("return",c.content);case 8:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},C={register:function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n,r,c,s;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.email,r=t.password,c={method:"POST",body:JSON.stringify({username:a,email:n,password:r}),headers:{"Content-Type":"application/json"}},e.next=4,y("/auth/api-register",c);case 4:return s=e.sent,console.log("data",s),e.abrupt("return",this.login(n,r));case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),login:function(){var e=Object(f.a)(h.a.mark(function e(t,a){var n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"POST",body:JSON.stringify({email:t,password:a}),headers:{"Content-Type":"application/json"}},e.next=3,y("/auth/api-login",n);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),logout:function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}},e.next=3,y("/auth/api-logout",a);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),isTokenValid:function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x("/auth/check-token",t);case 2:return a=e.sent,n=a.valid,e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},U=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).logout=Object(f.a)(h.a.mark(function e(){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.logout(a.context.user.access_token);case 2:a.context.updateUser(null);case 3:case"end":return e.stop()}},e)})),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar is-dark",id:"nav",role:"navigation","aria-label":"main navigation",style:{paddingLeft:10,paddingRight:10}},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement("a",{href:"/",role:"button",className:"navbar-burger burger","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample"},r.a.createElement("span",{"aria-hidden":"true"}),r.a.createElement("span",{"aria-hidden":"true"}),r.a.createElement("span",{"aria-hidden":"true"}))),r.a.createElement("div",{id:"navbarBasicExample",className:"navbar-menu"},r.a.createElement("div",{className:"navbar-start"},r.a.createElement("a",{href:"/",className:"navbar-item"},r.a.createElement("div",{className:"title",style:{paddingRight:20}},"Reefbase")),r.a.createElement(v.b,{className:"navbar-item",to:"/about"},"About"),r.a.createElement(v.b,{className:"navbar-item",to:"/destinations"},"Destinations"))))}}]),t}(r.a.Component);U.contextType=E;var _=U,B=a(9),R=a(4),I=a(32),L=a.n(I),P=a(33),H=a.n(P),M=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._textarea=void 0,a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"syncNote",value:function(){var e=Object(f.a)(h.a.mark(function e(){var t,a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.site.id,e.next=3,T.getNote({diveSiteId:t,user:this.context.user});case 3:a=e.sent,this._textarea.value=a;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillMount",value:function(){var e=Object(f.a)(h.a.mark(function e(){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.context.user){e.next=2;break}return e.abrupt("return");case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(f.a)(h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.props.site.id!==t.site.id&&(this._textarea.value="");case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"onNoteSave",value:function(){var e=Object(f.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.props.site.id,e.next=3,T.updateNote({diveSiteId:a,user:this.context.user,content:this._textarea.value});case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this,a=this.props,n=a.site,c=a.country,s=a.city;return null==n?r.a.createElement("div",null,r.a.createElement("h2",{className:"title is-two"},"No Dive Site Selected!")):(e=null!=this.context.user?r.a.createElement("div",{className:"full-height"},r.a.createElement("textarea",{autoFocus:!0,className:"textarea",placeholder:"Take notes here.",ref:function(e){return t._textarea=e}}),r.a.createElement("button",{className:"button",onClick:this.onNoteSave.bind(this)},"submit")):r.a.createElement("div",null,r.a.createElement("textarea",{className:"textarea",placeholder:"Notes coming soon!",ref:function(e){return t._textarea=e},disabled:!0})),r.a.createElement("div",null,r.a.createElement("h2",{className:"title is-two"},n.name),r.a.createElement("h3",{className:"subtitle is-four"},s,", ",c),e))}}]),t}(r.a.Component);M.contextType=E;var W=M,D=function(e){var t=e.site,a=(e.lat,e.lng,e.clickHandler),n=void 0===a?function(){}:a;return r.a.createElement("img",{className:"tooltip",onClick:n,src:H.a,alt:"Diver Down Flag","data-tooltip":t.name,style:{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",cursor:"pointer"}})};var z=function(e){var t=Object(n.useState)([]),a=Object(R.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(null),o=Object(R.a)(i,2),l=o[0],u=o[1],m=Object(n.useState)(null),p=Object(R.a)(m,2),d=p[0],v=p[1];return Object(n.useEffect)(function(){Object(f.a)(h.a.mark(function t(){var a,n,r;return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e.match.params.country,e.match.params.city);case 2:a=t.sent,n=a.results[0],u(n),r=n.divesite_set||[],s(r),r.length>0&&v(r[0]);case 8:case"end":return t.stop()}},t)}))()},[e.match.params.country,e.match.params.city]),r.a.createElement("div",null,r.a.createElement("div",{style:{height:"100vh",width:"100%",position:"fixed",top:0}},null!=l&&r.a.createElement(L.a,{bootstrapURLKeys:{key:"AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0"},defaultCenter:l,defaultZoom:l.zoom_level},c.map(function(e){return r.a.createElement(D,{key:e.id,lat:e.lat,lng:e.lng,site:e,clickHandler:function(){v(e)}})}))),r.a.createElement("div",{id:"content"},null!=d?r.a.createElement("section",{className:"section"},r.a.createElement("div",{className:"container is-fluid"},r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-three-quarters"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"tile box is-vertical",id:"main-content"},r.a.createElement(W,{country:e.match.params.country,city:e.match.params.city,site:d,isLoggedIn:!0})))))):null))},J=function(e){return r.a.createElement("div",{className:"level"},e.children)};var K=function(e){var t=e.dest;return r.a.createElement(v.b,{className:"box",to:"/destinations/".concat(t.name),style:{margin:10,height:250,width:250,background:"#102D54"}},r.a.createElement("div",{className:"title is-4",style:{color:"white",height:"100%",verticalAlign:"center"}},t.name," ",r.a.createElement("span",{className:"tag is-dark"},t.num_divesite," divesites")))},V=function(e){var t=e.dest;return r.a.createElement(v.b,{className:"box",to:"/destinations/".concat(t.country_name,"/").concat(t.name),style:{margin:10,height:250,width:250,background:"#102D54"}},r.a.createElement("div",{className:"title is-4",style:{color:"white",height:"100%",verticalAlign:"center"}},t.name," ",r.a.createElement("span",{className:"tag is-dark"},t.num_divesite," divesites")))},Y=function(e){var t=e.dest;return"countries"===e.locationType?r.a.createElement(K,{dest:t}):r.a.createElement(V,{dest:t})},F=function(e){var t=e.breadcrumb,a=e.isLoading,n=e.destinations,c=e.locationType,s=e.hasMore,i=e.loadMoreHandler;return r.a.createElement("div",{className:"section"},r.a.createElement("div",{className:"container"},r.a.createElement(J,null,r.a.createElement("nav",{className:"breadcrumb","aria-label":"breadcrumbs"},r.a.createElement("ul",null,t.map(function(e,a){return r.a.createElement("li",{key:a,className:a===t.length-1?"is-active":""},r.a.createElement(v.b,{to:e.href,className:"title is-3",style:{padding:"10px"}},e.name))})))),r.a.createElement(J,null,r.a.createElement("div",{className:"tile is-parent",style:{flexWrap:"wrap"}},a?Array(10).fill(null).map(function(e){return r.a.createElement("div",{className:"box is-loading",style:{margin:10,height:250,width:250,background:"#102D54"}},r.a.createElement("div",{className:"title is-4",style:{color:"white",height:"100%",verticalAlign:"center"}}))}):n.map(function(e){return r.a.createElement(Y,{dest:e,key:e.id,locationType:c})}),s?r.a.createElement("button",{className:"box",style:{margin:10,height:250,width:250,background:"#487fca",cursor:"pointer"},onClick:function(){return i()}},r.a.createElement("div",{className:"title is-4",style:{color:"white"}},"More")):null))))},G=function(e){var t=e.locationType,a=e.country,c=Object(n.useState)(!0),s=Object(R.a)(c,2),i=s[0],o=s[1],l=Object(n.useState)([]),u=Object(R.a)(l,2),m=u[0],p=u[1],d=Object(n.useState)(null),v=Object(R.a)(d,2),b=v[0],E=v[1],g=[{name:"Countries",href:"/destinations"}];return null!=a&&g.push({name:a,href:"/destinations/".concat(a)}),Object(n.useEffect)(function(){Object(f.a)(h.a.mark(function a(){var n;return h.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,n=null,"countries"!==t){a.next=8;break}return a.next=5,N();case 5:n=a.sent,a.next=11;break;case 8:return a.next=10,j({country_name:String(e.country),limit:"10"});case 10:n=a.sent;case 11:E(n.next),p(n.results),o(!1),a.next=19;break;case 16:a.prev=16,a.t0=a.catch(0),alert(a.t0);case 19:case"end":return a.stop()}},a,null,[[0,16]])}))()},[t,e.country]),r.a.createElement(F,{breadcrumb:g,isLoading:i,destinations:m,locationType:t,hasMore:null!=b,loadMoreHandler:Object(f.a)(h.a.mark(function e(){var t,a,n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=b){e.next=2;break}return e.abrupt("return");case 2:return t=new URL(b),a=t.href.replace(t.origin,""),e.next=6,y(a);case 6:n=e.sent,r=m.concat(n.results),p(r),E(n.next);case 10:case"end":return e.stop()}},e)}))})},X=function(e){var t=Object(n.useState)(""),a=Object(R.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(""),o=Object(R.a)(i,2),l=o[0],u=o[1],m=Object(n.useState)(null),p=Object(R.a)(m,2),d=p[0],v=p[1];function b(){return(b=Object(f.a)(h.a.mark(function t(a){var n;return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,C.login(c,l);case 4:n=t.sent,e.context.updateUser(n),e.history.push("/"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),v(t.t0.message);case 12:return t.abrupt("return",!1);case 13:case"end":return t.stop()}},t,null,[[1,9]])}))).apply(this,arguments)}return r.a.createElement("form",{onSubmit:function(e){return b.apply(this,arguments)}},r.a.createElement("h3",{className:"title has-text-grey"},"Login"),r.a.createElement("div",{className:"box"},r.a.createElement("div",{className:"field"},r.a.createElement("p",{className:"control has-icons-left"},r.a.createElement("input",{className:"input",type:"email",placeholder:"Email",value:c,onChange:function(e){s(e.target.value)}}),r.a.createElement("span",{className:"icon is-small is-left"},r.a.createElement("i",{className:"fas fa-envelope"})))),r.a.createElement("div",{className:"field"},r.a.createElement("div",{className:"control has-icons-left"},r.a.createElement("input",{className:"input",type:"password",placeholder:"Password",value:l,onChange:function(e){u(e.target.value)}}),r.a.createElement("span",{className:"icon is-small is-left"},r.a.createElement("i",{className:"fas fa-lock"})))),r.a.createElement("button",{className:"button is-block is-info is-fullwidth",type:"submit"},"Login"),null!=d?r.a.createElement("p",{class:"help is-danger"},d):null))},q=Object(B.e)(function(e){return r.a.createElement(E.Consumer,null,function(t){return r.a.createElement("section",{className:"hero is-fullheight"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container has-text-centered"},r.a.createElement("div",{className:"column is-4 is-offset-4"},r.a.createElement(X,Object.assign({},e,{context:t}))))))})}),Q=function(){return r.a.createElement("div",{className:"section"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-half is-offset-one-quarter"},r.a.createElement("h2",{className:"title is-2"},"About"),r.a.createElement("p",null,"The goal of ",r.a.createElement("a",{href:"/",className:"has-text-weight-bold"},"Reefbase")," is to be a place where scuba divers can collect information about a dive site before, during, and after a diving trip."),r.a.createElement("br",null),r.a.createElement("p",null,"Currently, the application is in development mode, so things will change and data could get lost."),r.a.createElement("br",null),r.a.createElement("p",null,"The dive site geo GPS coordinate are from ",r.a.createElement("a",{href:"http://divesites.com",target:"_blank",rel:"noopener noreferrer"},"divesites.com")),r.a.createElement("br",null),r.a.createElement("p",null,"Created by ",r.a.createElement("a",{href:"https://harinsang.com",target:"_blank",rel:"noopener noreferrer"},"Harin Sanghirun"),".")))))};function Z(e){return r.a.createElement(z,e)}function $(e){return"/destinations"===e.location.pathname?r.a.createElement(G,{locationType:"countries"}):r.a.createElement(G,{locationType:"cities",country:e.match.params.country})}var ee=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state=b,a.updateUser=function(e){a.setState({user:e}),localStorage.setItem("user",JSON.stringify(e))};var n=localStorage.getItem("user");if(null!=n){var r=JSON.parse(n)||{};null!=r.access_token&&(a.state.user=r,C.isTokenValid(r.access_token).then(function(e){!1===e&&a.updateUser(null)}))}return a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(E.Provider,{value:Object(i.a)({},this.state,{updateUser:this.updateUser})},r.a.createElement(v.a,null,r.a.createElement("div",null,r.a.createElement(_,null),r.a.createElement(B.b,{exact:!0,path:"/",render:function(){return r.a.createElement(B.a,{to:"/destinations"})}}),r.a.createElement(B.b,{path:"/login/",component:q}),r.a.createElement(B.b,{path:"/about/",component:Q}),r.a.createElement(B.b,{path:"/destinations/",exact:!0,component:$}),r.a.createElement(B.b,{path:"/destinations/:country",exact:!0,component:$}),r.a.createElement(B.b,{path:"/destinations/:country/:city",component:Z}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(ee,null),document.getElementById("page")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,1,2]]]);
//# sourceMappingURL=main.13800fbf.chunk.js.map