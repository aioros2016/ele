<template>
	<div class="shopcart">
		<div class="shopcart-wrapper">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'high-light':totalCount > 0}">
							<i class="icon-shopping_cart"></i>
						</div>
						<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
					</div>
					<div :class="{'high-light':totalPrice > 0}" class="price">¥ {{totalPrice}}</div>
					<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right" @click.stop="pay">
					<div :class="totalPrice < minPrice ? 'not-enough' : 'enough'" class="pay">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball-container">
				<transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
					<div class="ball" v-for="(ball, index) in balls" v-show="ball.show" :key="index">
						<div class="inner inner-hook"></div>
					</div>
				</transition-group>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-head">
						<h2 class="title">购物车</h2>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="item" v-for="(item, index) in selectedItem">
								<span class="name">{{item.name}}</span>
								<div class="price">
									<span>¥{{item.price * item.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<Viewcartcontrol :item="item"></Viewcartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import Viewcartcontrol from "../../components/cartcontrol/Cartcontrol.vue";
	
	export default {
		props: {
			selectedItem: {
				type: Array,
				default() {
					return [{
						price: 20,
						count: 1
					}];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		components: {
			Viewcartcontrol
		},
		data() {
			return {
				balls: [{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}],
				dropBalls: [],
				fold: true
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectedItem.forEach((item) => {
					total += item.price * item.count;
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectedItem.forEach((item) => {
					count += item.count;
				})
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `¥${this.minPrice}元起送`;
				}else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差¥${diff}元起送`;
				}else {
					return '去结算';
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show) {
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						}else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		created() {
			this.$root.eventHub.$on('cart.add', this.drop)
		},
		methods: {
			drop(el) {
				for(let i = 0; i<this.balls.length; i++) {
					let ball = this.balls[i];
					if(!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while(count--){
					let ball = this.balls[count];
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
						el.style.transform = `translate3d(0, ${y}px, 0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
						inner.style.transform = `translate3d(${x}px, 0, 0)`;
					}
				}
			},
			enter(el) {
				
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0, 0, 0)';
					el.style.transform = 'translate3d(0, 0, 0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0, 0, 0)';
					inner.style.transform = 'translate3d(0, 0, 0)';
				})
				
			},
			afterEnter(el) {
				let ball = this.dropBalls.shift();
				if(ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			},
			toggleList() {
				if(!this.totalCount) return;
				this.fold = !this.fold;
				console.log(this.fold);
			},
			empty() {
				this.selectedItem.forEach((item) => {
					item.count = 0;
				})
			},
			hideList() {
				this.fold = true;
			},
			pay() {
				if(this.totalPrice < this.minPrice) return;
				window.alert(`需要支付${this.totalPrice}元`);
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.shopcart-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 48px;
		.content {
			display: flex;
			background-color: #141d27;
			color: rgba(255, 255, 255, .4);
			.content-left {
				flex: 1;
				font-size: 0;
				.logo-wrapper {
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					width: 56px;
					height: 56px;
					padding: 6px;
					background-color: #141d27;
					vertical-align: top;
					box-sizing: border-box;
					border-radius: 50%;
					.logo {
						width: 100%;
						height: 100%;
						background-color: #2b343c;
						border-radius: 50%;
						text-align: center;
						transition: all .3s;
						.icon-shopping_cart {
							line-height: 44px;
							color: #80858a;
							font-size: 24px;
							transition: all .3s;
						}
						&.high-light {
							background-color: rgb(0, 160, 220);
							.icon-shopping_cart { color: #fff;}
						}
					}
					.num { position: absolute; top: 0; right: 0; width: 24px; height: 16px; line-height: 16px; background-color: rgb(240, 20, 20); color: #fff; font-size: 9px; font-weight: 700; text-align: center; border-radius: 16px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);}
				}
				.price {
					display: inline-block;
					margin-top: 12px;
					border-right: 1px solid rgba(255, 255, 255, .1);
					padding-right: 12px;
					line-height: 24px;
					font-size: 16px;
					font-weight: 700;
					vertical-align: top;
					box-sizing: border-box;
					transition: all .3s;
					&.high-light { color: #fff;}
				}
				.desc { display: inline-block; margin: 12px 0 0 12px; line-height: 24px; font-size: 10px;}
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				.pay {
					height: 48px;
					line-height: 48px;
					font-size: 12px;
					font-weight: 700;
					text-align: center;
					transition: .3s all; 
					&.not-enough { background-color: #2b333b;}
					&.enough { background-color: #00b43c; color: #fff;}
				}
			}
		}
		.ball-container {
			.ball {
				position: fixed;
				bottom: 22px;
				left: 32px;
				z-index: 20;
				&.drop-enter-active, &.drop-leave-active{
					transition: all .3s cubic-bezier(.64, -0.2, .83, .7);
					.inner { width: 16px; height: 16px; background-color: rgb(0, 160, 220); border-radius: 50%; transition: all .3s linear;}
				}
			}
		}
		.shopcart-list {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			transform: translate3d(0, -100%, 0);
			&.fold-enter-active, &.fold-leave-active {
				transition: all .5s
			}
			&.fold-enter, &.fold-leave-active {
				transform: translate3d(0, 0, 0)
			}
			.list-head {
				border-bottom: 1px solid rgba(7, 17, 27, .1);
				height: 40px;
				padding: 0 18px;
				line-height: 40px;
				background-color: #f3f5f7;
				.title { float: left; color: rgb(7, 17, 27); font-size: 14px;}
				.empty { float: right; color: rgb(0, 160, 220); font-size: 12px;}
			}
			.list-content {
				overflow: hidden;
				max-height: 217px;
				padding: 0 18px;
				background-color: #fff;
				.item {
					position: relative;
					.border-1px(rgba(7, 17, 27, .1));
					padding: 12px 0;
					box-sizing: border-box;
					.name { line-height: 24px; color: rgb(7, 17, 27); font-size: 14px;}
					.price { position: absolute; bottom: 12px; right: 90px; line-height: 24px; color: rgb(240, 20, 20); font-size: 14px; font-weight: 700;}
					.cartcontrol-wrapper { position: absolute; bottom: 6px; right: 0;}
				}
			}
		}
	}
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
		opacity: 1;
		background-color: rgba(7, 17, 27, .6);
		backdrop-filter: blur(10px);
		&.fade-enter-active, &.fade-leave-active {
			transition: all .5s
		}
		&.fade-enter, &.fade-leave-active {
			opacity: 0;
			background-color: rgba(7, 17, 27, 0);
		}
	}
</style>