(this["webpackJsonpzenesz-react"]=this["webpackJsonpzenesz-react"]||[]).push([[0],{361:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n.n(s),c=n(31),a=n.n(c),i=n(14),o=n(17),l=n(195),d=n(152),u=(n(220),n(398)),p=n(87),j=n(11),b=n(35),h=n.n(b),m="FETCH_SONGS",O="UPDATE_WITH_ID",f="UPDATE_WITH_WRONG_ID",g="UPDATE_WITH_TERM",x="CANCEL_SEARCH",v="FETCH_SONG",y="CREATE_SONG",k="EDIT_SONG",z="DELETE_SONG",N="NEW_ALERT",S="REMOVE_ALERT",w="ADD_TO_PLAYLIST",C="REMOVE_FROM_PLAYLIST",I="PLAYLIST_NEXT",V="START_PLAYLIST",A="STOP_PLAYLIST",T="CLEAR_PLAYLIST",M="TOGGLE_VISIBILITY",E="MOVE_IN_PLAYLIST",L="LOGIN",P="LOGOUT",D=n(65),_={list:[],currentIndex:0,active:!1,visible:!1},B={list:[],validSearch:!1},F={signedIn:!1,token:null},R=Object(o.c)({songs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return Object(j.a)({},h.a.mapKeys(t.payload,"id"));case v:case y:case k:return Object(j.a)(Object(j.a)({},e),{},Object(p.a)({},t.payload.id,t.payload));case z:return h.a.omit(e,t.payload);default:return e}},searchList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return{list:[t.payload.id],validSearch:!0};case f:return{list:[],validSearch:!0};case g:return{list:h.a.uniq(t.payload.map((function(e){return e.id}))),validSearch:!0};case x:return B;default:return e}},alert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return t.payload;case S:return{};default:return e}},form:u.a,playlist:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return Object(j.a)(Object(j.a)({},e),{},{list:[].concat(Object(D.a)(e.list),[t.payload])});case C:var n=e.list.indexOf(t.payload);if(-1===n)return e;var s=e.currentIndex;n<=s&&(s-=1);var r=Object(D.a)(e.list);return r.splice(n,1),Object(j.a)(Object(j.a)({},e),{},{list:r,currentIndex:s});case I:return Object(j.a)(Object(j.a)({},e),{},{currentIndex:t.payload});case V:return Object(j.a)(Object(j.a)({},e),{},{active:!0});case A:return Object(j.a)(Object(j.a)({},e),{},{active:!1});case T:return Object(j.a)(Object(j.a)({},e),{},{list:[],currentIndex:0,active:!1});case M:return Object(j.a)(Object(j.a)({},e),{},{visible:!e.visible});case E:if(0===t.payload.index&&t.payload.up||t.payload.index===e.list.length-1&&!t.payload.up)return e;var c=t.payload.up?t.payload.index-1:t.payload.index+1,a=Object(j.a)({},e),i=a.list[c];a.list[c]=a.list[t.payload.index],a.list[t.payload.index]=i;var o=0;return e.currentIndex===t.payload.index?o=t.payload.up?-1:1:e.currentIndex===c&&(o=t.payload.up?1:-1),a.currentIndex+=o,a;default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:return{signedIn:!0,token:t.payload};case P:return F;default:return e}}}),G=n(16),K=n(41),H=n(42),U=n(46),Y=n(44),W=n(23),J=(n(77),n(29)),X=Object(J.a)(),q=function(e,t){e.response?401===e.response.status||403===e.response.status?t({type:N,payload:{msg:"Nem vagy bejelentkezve",type:"error"}}):400===e.response.status?t({type:N,payload:{msg:"Hib\xe1s felhaszn\xe1l\xf3n\xe9v vagy jelsz\xf3",type:"error"}}):(t({type:N,payload:{msg:"".concat(e.response.status,": ").concat(e.response.statusText),type:"error"}}),console.error(e.response)):(t({type:N,payload:{msg:"Valami baj van",type:"error"}}),console.error(e)),function(e){setTimeout((function(){return e({type:S})}),5e3)}(t)},Q=function(e,t){e.sort((function(e,n){return e[t]<n[t]?-1:e[t]>n[t]?1:0}))},Z=function(e,t,n){return n.indexOf(e)===t&&e},$=n(197),ee=n(1),te=function(){return W.isMobile?null:Object(ee.jsx)($.a,{effect:"solid"})},ne=n(198),se=n.n(ne),re=function(){return Object(ee.jsxs)("div",{className:"loader-container",children:[Object(ee.jsx)(se.a,{type:"Oval",color:"#999897",visible:!0}),Object(ee.jsx)("p",{className:"big-text",children:"Bet\xf6lt\xe9s..."})]})},ce=n(38),ae=function(e){return Object(ee.jsxs)("select",{className:"ui dropdown",name:"color",value:"#"+e.val,onChange:function(t){return e.setter(t.target.value.slice(1))},style:{backgroundColor:e.val?"#"+e.val:"white"},children:[Object(ee.jsx)("option",{disabled:e.firstDisabled,value:"",style:{backgroundColor:"white"},children:e.defaultText}),function(e){if(e)return e.map((function(e){return Object(ee.jsx)("option",{value:"#"+e,style:{backgroundColor:"#"+e},children:"#"+e},e)}))}(e.colors)]})},ie=function(e){var t=Object(s.useState)(""),n=Object(ce.a)(t,2),r=n[0],c=n[1],a=Object(s.useState)(""),i=Object(ce.a)(a,2),o=i[0],l=i[1],d=Object(s.useState)(!1),u=Object(ce.a)(d,2),p=u[0],j=u[1],b=Object(s.useState)(""),h=Object(ce.a)(b,2),m=h[0],O=h[1];Object(s.useEffect)((function(){var e=setTimeout((function(){l(r)}),350);return function(){clearTimeout(e)}}),[r]),Object(s.useEffect)((function(){o?isNaN(o)?e.term(o,p,m):e.id(o):m?e.term(o,p,m):e.cancel()}),[o]),Object(s.useEffect)((function(){r&&isNaN(r)&&e.term(r,p,m)}),[p]),Object(s.useEffect)((function(){e.term(r,p,m)}),[m]);return Object(ee.jsx)("div",{className:"ui form",children:Object(ee.jsxs)("div",{className:"inline fields centered-container",children:[Object(ee.jsxs)("div",{className:"ten wide field",children:[Object(ee.jsx)("label",{children:"Keres\xe9s"}),Object(ee.jsx)("input",{value:r,onChange:function(e){return c(e.target.value)},placeholder:"\xcdrd be egy \xe9nek sorsz\xe1m\xe1t vagy c\xedm\xe9nek, sz\xf6veg\xe9nek egy r\xe9szlet\xe9t!"})]}),Object(ee.jsx)("div",{className:"three wide field",children:Object(ee.jsxs)("div",{className:"ui checkbox my-check",children:[Object(ee.jsx)("input",{id:"lyricsCheckbox",type:"checkbox",tabIndex:"0",checked:p,onChange:function(){return j(!p)}}),Object(ee.jsx)("label",{htmlFor:"lyricsCheckbox",children:"dalsz\xf6vegben is"})]})}),Object(ee.jsxs)("div",{className:"three wide field",children:[Object(ee.jsx)(ae,{val:m,setter:O,defaultText:"Minden dal",colors:e.colors,firstDisabled:!1}),Object(ee.jsx)("i",{"data-tip":"Keres\xe9s elvet\xe9se",className:"icon bigger-icon times circle gray pointer",onClick:function(){c(""),j(!1),O(""),e.cancel()}})]})]})})},oe=function(e){var t=e.icons.map((function(e,t){return Object(ee.jsx)("i",{className:"icon ".concat(e)},t)}));return Object(ee.jsxs)("button",{"data-tip":e.tip,"aria-label":e.tip,className:"ui button my-button icon ".concat(e.color),onClick:e.onClick,disabled:e.disabled,children:[t,e.text]})},le=n(21),de=n.n(le),ue=n(48),pe=n(199),je=n.n(pe).a.create({baseURL:"https://zenesz-api.herokuapp.com/"}),be=function(){return function(){var e=Object(ue.a)(de.a.mark((function e(t){var n;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,je.get("/songs/?format=json");case 3:n=e.sent,t({type:m,payload:n.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),q(e.t0,t);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},he=function(e){return function(){var t=Object(ue.a)(de.a.mark((function t(n){var s;return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.get("/songs/".concat(e,"/?format=json"));case 3:s=t.sent,n({type:v,payload:s.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),q(t.t0,n);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},me=function(e){return function(){var t=Object(ue.a)(de.a.mark((function t(n,s){return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.delete("/songs/".concat(e,"/"),{headers:{Authorization:"Token ".concat(s().auth.token)}});case 3:s().playlist.list.includes(parseInt(e))&&n({type:C,payload:parseInt(e)}),n({type:z,payload:e}),X.push("/zenesz/"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),q(t.t0,n);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e,n){return t.apply(this,arguments)}}()},Oe=function(e){return{type:w,payload:e}},fe=function(e){return{type:C,payload:e}},ge=function(e,t){if(t.active)return e?t.currentIndex===t.list.length-1?(X.push("/zenesz/songs/".concat(t.list[0])),{type:I,payload:0}):(X.push("/zenesz/songs/".concat(t.list[t.currentIndex+1])),{type:I,payload:t.currentIndex+1}):t.currentIndex<1?(X.push("/zenesz/songs/".concat(t.list[t.list.length-1])),{type:I,payload:t.list.length-1}):(X.push("/zenesz/songs/".concat(t.list[t.currentIndex-1])),{type:I,payload:t.currentIndex-1})},xe=function(){return{type:A}},ve=function(){return{type:M}},ye=function(){return{type:S}},ke=function(e){Object(U.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(K.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={loaded:!1,sortById:!0,colors:[]},e.addToPlaylist=function(t,n){e.props.addToPlaylist(n),t.stopPropagation()},e.removeFromPlaylist=function(t,n){e.props.removeFromPlaylist(n),t.stopPropagation()},e.renderSmallButtons=function(t){if(e.props.plVisible||W.isMobileOnly)return Object(ee.jsxs)("div",{className:"right-left",children:[Object(ee.jsx)("i",{"data-tip":"Hozz\xe1ad\xe1s a lej\xe1tsz\xe1si list\xe1hoz",className:"icon bigger-icon plus circle green",onClick:function(n){return e.addToPlaylist(n,t.id)}}),"\xa0\xa0",Object(ee.jsx)("i",{"data-tip":"Elt\xe1vol\xedt\xe1s a lej\xe1tsz\xe1si list\xe1r\xf3l",className:"icon bigger-icon minus circle red",onClick:function(n){return e.removeFromPlaylist(n,t.id)}})]})},e.renderSong=function(t,n){return Object(ee.jsx)("div",{style:{backgroundColor:"#"+t.color},className:"column pointer hover-grey my-bottom-border ".concat(n%3===0||W.isMobileOnly?"":"left-border"),onClick:function(){return X.push("/zenesz/songs/".concat(t.id))},children:Object(ee.jsxs)("div",{className:"content right-left",children:[Object(ee.jsx)("div",{className:"next-to",children:Object(ee.jsxs)("h3",{className:"header my-header-text",children:[t.id,". ",t.title]})}),e.renderSmallButtons(t)]})},t.id)},e}return Object(H.a)(n,[{key:"componentDidMount",value:function(){this.props.removeAlert(),this.props.fetchSongs(),this.props.stopPlaylist()}},{key:"componentDidUpdate",value:function(){this.state.loaded||h.a.isEmpty(this.props.songs)||this.setState({colors:this.props.songs.map((function(e){return e.color})).filter(Z),loaded:!0})}},{key:"render",value:function(){var e=this;if(h.a.isEmpty(this.props.songs)&&!this.state.loaded)return Object(ee.jsx)(re,{});this.state.sortById?Q(this.props.songs,"id"):Q(this.props.songs,"title");var t=this.props.searchList,n=[],s=0===(n=t.validSearch?t.list.map((function(t,n){return e.renderSong(e.props.songs.find((function(e){return e.id===t})),n)})):this.props.songs.map((function(t,n){return e.renderSong(t,n)}))).length?Object(ee.jsx)("p",{className:"big-text centered-text",children:"Nincs tal\xe1lat!"}):null;return Object(ee.jsxs)("div",{className:"ui container",children:[Object(ee.jsx)(te,{}),Object(ee.jsxs)("div",{className:"ui ".concat(W.isMobileOnly?"":"stackable grid"),children:[Object(ee.jsx)("div",{className:"twelve wide column",children:Object(ee.jsx)(ie,{id:this.props.findId,term:this.props.searchSongs,cancel:this.props.cancelSearch,colors:this.state.colors})}),Object(ee.jsx)("div",{className:"four wide column ",children:Object(ee.jsxs)("div",{className:"centered-container",children:[Object(ee.jsx)(oe,{color:"blue",onClick:function(){return e.setState({sortById:!0})},icons:["sort numeric down"],tip:"\xc9nekek rendez\xe9se sorsz\xe1m szerint",disabled:this.state.sortById||this.props.searchList.validSearch}),Object(ee.jsx)(oe,{color:"blue",onClick:function(){return e.setState({sortById:!1})},icons:["sort alphabet down"],tip:"\xc9nekek rendez\xe9se c\xedm szerint",disabled:!this.state.sortById||this.props.searchList.validSearch}),Object(ee.jsx)(oe,{color:"green",onClick:this.props.toggleVisibility,icons:["play circle"],text:" Lej\xe1tsz\xe1si lista"})]})})]}),Object(ee.jsx)("div",{className:"ui stackable three column grid",children:n}),s]})}}]),n}(r.a.Component),ze=Object(i.b)((function(e){return{songs:Object.values(e.songs),searchList:e.searchList,plVisible:e.playlist.visible}}),{fetchSongs:be,removeAlert:ye,searchSongs:function(e,t,n){return function(){var s=Object(ue.a)(de.a.mark((function s(r){var c,a,i;return de.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(s.prev=0,""!==e||""!==n){s.next=5;break}r({type:x}),s.next=18;break;case 5:return""===e&&(e="---noval---"),c=n?n+"/":"",s.next=9,je.get("/search-title/".concat(e,"/").concat(c));case 9:if(a=s.sent,!t){s.next=17;break}return s.next=13,je.get("/search-lyrics/".concat(e,"/").concat(c));case 13:i=s.sent,r({type:g,payload:[].concat(Object(D.a)(a.data),Object(D.a)(i.data))}),s.next=18;break;case 17:r({type:g,payload:a.data});case 18:s.next=23;break;case 20:s.prev=20,s.t0=s.catch(0),q(s.t0,r);case 23:case"end":return s.stop()}}),s,null,[[0,20]])})));return function(e){return s.apply(this,arguments)}}()},findId:function(e){return function(){var t=Object(ue.a)(de.a.mark((function t(n){var s;return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.get("/songs/".concat(e,"/?format=json"));case 3:s=t.sent,n({type:O,payload:s.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),t.t0.response&&404===t.t0.response.status?n({type:f}):q(t.t0,n);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},addToPlaylist:Oe,removeFromPlaylist:fe,playlistNext:ge,stopPlaylist:xe,cancelSearch:function(){return{type:x}},toggleVisibility:ve})(ke),Ne=n(397),Se=n(395),we=n(32),Ce=n(393),Ie=n(394),Ve=n(396),Ae=Object(i.b)((function(e){return{alert:e.alert}}),{removeAlert:ye})((function(e){var t=e.alert.msg?Object(ee.jsx)(Ce.a,{onClose:function(){e.removeAlert()},severity:e.alert.type,children:e.alert.msg}):null,n=Object(s.useState)(!1),r=Object(ce.a)(n,2),c=r[0],a=r[1];return Object(ee.jsxs)(Ie.a,{onClose:function(){return a(!1)},onOpen:function(){return a(!0)},open:c,trigger:e.children,children:[Object(ee.jsx)(Ie.a.Header,{children:e.header}),Object(ee.jsx)(Ie.a.Content,{children:Object(ee.jsx)(Ie.a.Description,{children:e.content})}),Object(ee.jsxs)(Ie.a.Actions,{children:[Object(ee.jsx)("div",{className:"centered",children:t}),Object(ee.jsx)(Ve.a,{onClick:function(){return a(!1)},children:e.closeText}),Object(ee.jsx)(Ve.a,{content:e.approveText,onClick:function(){e.onApprove()},negative:!0})]})]})})),Te=function(e){var t=e.input,n=e.label,s=e.meta,r=e.type,c=e.disabled,a=e.wide,i=e.tip;return Object(ee.jsxs)("div",{className:"".concat(a," field ").concat(s.error&&s.touched?"error":""),children:[Object(ee.jsx)("label",{children:n}),Object(ee.jsx)("input",Object(j.a)(Object(j.a)({},t),{},{type:r,autoComplete:"off",disabled:c,"data-tip":i})),Le(s)]})},Me=function(e){var t=e.type,n=e.disabled,s=e.val,r=e.setter,c=e.change;return Object(ee.jsx)("input",{value:s,type:t,autoComplete:"off",disabled:n,id:"colorPicker",onChange:function(e){r(e.target.value),c("color",e.target.value)}})},Ee=function(e){var t=e.input,n=e.label,s=e.meta,r=e.tip,c=e.rows;return Object(ee.jsxs)("div",{className:"field ".concat(s.error&&s.touched?"error":""),children:[Object(ee.jsx)("label",{children:n}),Object(ee.jsx)("textarea",Object(j.a)(Object(j.a)({className:"roboto"},t),{},{autoComplete:"off","data-tip":r,rows:c})),Le(s)]})},Le=function(e){var t=e.error;if(e.touched&&t)return Object(ee.jsx)("div",{className:"ui error message",children:Object(ee.jsx)("div",{className:"header",children:t})})},Pe=Object(Se.a)({form:"songForm",validate:function(e){var t={};return e.id||(t.id="Add meg az \xe9nek sorsz\xe1m\xe1t!"),e.title||(t.title="Add meg az \xe9nek c\xedm\xe9t!"),e.lyrics||(t.lyrics="Add meg a dalsz\xf6veget!"),t}})((function(e){var t=Object(s.useState)(e.initialValues.color?"existing":"none"),n=Object(ce.a)(t,2),r=n[0],c=n[1],a=Object(s.useState)(e.initialValues.color?e.initialValues.color:""),i=Object(ce.a)(a,2),o=i[0],l=i[1],d=Object(s.useState)(e.initialValues.color?"#"+e.initialValues.color:""),u=Object(ce.a)(d,2),p=u[0],j=u[1],b=function(t){switch(t){case"existing":e.change("color",o);break;case"new":e.change("color",p);break;default:e.change("color","")}c(t)};return Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsxs)("form",{className:"ui form error",onSubmit:e.handleSubmit((function(t){e.onSubmit(t)})),children:[Object(ee.jsx)(te,{}),Object(ee.jsxs)("div",{className:"fields",children:[Object(ee.jsx)(Ne.a,{wide:"three wide",tip:"Az \xe9nek sorsz\xe1ma. Egyedi, k\xe9s\u0151bb nem v\xe1ltoztathat\xf3",name:"id",component:Te,label:"Sorsz\xe1m",type:"number",props:{disabled:e.edit}}),Object(ee.jsx)(Ne.a,{wide:"thirteen wide",name:"title",component:Te,label:"C\xedm",type:"text"})]}),Object(ee.jsx)("label",{children:"Sz\xedn"}),Object(ee.jsxs)("div",{className:"fields",children:[Object(ee.jsx)("div",{className:"three wide field",children:Object(ee.jsx)("div",{className:"ui form",children:Object(ee.jsxs)("div",{className:"grouped fields",children:[Object(ee.jsx)("div",{className:"field",children:Object(ee.jsxs)("div",{className:"ui radio checkbox",children:[Object(ee.jsx)("input",{type:"radio",name:"color",checked:"none"===r,id:"none",onChange:function(){return b("none")}}),Object(ee.jsx)("label",{className:"pointer",htmlFor:"none",children:"Nincs sz\xedn"})]})}),Object(ee.jsx)("div",{className:"field",children:Object(ee.jsxs)("div",{className:"ui radio checkbox",children:[Object(ee.jsx)("input",{type:"radio",name:"color",checked:"existing"===r,id:"existing",onChange:function(){return b("existing")}}),Object(ee.jsx)("label",{className:"pointer",htmlFor:"existing",children:"L\xe9tez\u0151 sz\xedn"})]})}),Object(ee.jsx)("div",{className:"field",children:Object(ee.jsxs)("div",{className:"ui radio checkbox",children:[Object(ee.jsx)("input",{type:"radio",name:"color",checked:"new"===r,id:"new",onChange:function(){return b("new")}}),Object(ee.jsx)("label",{className:"pointer",htmlFor:"new",children:"\xdaj sz\xedn"})]})})]})})}),Object(ee.jsx)("div",{className:"thirteen wide field",children:function(){switch(r){case"existing":return Object(ee.jsx)(Ne.a,{name:"color",component:ae,change:e.change,colors:e.colors,val:o,setter:function(t){l(t),e.change("color","#"+t)},defaultText:"V\xe1lassz egy sz\xednt",firstDisabled:!0});case"new":return Object(ee.jsx)(Ne.a,{name:"color",component:Me,change:e.change,type:"color",val:p,setter:j});default:return}}()})]}),Object(ee.jsx)(Ne.a,{tip:"Az alkalmaz\xe1s dupla sork\xf6z\xf6kn\xe9l bontja versszakokra a sz\xf6veget.",rows:10,name:"lyrics",component:Ee,label:"Dalsz\xf6veg"}),Object(ee.jsx)(Ne.a,{name:"desc",component:Ee,label:"Megjegyz\xe9s (opcion\xe1lis)",rows:2}),e.edit?Object(ee.jsxs)("div",{className:"ui segment",children:[Object(ee.jsxs)("div",{className:"ui two column very relaxed grid",children:[Object(ee.jsxs)("div",{className:"column",children:[Object(ee.jsx)("button",{className:"ui button primary ".concat(W.isMobileOnly?"my-bigger-button":""),children:"Ment\xe9s"}),Object(ee.jsx)(we.a,{to:"/zenesz/songs/".concat(e.id),className:"ui button grey ".concat(W.isMobileOnly?"my-bigger-button":""),children:"M\xe9gse"})]}),Object(ee.jsx)("div",{className:"column jobbra",children:Object(ee.jsx)(Ae,{header:"Biztosan t\xf6rl\xf6d ezt az \xe9neket?",content:"Biztosan t\xf6rl\xf6d a(z) ".concat(e.initialValues.title," \xe9neket? Ezt k\xe9s\u0151bb nem tudod visszavonni!"),closeText:"M\xe9gse",approveText:"T\xf6rl\xe9s",onApprove:e.onDeleteClick,children:Object(ee.jsx)("button",{type:"button",className:"ui button negative ".concat(W.isMobileOnly?"my-bigger-button":""),children:"\xc9nek t\xf6rl\xe9se"})})})]}),Object(ee.jsx)("div",{className:"ui vertical divider",children:"vagy"})]}):Object(ee.jsx)("button",{className:"ui button primary",children:"Ment\xe9s"})]}),e.children]})})),De=function(e){Object(U.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(K.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={loaded:!1,colors:[]},e}return Object(H.a)(n,[{key:"componentDidMount",value:function(){this.props.fetchSongs(),this.props.stopPlaylist(),this.props.plVisible&&this.props.toggleVisibility()}},{key:"componentDidUpdate",value:function(){this.state.loaded||h.a.isEmpty(this.props.songs)||this.setState({loaded:!0,colors:this.props.songs.map((function(e){return e.color})).filter(Z)})}},{key:"render",value:function(){return this.props.biggestID>0?Object(ee.jsxs)("div",{className:"ui container",children:[Object(ee.jsx)("h2",{className:"ui header",children:"\xdaj \xe9nek felv\xe9tele"}),Object(ee.jsx)(Pe,{onSubmit:this.props.createSong,initialValues:{id:this.props.biggestID+1},colors:this.state.colors})]}):Object(ee.jsx)(re,{})}}]),n}(r.a.Component),_e=Object(i.b)((function(e){return{plVisible:e.playlist.visible,biggestID:Math.max.apply(Math,Object(D.a)(Object.values(e.songs).map((function(e){return e.id})))),songs:Object.values(e.songs)}}),{createSong:function(e){return function(){var t=Object(ue.a)(de.a.mark((function t(n,s){var r,c;return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=e.color?e.color.slice(1):"",t.next=4,je.post("/songs/",{id:parseInt(e.id),title:e.title,lyrics:e.lyrics.split("\n\n").join("###"),desc:e.desc||"",color:r},{headers:{Authorization:"Token ".concat(s().auth.token)}});case 4:c=t.sent,n({type:y,payload:c.data}),X.push("/zenesz/songs/".concat(e.id)),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0.response),q(t.t0,n);case 13:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e,n){return t.apply(this,arguments)}}()},stopPlaylist:xe,toggleVisibility:ve,fetchSongs:be})(De),Be=function(e){Object(U.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(K.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={loaded:!1,colors:[]},e}return Object(H.a)(n,[{key:"componentDidMount",value:function(){this.props.fetchSong(this.props.match.params.id),this.props.fetchSongs(),this.props.stopPlaylist(),this.props.plVisible&&this.props.toggleVisibility()}},{key:"componentDidUpdate",value:function(){!this.state.loaded&&this.props.songs.length>1&&this.setState({loaded:!0,colors:this.props.songs.map((function(e){return e.color})).filter(Z)})}},{key:"render",value:function(){var e=this;if(!this.props.song)return Object(ee.jsx)(re,{});var t=this.props.song;return Object(ee.jsxs)("div",{className:"ui container",children:[Object(ee.jsx)("h2",{className:"ui header",children:"\xc9nek szerkeszt\xe9se"}),Object(ee.jsx)(Pe,{onSubmit:function(t){return e.props.editSong(e.props.match.params.id,t)},initialValues:{id:t.id,title:t.title,lyrics:t.verses.join("\n\n"),desc:t.desc,color:t.color?t.color:""},edit:!0,id:t.id,onDeleteClick:function(){return e.props.deleteSong(e.props.match.params.id)},colors:this.state.colors})]})}}]),n}(r.a.Component),Fe=Object(i.b)((function(e,t){return{song:e.songs[t.match.params.id],songs:Object.values(e.songs),plVisible:e.playlist.visible}}),{editSong:function(e,t){return function(){var n=Object(ue.a)(de.a.mark((function n(s,r){var c;return de.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,je.patch("/songs/".concat(e,"/"),{title:t.title,lyrics:t.lyrics.split("\n\n").join("###"),desc:t.desc||"",color:t.color.slice(1)},{headers:{Authorization:"Token ".concat(r().auth.token)}});case 3:c=n.sent,s({type:k,payload:c.data}),X.push("/zenesz/songs/".concat(e)),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),q(n.t0,s);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e,t){return n.apply(this,arguments)}}()},fetchSongs:be,fetchSong:he,stopPlaylist:xe,toggleVisibility:ve,deleteSong:me})(Be),Re=18,Ge=function(e){Object(U.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(K.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={fontSize:Re,deleteModalActive:!1,deletePassword:"",oneVerseModeActive:!1,currentVerse:0,showButtons:!W.isMobileOnly,twoColumnMode:!1,showDesc:!1},e.handleKeyDown=function(t){switch(t.code){case"ArrowRight":e.handleVerseChange(!0);break;case"ArrowLeft":e.handleVerseChange(!1)}},e.onSizeChange=function(t){t&&e.state.fontSize<70?e.setState({fontSize:e.state.fontSize+3}):!t&&e.state.fontSize>8&&e.setState({fontSize:e.state.fontSize-3})},e.onDescChange=function(){e.setState({showDesc:!e.state.showDesc})},e.handleModeSwitch=function(){e.state.oneVerseModeActive?e.setState({oneVerseModeActive:!1,fontSize:Re}):e.setState({oneVerseModeActive:!0,fontSize:60})},e.handleVerseChange=function(t){t?e.setState({currentVerse:(e.state.currentVerse+1)%e.props.song.verses.length}):0===e.state.currentVerse?e.setState({currentVerse:e.props.song.verses.length-1}):e.setState({currentVerse:(e.state.currentVerse-1)%e.props.song.verses.length})},e.handleFontSizeReset=function(){e.state.oneVerseModeActive?e.setState({fontSize:60}):e.setState({fontSize:Re})},e.onPlaylistAdd=function(){e.props.addToPlaylist(parseInt(e.props.match.params.id)),e.props.plVisible||e.props.toggleVisibility()},e.renderLine=function(e,t){var n=(e.match(/ {3}/g)||[]).length;return Object(ee.jsxs)("span",{className:"".concat(n>0?"blue":""),children:[e,Object(ee.jsx)("br",{})]},t)},e.renderVerse=function(t,n){var s=t.split("\n").map((function(t,n){return e.renderLine(t,n)}));return Object(ee.jsx)("p",{style:{fontSize:"".concat(e.state.fontSize,"px")},className:"my-p",children:s},n)},e.renderVerses=function(){if(!e.state.oneVerseModeActive){if(e.state.twoColumnMode){var t=e.props.song.verses.map((function(t,n){return n+1<=Math.ceil(e.props.song.verses.length/2)?e.renderVerse(t,n):null})),n=e.props.song.verses.map((function(t,n){return n+1>Math.ceil(e.props.song.verses.length/2)?e.renderVerse(t,n):null}));return Object(ee.jsxs)("div",{className:"ui container grid nowrap roboto",children:[Object(ee.jsx)("div",{className:"eight wide column",children:t}),Object(ee.jsx)("div",{className:"eight wide column nowrap roboto",children:n})]})}return Object(ee.jsxs)("div",{className:"ui container nowrap roboto",children:[" ",e.props.song.verses.map((function(t,n){return e.renderVerse(t,n)}))]})}if(!e.props.song.verses[e.state.currentVerse])return Object(ee.jsx)(re,{});var s=e.props.song.verses[e.state.currentVerse].split("\n").map((function(t,n){return e.renderLine(t,n)}));return Object(ee.jsx)("div",{children:Object(ee.jsx)("p",{style:{fontSize:"".concat(e.state.fontSize,"px")},children:s})})},e.renderButtons=function(){var t=e.props.signedIn?Object(ee.jsx)(we.a,{"data-tip":"\xc9nek szerkezt\xe9se vagy t\xf6rl\xe9se",className:"ui button my-button icon yellow",to:"/zenesz/songs/edit/".concat(e.props.match.params.id),children:Object(ee.jsx)("i",{className:"icon edit"})}):null,n=e.props.song.desc?Object(ee.jsx)(oe,{tip:"Megjegyz\xe9s megjelen\xedt\xe9se",color:"olive",onClick:function(){return e.onDescChange()},icons:["sticky note outline"]}):null,s=(!W.isMobileOnly&&e.state.showButtons,null),r=e.state.showButtons?Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsx)(we.a,{"data-tip":"Vissza a keres\xe9shez",className:"ui button my-button icon grey",to:"/zenesz/",children:Object(ee.jsx)("i",{className:"icon search"})}),t,Object(ee.jsx)(oe,{tip:"".concat(e.state.twoColumnMode?"Egy":"K\xe9t"," has\xe1b"),color:"primary",onClick:function(){return e.setState({twoColumnMode:!e.state.twoColumnMode})},disabled:e.state.oneVerseModeActive,icons:["".concat(e.state.twoColumnMode?"align justify":"columns")]}),n,Object(ee.jsx)(oe,{tip:"Bet\u0171m\xe9ret cs\xf6kkent\xe9se",color:"primary",onClick:function(){return e.onSizeChange(!1)},icons:["font","arrow down"]}),Object(ee.jsx)(oe,{tip:"Bet\u0171m\xe9ret n\xf6vel\xe9se",color:"primary",onClick:function(){return e.onSizeChange(!0)},icons:["font","arrow up "]}),Object(ee.jsx)(oe,{tip:"Bet\u0171m\xe9ret vissza\xe1ll\xedt\xe1sa",color:"primary",onClick:e.handleFontSizeReset,icons:["font","undo"]}),Object(ee.jsx)(oe,{tip:"Hozz\xe1ad\xe1s a lej\xe1tsz\xe1si list\xe1hoz",color:"green",onClick:e.onPlaylistAdd,icons:["plus"]}),Object(ee.jsx)(oe,{color:"green",onClick:e.props.toggleVisibility,icons:["play circle"],text:" Lej\xe1tsz\xe1si lista"})]}):null;return Object(ee.jsxs)(ee.Fragment,{children:[r,s]})},e.renderTitle=function(){return W.isMobileOnly?Object(ee.jsxs)(ee.Fragment,{children:[e.renderButtons(),Object(ee.jsxs)("div",{className:"right-left",children:[Object(ee.jsxs)("div",{children:[Object(ee.jsxs)("h2",{className:"vert-centered",children:[e.props.song.id,". ",e.props.song.title," "]}),Object(ee.jsx)("div",{style:{marginLeft:"10px",height:"30px",width:"30px",borderRadius:"100%",backgroundColor:"#"+e.props.song.color}})]}),Object(ee.jsx)(oe,{color:"gray",onClick:function(){return e.setState({showButtons:!e.state.showButtons})},icons:["bars"],tip:"Gombok elrejt\xe9se/el\u0151hoz\xe1sa"})]}),Object(ee.jsx)("div",{className:"ui divider"})]}):Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsxs)("div",{className:"right-left m-top",children:[Object(ee.jsxs)("div",{className:"next-to",children:[Object(ee.jsxs)("h2",{className:"vert-centered",children:[e.props.song.id,". ",e.props.song.title," "]}),Object(ee.jsx)("div",{style:{marginLeft:"10px",height:"30px",width:"30px",borderRadius:"100%",backgroundColor:"#"+e.props.song.color}})]}),Object(ee.jsx)("h2",{className:"vert-centered",children:e.state.oneVerseModeActive?"".concat(e.state.currentVerse+1,"/").concat(e.props.song.verses.length):""}),Object(ee.jsxs)("div",{children:[Object(ee.jsx)(oe,{color:"gray",onClick:function(){return e.setState({showButtons:!e.state.showButtons})},icons:["bars"],tip:"Gombok elrejt\xe9se/el\u0151hoz\xe1sa"}),e.renderButtons()]})]}),Object(ee.jsx)("div",{className:"ui divider"})]})},e.renderDesc=function(){var t=e.props.song.desc.split("\n").map((function(e,t){return Object(ee.jsxs)("span",{children:[e,Object(ee.jsx)("br",{})]},t)}));return e.state.showDesc?Object(ee.jsxs)("div",{className:"comment",children:[Object(ee.jsxs)("div",{className:"right-left",children:[Object(ee.jsx)("h3",{children:"Megjegyz\xe9sek"}),Object(ee.jsx)("i",{className:"red icon close pointer",onClick:function(){return e.setState({showDesc:!1})}})]}),Object(ee.jsx)("p",{children:t})]}):null},e}return Object(H.a)(n,[{key:"componentDidMount",value:function(){this.props.removeAlert(),this.props.fetchSong(this.props.match.params.id)}},{key:"componentDidUpdate",value:function(e){e.song&&e.song.id!==this.props.song.id&&this.setState({currentVerse:0})}},{key:"render",value:function(){return this.props.song?Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsx)(te,{}),Object(ee.jsxs)("div",{className:"ui container",onKeyDown:this.handleKeyDown,children:[this.renderTitle(),this.renderVerses(),this.renderDesc()]})]}):Object(ee.jsx)(re,{})}}]),n}(r.a.Component),Ke=Object(i.b)((function(e,t){return{song:e.songs[t.match.params.id],plVisible:e.playlist.visible,signedIn:e.auth.signedIn}}),{fetchSong:he,deleteSong:me,removeAlert:ye,addToPlaylist:Oe,toggleVisibility:ve})(Ge),He=function(e){var t=e.input,n=e.label,s=e.meta,r=e.type;return Object(ee.jsxs)("div",{className:"field ".concat(s.error&&s.touched?"error":""),children:[Object(ee.jsx)("label",{children:n}),Object(ee.jsx)("input",Object(j.a)(Object(j.a)({},t),{},{type:r,autoComplete:"off"})),Ue(s)]})},Ue=function(e){var t=e.error;if(e.touched&&t)return Object(ee.jsx)("div",{className:"ui error message",children:Object(ee.jsx)("div",{className:"header",children:t})})},Ye=Object(Se.a)({form:"authForm",validate:function(e){var t={};return e.username||(t.username="Add meg a felhaszn\xe1l\xf3nevet!"),e.password||(t.password="Add meg a jelsz\xf3t!"),t}})(Object(i.b)(null,{login:function(e){var t=e.username,n=e.password;return function(){var e=Object(ue.a)(de.a.mark((function e(s){var r;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,je.post("/api-token-auth/",{username:t,password:n});case 3:r=e.sent,s({type:L,payload:r.data.token}),X.goBack(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),q(e.t0,s);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}})((function(e){return Object(ee.jsx)("div",{className:"ui container",children:Object(ee.jsxs)("form",{className:"ui form error",onSubmit:e.handleSubmit((function(t){e.login(t)})),children:[Object(ee.jsx)(Ne.a,{name:"username",component:He,label:"Felhaszn\xe1l\xf3n\xe9v",type:"text"}),Object(ee.jsx)(Ne.a,{name:"password",component:He,label:"Jelsz\xf3",type:"password"}),Object(ee.jsx)("button",{className:"ui button primary",children:"Bejelentkez\xe9s"})]})})}))),We=Object(i.b)((function(e){return{signedIn:e.auth.signedIn}}),{logout:function(){return{type:P}}})((function(e){var t=e.signedIn?Object(ee.jsx)(we.a,{className:"header-link",onClick:function(){return e.logout()},children:"Kijelentkez\xe9s"}):Object(ee.jsx)(we.a,{to:"/zenesz/login",className:"header-link centered-text",children:"Admin bejelentkez\xe9s"});return Object(ee.jsxs)("div",{className:"footer-container centered-container two-column small-text",children:[Object(ee.jsxs)("p",{className:"centered-text",children:["K\xe9sz\xedtette: Fekete S\xe1muel\xa0",Object(ee.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/Tschonti/zenesz-frontend",children:Object(ee.jsx)("i",{"aria-label":"Forr\xe1sk\xf3d a Github-on",className:"icon github"})}),Object(ee.jsx)("br",{}),"\xa0az\xa0",Object(ee.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://okgy.hu/",children:"\xd6r\xf6mh\xedr Kereszt\xe9ny Gy\xfclekezet"})," sz\xe1m\xe1ra"]}),t]})})),Je=Object(i.b)((function(e){return{alert:e.alert,signedIn:e.auth.signedIn}}),{removeAlert:ye})((function(e){var t=e.alert.msg?Object(ee.jsx)(Ce.a,{onClose:function(){e.removeAlert()},severity:e.alert.type,children:e.alert.msg}):null,n=W.isMobileOnly?Object(ee.jsx)("div",{className:"big-text-nom",children:"\xd6KGY akkordos dicsik"}):Object(ee.jsx)("h2",{children:"\xd6KGY akkordos dicsik"}),s=e.signedIn?Object(ee.jsx)(we.a,{to:"/zenesz/songs/new",className:"item header-link",children:"\xdaj \xe9nek"}):null;return Object(ee.jsxs)("div",{className:"ui secondary pointing menu my-header",children:[Object(ee.jsx)(we.a,{to:"/zenesz",className:"item ",children:n}),Object(ee.jsx)(we.a,{to:"/zenesz",className:"item header-link",children:"\xc9nekek list\xe1ja"}),s,Object(ee.jsx)("div",{className:"centered",children:t})]})})),Xe=function(e){Object(U.a)(n,e);var t=Object(Y.a)(n);function n(){var e;Object(K.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={open:!0},e.renderSong=function(t,n){var s=0===n,r=n===e.props.playlist.list.length-1;return Object(ee.jsx)("div",{className:"item my-item ".concat(e.props.playlist.currentIndex===n?"active":""),children:Object(ee.jsxs)("h5",{className:"header",children:[Object(ee.jsx)("i",{className:"".concat(s?"grey":"pointer"," icon caret up bigger-icon"),onClick:function(){return e.props.moveInPlaylist(n,!0)}}),Object(ee.jsx)("i",{className:"".concat(r?"grey":"pointer"," icon caret down bigger-icon"),onClick:function(){return e.props.moveInPlaylist(n,!1)}}),t.id,". ",t.title,Object(ee.jsx)("div",{className:"right floated",children:Object(ee.jsx)("i",{className:"icon minus circle red pointer",onClick:function(){return e.props.removeFromPlaylist(t.id)}})})]})},n)},e.renderSongList=function(){if(h.a.isEmpty(e.props.songs)||!e.state.open)return null;var t=e.props.playlist.list.map((function(t,n){var s=e.props.songs.find((function(e){return e.id===t}));return s?e.renderSong(s,n):null})),n=t.length>0?"":Object(ee.jsx)("p",{className:"centered-text",children:"A lej\xe1tsz\xe1si lista \xfcres"});return Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsx)("div",{className:"ui relaxed divided ordered list",children:t}),n]})},e.onClear=function(){e.props.clearPlaylist(),e.props.toggleVisibility()},e.onClose=function(t){e.props.toggleVisibility(),t.stopPropagation()},e}return Object(H.a)(n,[{key:"componentDidMount",value:function(){this.props.fetchSongs()}},{key:"render",value:function(){var e=this;if(!this.props.playlist.visible)return null;var t=0===this.props.playlist.list.length?0:this.props.playlist.currentIndex+1,n=this.state.open?Object(ee.jsxs)("div",{className:"right-left pointer",onClick:function(){return e.setState({open:!e.state.open})},children:[Object(ee.jsx)("i",{className:"icon ".concat(this.state.open?"minus":"plus")}),Object(ee.jsx)("i",{className:"red icon close",onClick:this.onClose})]}):null;return Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsxs)("div",{className:"playlist-container",children:[Object(ee.jsx)(te,{}),Object(ee.jsxs)("div",{className:"right-left pointer",onClick:function(){return e.setState({open:!e.state.open})},children:[Object(ee.jsxs)("h3",{children:["Lej\xe1tsz\xe1si lista ","".concat(t,"/").concat(this.props.playlist.list.length)]}),Object(ee.jsxs)("div",{children:[Object(ee.jsx)("i",{className:"icon ".concat(this.state.open?"minus":"plus")}),"\xa0\xa0",Object(ee.jsx)("i",{className:"red icon close",onClick:this.onClose})]})]}),Object(ee.jsxs)("div",{className:"centered-container",children:[Object(ee.jsx)(oe,{disabled:!this.props.playlist.active,tip:"El\u0151z\u0151 \xe9nek",color:"blue",onClick:function(){return e.props.playlistNext(!1,e.props.playlist)},icons:["backward"]}),Object(ee.jsx)(oe,{disabled:this.props.playlist.active||0===this.props.playlist.list.length,tip:"Lej\xe1tsz\xe1si lista ind\xedt\xe1sa",color:"green",onClick:function(){return e.props.startPlaylist(e.props.playlist)},icons:["play"]}),Object(ee.jsx)(oe,{disabled:!this.props.playlist.active,tip:"K\xf6vetkez\u0151 \xe9nek",color:"blue",onClick:function(){return e.props.playlistNext(!0,e.props.playlist)},icons:["forward"]}),Object(ee.jsx)(Ae,{header:"Biztosan t\xf6rl\xf6d a lej\xe1tsz\xe1si list\xe1t?",content:"Biztosan t\xf6rl\xf6d a lej\xe1tsz\xe1si list\xe1t? Ezt k\xe9s\u0151bb nem tudod visszavonni!",closeText:"M\xe9gse",approveText:"T\xf6rl\xe9s",onApprove:this.onClear,children:Object(ee.jsx)(oe,{disabled:0===this.props.playlist.list.length,tip:"Lej\xe1tsz\xe1si lista t\xf6rl\xe9se",color:"negative",icons:["trash alternate"]})})]}),this.renderSongList(),n]})})}}]),n}(r.a.Component),qe=Object(i.b)((function(e){return{songs:Object.values(e.songs),playlist:e.playlist}}),{fetchSongs:be,playlistNext:ge,startPlaylist:function(e){return X.push("/zenesz/songs/".concat(e.list[e.currentIndex])),{type:V}},clearPlaylist:function(){return{type:T}},removeFromPlaylist:fe,toggleVisibility:ve,moveInPlaylist:function(e,t){return{type:E,payload:{index:e,up:t}}}})(Xe),Qe=function(){return Object(ee.jsx)("div",{children:Object(ee.jsxs)(G.b,{history:X,children:[Object(ee.jsx)(Je,{}),Object(ee.jsxs)(G.c,{children:[Object(ee.jsx)(G.a,{path:"/zenesz/",exact:!0,component:ze}),Object(ee.jsx)(G.a,{path:"/zenesz/songs/new",exact:!0,component:_e}),Object(ee.jsx)(G.a,{path:"/zenesz/songs/edit/:id",exact:!0,component:Fe}),Object(ee.jsx)(G.a,{path:"/zenesz/songs/:id",exact:!0,component:Ke}),Object(ee.jsx)(G.a,{path:"/zenesz/login",exact:!0,component:Ye})]}),Object(ee.jsx)(We,{}),Object(ee.jsx)(qe,{})]})})},Ze=(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||o.d)(Object(o.a)(Object(d.save)({states:["playlist"],debounce:500}),l.a))(o.e)(R,Object(d.load)({states:["playlist"]}));a.a.render(Object(ee.jsx)(i.a,{store:Ze,children:Object(ee.jsx)(Qe,{})}),document.getElementById("root"))},77:function(e,t,n){}},[[361,1,2]]]);
//# sourceMappingURL=main.c4ce8e9e.chunk.js.map