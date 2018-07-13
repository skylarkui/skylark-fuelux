/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(t,e,a,i,s,n,o,l){var r,c=null,h=l.Menu=l.WidgetBase.inherit({klassName:"Menu",init:function(e,a){a||(a=e,e=null);var s,n=this;this._options=t.mixin({hide_onmouseleave:0,icons:!0},a),s=e?this.$el=o(e):this.$el=o("<ul class='vakata-context'></ul>");var l=!1;s.on("mouseenter","li",function(t){t.stopImmediatePropagation(),i.contains(this,t.relatedTarget)||(l&&clearTimeout(l),s.find(".vakata-context-hover").removeClass("vakata-context-hover").end(),o(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover"),n._show_submenu(this))}).on("mouseleave","li",function(t){i.contains(this,t.relatedTarget)||o(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")}).on("mouseleave",function(t){o(this).find(".vakata-context-hover").removeClass("vakata-context-hover"),n._options.hide_onmouseleave&&(l=setTimeout(function(t){return function(){n.hide()}}(this),n._options.hide_onmouseleave))}).on("click","a",function(t){t.preventDefault(),o(this).blur().parent().hasClass("vakata-context-disabled")||n._execute(o(this).attr("rel"))===!1||n.hide()}).on("keydown","a",function(t){var e=null;switch(t.which){case 13:case 32:t.type="click",t.preventDefault(),o(t.currentTarget).trigger(t);break;case 37:n.$el.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(),t.stopImmediatePropagation(),t.preventDefault();break;case 38:e=n.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(),e.length||(e=n.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()),e.addClass("vakata-context-hover").children("a").focus(),t.stopImmediatePropagation(),t.preventDefault();break;case 39:n.$el.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(),t.stopImmediatePropagation(),t.preventDefault();break;case 40:e=n.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(),e.length||(e=n.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()),e.addClass("vakata-context-hover").children("a").focus(),t.stopImmediatePropagation(),t.preventDefault();break;case 27:n.hide(),t.preventDefault()}}).on("keydown",function(t){t.preventDefault();var e=n.$el.find(".vakata-contextmenu-shortcut-"+t.which).parent();e.parent().not(".vakata-context-disabled")&&e.click()}),this.render()},render:function(){var t=this._options.items;this._parse(t)&&this.$el.html(this.html),this.$el.width("")},_trigger:function(t){o(document).trigger("context_"+t+".sbswt",{reference:this.reference,element:this.$el,position:{x:this.position_x,y:this.position_y}})},_execute:function(e){return e=this.items[e],!(!e||e._disabled&&(!t.isFunction(e._disabled)||e._disabled({item:e,reference:this.reference,element:this.$el}))||!e.action)&&e.action.call(null,{item:e,reference:this.reference,element:this.$el,position:{x:this.position_x,y:this.position_y}})},_parse:function(e,a){var i=this,s=i._options.reference;if(!e)return!1;a||(i.html="",i.items=[]);var n,o="",l=!1;return a&&(o+="<ul>"),t.each(e,function(e,a){return!a||(i.items.push(a),!l&&a.separator_before&&(o+="<li class='vakata-context-separator'><a href='#' "+(i._options.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>"),l=!1,o+="<li class='"+(a._class||"")+(a._disabled===!0||t.isFunction(a._disabled)&&a._disabled({item:a,reference:s,element:i.$el})?" vakata-contextmenu-disabled ":"")+"' "+(a.shortcut?" data-shortcut='"+a.shortcut+"' ":"")+">",o+="<a href='#' rel='"+(i.items.length-1)+"' "+(a.title?"title='"+a.title+"'":"")+">",i._options.icons&&(o+="<i ",a.icon&&(o+=a.icon.indexOf("/")!==-1||a.icon.indexOf(".")!==-1?" style='background:url(\""+a.icon+"\") center center no-repeat' ":" class='"+a.icon+"' "),o+="></i><span class='vakata-contextmenu-sep'>&#160;</span>"),o+=(t.isFunction(a.label)?a.label({item:e,reference:s,element:i.$el}):a.label)+(a.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+a.shortcut+'">'+(a.shortcut_label||"")+"</span>":"")+"</a>",a.submenu&&(n=i._parse(a.submenu,!0),n&&(o+=n)),o+="</li>",void(a.separator_after&&(o+="<li class='vakata-context-separator'><a href='#' "+(i._options.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>",l=!0)))}),o=o.replace(/<li class\='vakata-context-separator'\><\/li\>$/,""),a&&(o+="</ul>"),a||(i.html=o,i._trigger("parse")),o.length>10&&o},_show_submenu:function(t){if(t=o(t),t.length&&t.children("ul").length){var e=t.children("ul"),a=t.offset().left,i=a+t.outerWidth(),s=t.offset().top,n=e.width(),l=e.height(),c=o(window).width()+o(window).scrollLeft(),h=o(window).height()+o(window).scrollTop();r?t[i-(n+10+t.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left"):t[i+n>c&&a>c-i?"addClass":"removeClass"]("vakata-context-right"),s+l+10>h&&e.css("bottom","-1px"),t.hasClass("vakata-context-right")?a<n&&e.css("margin-right",a-n):c-i<n&&e.css("margin-left",c-i-n),e.show()}},show:function(t,e,a){var i,s,n,l,h,d,u,v,f=!0;switch(f){case!e&&!t:return!1;case!!e&&!!t:this.reference=t,this.position_x=e.x,this.position_y=e.y;break;case!e&&!!t:this.reference=t,i=t.offset(),this.position_x=i.left+t.outerHeight(),this.position_y=i.top;break;case!!e&&!t:this.position_x=e.x,this.position_y=e.y}t&&!a&&o(t).data("vakata_contextmenu")&&(a=o(t).data("vakata_contextmenu")),this.items.length&&(this.$el.appendTo(document.body),s=this.$el,n=this.position_x,l=this.position_y,h=s.width(),d=s.height(),u=o(window).width()+o(window).scrollLeft(),v=o(window).height()+o(window).scrollTop(),r&&(n-=s.outerWidth()-o(t).outerWidth(),n<o(window).scrollLeft()+20&&(n=o(window).scrollLeft()+20)),n+h+20>u&&(n=u-(h+20)),l+d+20>v&&(l=v-(d+20)),this.$el.css({left:n,top:l}).show().find("a").first().focus().parent().addClass("vakata-context-hover"),this.is_visible=!0,c=this,this._trigger("show"))},hide:function(){this.is_visible&&(this.$el.hide().find("ul").hide().end().find(":focus").blur().end().detach(),this.is_visible=!1,c=null,this._trigger("hide"))}});return o(function(){r="rtl"===o(document.body).css("direction"),o(document).on("mousedown.sbswt.popup",function(t){c&&c.$el[0]!==t.target&&!i.contains(c.$el[0],t.target)&&c.hide()}).on("context_show.sbswt.popup",function(t,e){c.$el.find("li:has(ul)").children("a").addClass("vakata-context-parent"),r&&c.$el.addClass("vakata-context-rtl").css("direction","rtl"),c.$el.find("ul").hide().end()})}),h.popup=function(t,e,a){var i=new h({reference:t,items:a});i.show(t,e)},h.hide=function(){c&&c.hide()},h});
//# sourceMappingURL=sourcemaps/menu.js.map
