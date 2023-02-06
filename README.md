# 使用Vue.js 2.5 + Cube-ui对高仿饿了么外卖App的重构 #

## 前言

相较这个技术展示小项目的上一次提交已经有几年的时间了。这次决定用Vue.js 2.5 + Cube-ui对该项目做一次重构。由于视图层使用了Cube-ui，所以放弃了之前vue-router切换页面的方案，而是使用tab组件来渲染页面，这样在3个菜单来回切换时，会有css3过渡效果，视觉体验更好。接口数据这次用express来做了代理，并且在域名白名单可以跨域的前提下，保证了数据安全性。相较于上一个版本，视图层和服务层都有了不小的变化。(上一版本的代码在master分支)


## 在线预览

您可以扫描以下二维码或者点击链接来预览页面效果<br />
![扫描二维码](https://static.lizhigang.cn/img/qrcode-ele.png)<br />
<a href="https://www.lizhigang.cn/ele/" target="_blank">点我预览</a>


## 技术栈

vue2.5 + vue-cli + cube-ui + axios + stylus + express


## 项目安装

npm install


## 本地运行

npm run dev


## 构建生产

npm run build
