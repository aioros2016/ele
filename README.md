# 基于Vue.js 2.x的高仿饿了么外卖App #

## 前言

接触Vue.js 2时间并不长，之前也学过一些angular的课程，所以学vue.js 2感觉并没有想象中那么累。这次的这个实践项目是根据时下比较火的一款课程，只可惜课程本身是围绕着vue.js 1来实践的。所以我看完课程后，自己又用vue.js 2将代码重新敲了一遍。期间也踩坑不少，Google也帮了不少忙。虽然框架版本不同，不过瑕不掩瑜，敲完整个项目之后，还是感觉自己学到了不少东西。之前在公司已经用Vue.js 2制作了一些项目，不过从代码的标准化和效率来说，还是和课程中的有些差距。这次学完之后，今后的项目如何将代码更加地规范化和标准化，以及代码的执行效率方面，也有了更多的思考。


## 版本更新历史

2017.6.28

1. 优化了评价组件与父组件之间传递数据的方式
2. 返回按钮不再跟随页面滚动了，永远置顶于左上角
3. 说明文档添加了二维码和在线预览地址，方便观看效果


## 在线预览

您可以扫描以下二维码或者点击链接来预览页面效果<br />
![扫描二维码](https://github.com/aioros2016/ele/blob/master/qr-code.jpg)<br />
<a href="http://lizhigang.cn/ele" target="_blank">点我预览</a>


## 技术栈

vue2 + vue-cli + vue-router + webpack + ES6 + axios + less + flex + iconfont


## 功能
- [x] 餐馆食品列表页 -- 完成
- [x] 购物车功能 -- 完成
- [x] 店铺评价页面 -- 完成
- [x] 单个食品详情页面 -- 完成
- [x] 店铺详情页 -- 完成
- [x] 店铺公告功能 -- 完成


## 目录结构介绍 ##

	|-- static                           // 通用静态资源目录
	|-- src                              // 源码目录
	|   |-- assets                       // 项目静态资源
	|      |-- fonts                     // iconfont目录
	|      |-- js                        // 项目静态脚本目录
	|      |-- less                      // less目录
	|   |-- components                   // 组件
	|      |-- cartcontrol               // 购物车控件没目录
	|      |-- detail                    // 商品详情目录
	|      |-- goods                     // 店铺商品列表目录
	|      |-- header                    // 店铺头部目录
	|      |-- ratings                   // 店铺评价目录
	|      |-- ratingselect              // 商品评价控件目录
	|      |-- seller                    // 商家目录
	|      |-- shopcart                  // 购物车目录
	|      |-- split                     // 分割线目录
	|      |-- star                      // 五星打分控件目录
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|   |-- routeConfig.js               // 路由配置文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- data.json                        // 本地静态数据文件
	|-- webpack.config.js                // webpack配置文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- postcss.config.js                // postcss配置文件
	|-- README.md                        // 说明
	|-- qr-code.jpg                      // 二维码


## 项目安装

npm install


## 本地运行

// 开启服务器，浏览器访问 http://localhost:8080
npm run dev


## 构建生产

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build


## 尾巴

>  如果对您有帮助，您可以点击右上角 的"Star" 支持一下 谢谢！ ^_^

>  如有疑问请直接在 Issues 中提交，或者您发现问题并有非常好的解决方案，欢迎 PR 
