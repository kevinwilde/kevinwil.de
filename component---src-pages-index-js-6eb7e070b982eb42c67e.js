(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{153:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return d});var a=n(7),r=n.n(a),o=n(0),l=n.n(o),i=n(155),s=n(162),c=n(157),p=n(158),u=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.site.siteMetadata.title,n=e.allMarkdownRemark.edges;return l.a.createElement(c.a,{location:this.props.location,title:t},l.a.createElement(p.a,{title:"All posts"}),l.a.createElement(s.a,null),n.map(function(e){var t=e.node,n=t.frontmatter.title||t.fields.slug;return l.a.createElement("div",{key:t.fields.slug},l.a.createElement("h3",{style:{marginBottom:"0.5rem"}},l.a.createElement(i.a,{style:{boxShadow:"none"},to:t.fields.slug},n)),l.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}}))}))},t}(l.a.Component);t.default=u;var d="3211505670"}}]);
//# sourceMappingURL=component---src-pages-index-js-6eb7e070b982eb42c67e.js.map