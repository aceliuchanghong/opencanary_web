webpackJsonp([5],{"8Nmh":function(t,i){},IOPI:function(t,i,s){var h,a;
/*!
 * sChart JavaScript Library v2.0.0
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
/*!
 * sChart JavaScript Library v2.0.0
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
a=function(t){"use strict";function i(t,i,s,h){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.dpi=window.devicePixelRatio||1,this.type=i,this.data=s,this.dataLength=this.data.length,this.showValue=!0,this.autoWidth=!1,this.width=this.canvas.width*this.dpi,this.height=this.canvas.height*this.dpi,this.topPadding=50*this.dpi,this.leftPadding=50*this.dpi,this.rightPadding=0*this.dpi,this.bottomPadding=50*this.dpi,this.yEqual=5,this.yLength=0,this.xLength=0,this.yFictitious=0,this.yRatio=0,this.bgColor="#ffffff",this.fillColor="#1E9FFF",this.axisColor="#666666",this.contentColor="#eeeeee",this.titleColor="#000000",this.title="",this.titlePosition="top",this.radius=100*this.dpi,this.innerRadius=70*this.dpi,this.colorList=["#1E9FFF","#13CE66","#F7BA2A","#FF4949","#72f6ff","#199475","#e08031","#726dd1"],this.legendColor="#000000",this.legendTop=40*this.dpi,this.totalValue=this.getTotalValue(),this.init(h)}return i.prototype={init:function(t){if(0===this.dataLength)return!1;if(t){var i=["topPadding","leftPadding","rightPadding","bottomPadding","radius","innerRadius","legendTop"];for(var s in t)"colorList"===s&&Array.isArray(t[s])?this[s]=t[s].concat(this[s]):i.indexOf(s)>-1?this[s]=t[s]*this.dpi:this[s]=t[s]}t.autoWidth?(this.width=this.canvas.width=this.canvas.parentNode.offsetWidth*this.dpi,this.height=this.canvas.height=this.canvas.parentNode.offsetHeight*this.dpi,this.canvas.setAttribute("style","width:"+this.canvas.parentNode.offsetWidth+"px;height:"+this.canvas.parentNode.offsetHeight+"px;")):(this.canvas.setAttribute("style","width:"+this.canvas.width+"px;height:"+this.canvas.height+"px;"),this.canvas.width*=this.dpi,this.canvas.height*=this.dpi),"bar"===this.type||"line"===this.type?(this.yLength=Math.floor((this.height-this.topPadding-this.bottomPadding-10)/this.yEqual),this.xLength=Math.floor((this.width-this.leftPadding-this.rightPadding-10)/this.dataLength),this.yFictitious=this.getYFictitious(this.data),this.yRatio=this.yLength/this.yFictitious,this.drawBarUpdate()):this.drawPieUpdate()},drawBarUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawAxis(),this.drawPoint(),this.drawTitle(),this.drawBarChart()},drawPieUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawLegend(),this.drawTitle(),this.drawPieChart()},drawBarChart:function(){this.ctx.fillStyle=this.fillColor,this.ctx.strokeStyle=this.fillColor;for(var t=0;t<this.dataLength;t++)this.data[t].left=this.leftPadding+this.xLength*(t+.25),this.data[t].top=this.height-this.bottomPadding-this.data[t].value*this.yRatio,this.data[t].right=this.leftPadding+this.xLength*(t+.75),this.data[t].bottom=this.height-this.bottomPadding,"line"===this.type?(this.ctx.beginPath(),this.ctx.arc(this.data[t].left+this.xLength/4,this.data[t].top,2,0,2*Math.PI,!0),this.ctx.fill(),0!==t&&(this.ctx.moveTo(this.data[t].left+this.xLength/4,this.data[t].top),this.ctx.lineTo(this.data[t-1].left+this.xLength/4,this.data[t-1].top)),this.ctx.stroke()):"bar"===this.type&&this.ctx.fillRect(this.data[t].left,this.data[t].top,this.data[t].right-this.data[t].left,this.data[t].bottom-this.data[t].top),this.showValue&&(this.ctx.font=12*this.dpi+"px Arial",this.ctx.fillText(this.data[t].value,this.data[t].left+this.xLength/4,this.data[t].top-5))},drawPieChart:function(){for(var t=this.width/2,i=this.height/2,s=0,h=0,a=0;a<this.dataLength;a++)this.ctx.beginPath(),this.ctx.fillStyle=this.colorList[a],this.ctx.moveTo(t,i),this.data[a].start=0===a?-Math.PI/2:this.data[a-1].end,this.data[a].end=this.data[a].start+this.data[a].value/this.totalValue*2*Math.PI,this.ctx.arc(t,i,this.radius,this.data[a].start,this.data[a].end),this.ctx.closePath(),this.ctx.fill(),this.data[a].middle=(this.data[a].start+this.data[a].end)/2,s=Math.ceil(Math.abs(this.radius*Math.cos(this.data[a].middle))),h=Math.floor(Math.abs(this.radius*Math.sin(this.data[a].middle))),this.ctx.strokeStyle=this.colorList[a],this.data[a].middle<=0?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i-h),this.ctx.lineTo(t+s+10,i-h-10),this.ctx.moveTo(t+s+10,i-h-10),this.ctx.lineTo(t+s+this.radius/2,i-h-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i-h-5)):this.data[a].middle>0&&this.data[a].middle<=Math.PI/2?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i+h),this.ctx.lineTo(t+s+10,i+h+10),this.ctx.moveTo(t+s+10,i+h+10),this.ctx.lineTo(t+s+this.radius/2,i+h+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i+h+15)):this.data[a].middle>Math.PI/2&&this.data[a].middle<Math.PI?(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i+h),this.ctx.lineTo(t-s-10,i+h+10),this.ctx.moveTo(t-s-10,i+h+10),this.ctx.lineTo(t-s-this.radius/2,i+h+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i+h+15)):(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i-h),this.ctx.lineTo(t-s-10,i-h-10),this.ctx.moveTo(t-s-10,i-h-10),this.ctx.lineTo(t-s-this.radius/2,i-h-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i-h-5));"ring"===this.type&&(this.ctx.beginPath(),this.ctx.fillStyle=this.bgColor,this.ctx.arc(t,i,this.innerRadius,0,2*Math.PI),this.ctx.fill())},drawAxis:function(){this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+.5,this.topPadding+.5),this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding+.5),this.ctx.stroke()},drawPoint:function(){this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="center",this.ctx.fillStyle=this.axisColor;for(var t=0;t<this.dataLength;t++){var i=this.data[t].name,s=this.xLength*(t+1);this.ctx.moveTo(this.leftPadding+s+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+s+.5,this.height-this.bottomPadding+5.5),this.ctx.fillText(i,this.leftPadding+s-this.xLength/2,this.height-this.bottomPadding+15*this.dpi)}this.ctx.stroke(),this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="right",this.ctx.fillStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding+.5),this.ctx.fillText(0,this.leftPadding-10,this.height-this.bottomPadding+5);for(t=0;t<this.yEqual;t++){var h=this.yFictitious*(t+1),a=this.yLength*(t+1);this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-a+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding-a+.5),this.ctx.stroke(),this.ctx.fillText(h,this.leftPadding-10,this.height-this.bottomPadding-a+5),this.ctx.beginPath(),this.ctx.strokeStyle=this.contentColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-a+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding-a+.5),this.ctx.stroke()}},drawTitle:function(){this.title&&(this.ctx.beginPath(),this.ctx.textAlign="center",this.ctx.fillStyle=this.titleColor,this.ctx.font=16*this.dpi+"px Microsoft YaHei","bottom"===this.titlePosition&&this.bottomPadding>=40?this.ctx.fillText(this.title,this.width/2,this.height-5):this.ctx.fillText(this.title,this.width/2,this.topPadding/2+5))},drawLegend:function(){for(var t=0;t<this.dataLength;t++)this.ctx.fillStyle=this.colorList[t],this.ctx.fillRect(10,this.legendTop+15*t*this.dpi,20,11),this.ctx.fillStyle=this.legendColor,this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="left",this.ctx.fillText(this.data[t].name,35,this.legendTop+10+15*t*this.dpi)},getYFictitious:function(t){var i=t.slice(0);i.sort(function(t,i){return-(t.value-i.value)});var s=Math.ceil(i[0].value/this.yEqual),h=s.toString().length-1;return h=h>2?2:h,Math.ceil(s/Math.pow(10,h))*Math.pow(10,h)},getTotalValue:function(){for(var t=0,i=0;i<this.dataLength;i++)t+=this.data[i].value;return t}},i},void 0===(h=function(){return a()}.call(i,s,i,t))||(t.exports=h)},Z1dZ:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var h=s("IOPI"),a=s.n(h),e={data:function(){return{schart:null,opt:{}}},props:{canvasId:{type:String,default:""},type:{type:String,default:"bar"},data:{type:Array,default:[]},options:{type:Object,required:!1}},mounted:function(){this.renderChart()},methods:{renderChart:function(){this.schart=null,this.opt=this.options,this.width&&this.height||(this.opt?this.opt.autoWidth=!0:this.opt={autoWidth:!0}),this.schart=new a.a(this.canvasId,this.type,this.data,this.opt)}},watch:{data:function(){this.renderChart()},options:function(){this.renderChart()},type:function(){this.renderChart()}}},o={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("canvas",{attrs:{id:this.canvasId}})])},staticRenderFns:[]},d={name:"basecharts",components:{Schart:s("VU/8")(e,o,!1,null,null,null).exports},data:function(){return{data1:[{name:"2012",value:1141},{name:"2013",value:1499},{name:"2014",value:2260},{name:"2015",value:1170},{name:"2016",value:970},{name:"2017",value:1450}],data2:[{name:"短袖",value:1200},{name:"休闲裤",value:1222},{name:"连衣裙",value:1283},{name:"外套",value:1314},{name:"羽绒服",value:2314}],options1:{title:"某商店近年营业总额",autoWidth:!0,showValue:!1,bgColor:"#F9EFCC",fillColor:"#00887C",contentColor:"rgba(46,199,201,0.3)",yEqual:7},options2:{title:"某商店近年营业总额",bgColor:"#D5E4EB",titleColor:"#00887C",fillColor:"red",contentColor:"rgba(46,199,201,0.3)"},options3:{title:"某商店各商品年度销量",bgColor:"#829dca",titleColor:"#ffffff",legendColor:"#ffffff",radius:120},options4:{title:"某商店各商品年度销量",bgColor:"#829daa",titleColor:"#ffffff",legendColor:"#ffffff",radius:120,innerRadius:80}}}},n={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"crumbs"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",[s("i",{staticClass:"el-icon-date"}),t._v(" 图表")]),t._v(" "),s("el-breadcrumb-item",[t._v("基础图表")])],1)],1),t._v(" "),s("div",{staticClass:"container"},[t._m(0),t._v(" "),s("div",{staticClass:"schart-box"},[s("div",{staticClass:"content-title"},[t._v("柱状图")]),t._v(" "),s("schart",{staticClass:"schart",attrs:{canvasId:"bar",data:t.data1,type:"bar",options:t.options1}})],1),t._v(" "),s("div",{staticClass:"schart-box"},[s("div",{staticClass:"content-title"},[t._v("折线图")]),t._v(" "),s("schart",{staticClass:"schart",attrs:{canvasId:"line",data:t.data1,type:"line",options:t.options2}})],1),t._v(" "),s("div",{staticClass:"schart-box"},[s("div",{staticClass:"content-title"},[t._v("饼状图")]),t._v(" "),s("schart",{staticClass:"schart",attrs:{canvasId:"pie",data:t.data2,type:"pie",options:t.options3}})],1),t._v(" "),s("div",{staticClass:"schart-box"},[s("div",{staticClass:"content-title"},[t._v("环形图")]),t._v(" "),s("schart",{staticClass:"schart",attrs:{canvasId:"ring",data:t.data2,type:"ring",options:t.options4}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"plugins-tips"},[this._v("\n            vue-schart：vue.js封装sChart.js的图表组件。\n            访问地址："),i("a",{attrs:{href:"https://github.com/lin-xin/vue-schart",target:"_blank"}},[this._v("vue-schart")])])}]};var l=s("VU/8")(d,n,!1,function(t){s("8Nmh")},"data-v-00bfcf14",null);i.default=l.exports}});