<template>
  <div id="app">
    <ViewHeader :seller="seller"></ViewHeader>
    <nav>
    	<ul class="nav-list">
    		<router-link class="nav-item" :to="item.link" tag="li" v-for="(item, index) in nav">
    			<a href="javascript:;">{{item.title}}</a>
    		</router-link>
    	</ul>
    </nav>
    <keep-alive>
    	<router-view class="router-view" :seller="seller"></router-view>
		</keep-alive>
  </div>
</template>

<script>
	import {urlParse} from './assets/js/util.js'
	import ViewHeader from './components/header/Header.vue'
	
	export default {
	  name: 'app',
	  components:{
			ViewHeader
		},
	  data () {
	    return {
	    	nav: [{
	    		'title': '商品',
	    		'link': 'Goods'
	    	},
	    	{
	    		'title': '评价',
	    		'link': 'Ratings'
	    	},
	    	{
	    		'title': '商家',
	    		'link': 'Seller'
	    	}],
	    	seller: {
	    		id: (() => {
	    			let queryParam = urlParse();
	    			return queryParam.id;
	    		})()
	    	}
	    }
	  },
	  created() {
			var _this = this
			this.$http.get('./data.json?id='+ this.seller.id).then(function(res){
				_this.seller = Object.assign({}, _this.seller, res.data.seller);
				_this.goods = res.data.goods;
			}).catch(function(err){
				console.log(err);
			});
		}
	}
</script>

<style lang="less">
	@import "./assets/less/mixin.less";
	
	.nav-list {
		display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .nav-item {
    	flex: 1;
      text-align: center;
      a {
      	display: block;
      	font-size: 14px;
      	color: rgb(77, 85, 93);
      }
      &.router-link-active a { color: rgb(240, 20, 20);}
    }
	}
</style>
