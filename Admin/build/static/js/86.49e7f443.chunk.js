(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[86],{1438:function(e,n,a){"use strict";a.r(n);var t,r=a(673),c=a(114),i=a.n(c),s=a(668),o=a(167),l=a(168),b=a(170),d=a(169),u=a(2),g=a(674),h=a(675),p=a(707),j=a(708),m=a(676),O=a(651),f=(a(670),a(682),a(699)),_=a(663),x=a(650),v=a(653),w=a(658),y=a.n(w),B=a(17),N=new Headers,k=localStorage.getItem("auth");N.append("Authorization","Bearer "+k),N.append("Content-Type","application/json");var S=function(e){Object(b.a)(a,e);var n=Object(d.a)(a);function a(e){var t;return Object(o.a)(this,a),(t=n.call(this,e)).getData=Object(s.a)(i.a.mark((function e(){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.state.company_id,t.setState({isLoading:!0}),e.next=4,Object(f.a)(_.a.GET_BANNER,{company_id:n},"","POST");case 4:a=e.sent,r=a.data,t.setState({isLoading:!1,banner:r.banner,sub_banner:r.sub_banner});case 7:case"end":return e.stop()}}),e)}))),t.state={data:[],company_id:JSON.parse(localStorage.getItem("user")).company_id,isLoading:!1,banner:"",sub_banner:"",image_banner:"",image_sub_banner:"",link_banner:"",link_sub_banner:""},t}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(s.a)(i.a.mark((function e(){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(this.getData(),n=JSON.parse(localStorage.getItem("url")),a=0;a<n.length;a++)"#"+n[a].to==window.location.hash&&1==n[a].hidden&&(window.location.href="#/");case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onChangeImageBanner",value:function(e){var n=this,a=this.state,t=a.company_id,r=a.link_sub_banner,c=a.sub_banner,o=e.target.files,l=new FileReader;l.readAsDataURL(o[0]),l.onload=function(e){n.setState({banner:"",image_banner:e.target.result,link_banner:"".concat(_.a.BASE_URL,"/public/image_banner/").concat(o[0].name)},Object(s.a)(i.a.mark((function e(){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("image",o[0]),e.next=4,Object(f.a)(_.a.UPLOAD_BANNER,n,"","POST");case 4:return e.next=6,Object(f.a)(_.a.ADD_BANNER,{company_id:t,banner:"".concat(_.a.BASE_URL,"/public/image_banner/").concat(o[0].name),sub_banner:""!=r?r:c},"","POST");case 6:case"end":return e.stop()}}),e)}))))}}},{key:"onChangeImageSubBanner",value:function(e){var n=this,a=this.state,t=a.company_id,r=a.link_banner,c=a.banner,o=e.target.files,l=new FileReader;this.setState({sub_banner:""}),l.readAsDataURL(o[0]),l.onload=function(e){n.setState({sub_banner:"",image_sub_banner:e.target.result,link_sub_banner:"".concat(_.a.BASE_URL,"/public/image_banner/").concat(o[0].name)},Object(s.a)(i.a.mark((function e(){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("image",o[0]),e.next=4,Object(f.a)(_.a.UPLOAD_BANNER,n,"","POST");case 4:return e.next=6,Object(f.a)(_.a.ADD_BANNER,{company_id:t,banner:""!=r?r:c,sub_banner:"".concat(_.a.BASE_URL,"/public/image_banner/").concat(o[0].name)},"","POST");case 6:case"end":return e.stop()}}),e)}))))}}},{key:"render",value:function(){var e=this,n=this.state,a=n.banner,t=n.sub_banner,r=n.image_banner,c=n.image_sub_banner;return this.state.isLoading?Object(B.jsx)("div",{className:"sweet-loading",children:Object(B.jsx)(y.a,{css:L,size:50,color:"#123abc",loading:this.state.isLoading,speedMultiplier:1.5})}):Object(B.jsx)("div",{className:"animated fadeIn",children:Object(B.jsx)(g.a,{children:Object(B.jsx)(h.a,{children:Object(B.jsxs)(p.a,{children:[Object(B.jsx)(j.a,{children:"TH\xd4NG TIN BANNER"}),Object(B.jsx)(m.a,{children:Object(B.jsx)(O.V,{children:Object(B.jsx)(O.o,{sm:"12",lg:"12",children:Object(B.jsxs)(O.V,{children:[Object(B.jsxs)(O.o,{sm:"12",lg:"12",children:[Object(B.jsx)(O.L,{children:Object(B.jsxs)("strong",{children:["Banner ch\xednh: ",Object(B.jsx)("a",{href:"".concat(a),children:"".concat(a)})]})}),Object(B.jsx)(x.a,{field:"image",type:"file",onChange:function(n){e.onChangeImageBanner(n)}}),""!=a?Object(B.jsx)("img",{width:"100%",height:"400",src:"".concat(a),style:{marginBottom:20,paddingLeft:150,paddingRight:150}}):Object(B.jsx)("img",{width:"100%",height:"400",src:"".concat(r),style:{marginBottom:20,paddingLeft:150,paddingRight:150},onError:function(e){e.target.onerror=null,e.target.src="https://aina.vn/wp-content/uploads/2021/08/default-image-620x600-1.jpg"}})]}),Object(B.jsxs)(O.o,{sm:"12",lg:"12",children:[Object(B.jsx)(O.L,{children:Object(B.jsxs)("strong",{children:["Banner ph\u1ee5: ",Object(B.jsx)("a",{href:"".concat(t),children:"".concat(t)})]})}),Object(B.jsx)(x.a,{field:"image",type:"file",onChange:function(n){e.onChangeImageSubBanner(n)}}),""!=t?Object(B.jsx)("img",{width:"100%",height:"400",src:"".concat(t),style:{marginBottom:20,paddingLeft:150,paddingRight:150}}):Object(B.jsx)("img",{width:"100%",height:"400",src:"".concat(c),style:{marginBottom:20,paddingLeft:150,paddingRight:150},onError:function(e){e.target.onerror=null,e.target.src="https://aina.vn/wp-content/uploads/2021/08/default-image-620x600-1.jpg"}})]})]})})})})]})})})})}}]),a}(u.Component),L=Object(v.css)(t||(t=Object(r.a)(["\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n"])));n.default=S},650:function(e,n,a){"use strict";a(2);var t=a(644),r=a.n(t),c=a(17),i=function(e){var n=e.field,a=e.value,t=e.label,i=e.error,s=e.type,o=e.onChange,l=e.checkUserExists,b=e.readOnly,d=e.placeholder,u=e.onClick;return Object(c.jsxs)("div",{className:r()("form-group",{"has-error":i}),children:[Object(c.jsx)("label",{className:"control-label",children:t}),Object(c.jsx)("input",{onChange:o,onClick:u,onBlur:l,value:a,type:s,name:n,placeholder:d,readOnly:b,className:"form-control"}),i&&Object(c.jsx)("span",{className:"help-block",children:i})]})};i.defaultProps={type:"text"},n.a=i}}]);
//# sourceMappingURL=86.49e7f443.chunk.js.map