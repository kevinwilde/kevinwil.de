(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{152:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",function(){return u});var a=n(7),r=n.n(a),o=n(0),i=n.n(o),l=n(157),c=n(158),s=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t=this.props.data.site.siteMetadata.title;return i.a.createElement(l.a,{location:this.props.location,title:t},i.a.createElement(c.a,{title:"404: Not Found"}),i.a.createElement("h1",null,"Not Found"),i.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},e}(i.a.Component);e.default=s;var u="1097489062"},155:function(t,e,n){"use strict";n.d(e,"b",function(){return u});var a=n(0),r=n.n(a),o=n(4),i=n.n(o),l=n(33),c=n.n(l);n.d(e,"a",function(){return c.a});n(156);var s=r.a.createContext({}),u=function(t){return r.a.createElement(s.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},156:function(t,e,n){var a;t.exports=(a=n(159))&&a.default||a},157:function(t,e,n){"use strict";var a=n(7),r=n.n(a),o=n(0),i=n.n(o),l=n(155),c=n(160),s=n.n(c),u=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t,e=this.props,n=e.location,a=e.title,r=e.children;return t="/"===n.pathname?i.a.createElement("h1",{style:{fontSize:"5rem",marginBottom:"3rem",marginTop:0}},i.a.createElement(l.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)):i.a.createElement("h3",{style:{marginTop:0}},i.a.createElement(l.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)),i.a.createElement(i.a.Fragment,null,i.a.createElement(p,null),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:"42rem",padding:"2.5rem 1.25rem"}},i.a.createElement("header",null,t),i.a.createElement("main",null,r),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))},e}(i.a.Component);function p(){return i.a.createElement("div",{style:{background:"black",padding:"1rem 0",display:"flex",justifyContent:"center",alignItems:"center"}},i.a.createElement("a",{style:{color:"yellow",fontWeight:"bold",textDecoration:"none",boxShadow:"none"},href:"https://blacklivesmatter.com/",target:"_blank",rel:"noopener noreferrer"},"Black Lives Matter"),i.a.createElement("img",{height:"18",width:"18",src:s.a,alt:"",role:"presentation",style:{margin:"0 0 0 1rem"}}))}e.a=u},158:function(t,e,n){"use strict";var a=n(161),r=n(0),o=n.n(r),i=n(4),l=n.n(i),c=n(163),s=n.n(c);function u(t){var e=t.description,n=t.lang,r=t.meta,i=t.title,l=a.data.site,c=e||l.siteMetadata.description;return o.a.createElement(s.a,{htmlAttributes:{lang:n},title:i,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:i},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:c}].concat(r)})}u.defaultProps={lang:"en",meta:[],description:""},u.propTypes={description:l.a.string,lang:l.a.string,meta:l.a.arrayOf(l.a.object),title:l.a.string.isRequired},e.a=u},159:function(t,e,n){"use strict";n.r(e);n(34);var a=n(0),r=n.n(a),o=n(4),i=n.n(o),l=n(56),c=n(2),s=function(t){var e=t.location,n=c.default.getResourcesForPathnameSync(e.pathname);return n?r.a.createElement(l.a,Object.assign({location:e,pageResources:n},n.json)):null};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},e.default=s},160:function(t,e){t.exports="data:image/png;base64,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"},161:function(t){t.exports={data:{site:{siteMetadata:{title:"Kevin Wilde",description:"Personal website for Kevin Wilde",author:"Kevin Wilde"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-b0be725962f9d9808c1b.js.map