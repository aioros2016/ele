<template>
	<div class="goods">
		<div class="goods-wrapper">
			<div class="sidebar" ref="sidebar">
				<ul>
					<li :class="{'current': currentIndex === index}" class="side-item" v-for="(item, index) in goods" @click="selectedSide(index, $event)">
						<span class="text border-1px"><i v-show="item.type > 0" :class="classMap[item.type]" class="icon"></i>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li class="menu-list menu-list-hook" v-for="(list, index) in goods">
						<h3 class="title">{{list.name}}</h3>
						<ul>
							<li class="menu-item border-1px" v-for="(item, index) in list.foods" @click="selectItem(item, $event)">
								<div class="icon"><img :src="item.icon" width="57" height="57" /></div>
								<div class="content">
									<div class="name">{{item.name}}</div>
									<p class="desc">{{item.description}}</p>
									<div class="extra">
										<span class="count">月售{{item.sellCount}}份</span>
										<span class="praise">好评率{{item.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{item.price}}</span>
										<span class="old" v-show="item.oldPrice">¥{{item.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<Viewcartcontrol :item="item"></Viewcartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<Viewshopcart ref="shopcart" :selected-item="selectedItem" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Viewshopcart>
		</div>
		<Viewdetail :item="showDetail" ref="detail"></Viewdetail>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import Viewshopcart from "../../components/shopcart/Shopcart.vue";
	import Viewcartcontrol from "../../components/cartcontrol/Cartcontrol.vue";
	import Viewdetail from "../../components/detail/Detail.vue";
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			Viewshopcart,
			Viewcartcontrol,
			Viewdetail
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				showDetail: {}
			}
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++){
					let prev = this.listHeight[i];
					let next = this.listHeight[i + 1];
					if(!next || (this.scrollY >= prev && this.scrollY < next)){
						return i;
					}
				}
				return 0;
			},
			selectedItem() {
				let items = [];
				this.goods.forEach((good) => {
					good.foods.forEach((item) => {
						if(item.count) {
							items.push(item);
						}
					})
				});
				return items;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			console.log(this);
			var _this = this;
			this.$http.get('../data.json').then(function(res){
				_this.goods = res.data.goods;
				_this.$nextTick(() => {
					_this.initScroll();
					_this.calculation();
				});
			}).catch(function(err){
				console.log(err);
			});
		},
		methods: {
			initScroll() {
				this.sideScroll = new BScroll(this.$refs.sidebar, {
					click: true
				});
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					probeType: 3,
					click: true
				});
				this.menuScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(parseInt(pos.y));
				})
			},
			calculation() {
				let menuList = document.querySelectorAll(".menu-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i < menuList.length; i++){
					let item = menuList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectedSide(index, event) {
				if(!event._constructed) return;
				let menuList = document.querySelectorAll(".menu-list-hook");
				let el = menuList[index];
				this.menuScroll.scrollToElement(el, 300);
			},
			cartAdd(target) {
				
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			selectItem(item, event) {
				if(!event._constructed) return;
				this.showDetail = item;
				this.$refs.detail.show();
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.goods-wrapper {
		overflow: hidden;
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		.sidebar {
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.side-item {
				display: table;
				width: 56px;
				height: 54px;
				padding: 0 12px; 
				line-height: 14px;
				.icon {
					display: inline-block;
					margin-right: 2px;
					width: 12px;
					height: 12px;
					background-size: 12px;
					background-repeat: no-repeat;
					vertical-align: top;
					&.decrease { .bg-image('decrease_3');}
					&.discount { .bg-image('discount_3');}
					&.guarantee { .bg-image('guarantee_3');}
					&.invoice { .bg-image('invoice_3');}
					&.special { .bg-image('special_3');}
				}
				.text { display: table-cell; .border-1px(rgba(7, 17, 27, .1)); width: 56px; font-size: 12px; vertical-align: middle;}
				&.current {
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background-color: #fff;
					font-weight: 700;
					.text { .border-none();}
				}
			}
		}
		.menu-wrapper {
			flex: 1;
			.title {
				border-left: 2px solid #d9dde1;
				height: 26px;
				padding-left: 14px;
				line-height: 26px;
				background: #f3f5f7;
				color: rgb(147, 153, 159);
				font-size: 12px;
			}
			.menu-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				.border-1px(rgba(7, 17, 27, .1));
				&:last-child {
					.border-none();
					margin-bottom: 0;
				}
				.icon { flex: 0 0 57px; margin-right: 10px;}
				.content {
					flex: 1;
					.name { margin: 2px 0 8px; height: 14px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
					.desc, .extra { color: rgb(147, 153, 159); font-size: 10px;}
					.desc { margin-bottom: 8px; line-height: 12px;}
					.extra {
						font-size: 0;
						.count { margin-right: 12px; font-size: 10px;}
						.praise { font-size: 10px;}
					}
					.price {
						line-height: 24px;
						font-size: 0;
						font-weight: 700px;
						.now { margin-right: 8px; color: rgb(240, 20, 20); font-size: 14px;}
						.old { color: rgb(147, 153, 159); font-size: 10px; text-decoration: line-through;}
					}
					.cartcontrol-wrapper { position: absolute; bottom: 12px; right: 0;}
				}
			}
		}
	}
</style>