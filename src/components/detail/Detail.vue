<template>
	<div class="detail">
		<transition name="move-to-left">
			<div class="detail-wrapper" v-show="showFlag" ref="item">
				<div class="detail-content">
					<div class="img-header">
						<img :src="item.image" />
						<span class="back" @click="hide"><i class="icon-arrow_lift"></i></span>
					</div>
					<div class="content">
						<h3 class="title">{{item.name}}</h3>
						<div class="num">
							<span class="sell-count">月售{{item.sellCount}}份</span>
							<span class="rating">好评率{{item.rating}}</span>
						</div>
						<div class="price">
							<span class="now">¥{{item.price}}</span>
							<span class="old" v-show="item.oldPrice">¥{{item.oldPrice}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<Viewcartcontrol :item="item"></Viewcartcontrol>
						</div>
						<div class="buy" @click.stop="addFirst($event)" v-show="!item.count || item.count === 0">加入购物车</div>
					</div>
					<Viewsplit v-show="item.info"></Viewsplit>
					<div class="info" v-show="item.info">
						<h3 class="title">商品信息</h3>
						<p class="text">{{item.info}}</p>
					</div>
					<Viewsplit v-show="item.info"></Viewsplit>
					<div class="rating">
						<h2 class="title">商品评价</h2>
						<Viewratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="item.ratings" @select-type="innerSelect" @only-content="innerContent"></Viewratingselect>
					</div>
					<div class="rating-wrapper">
						<ul v-show="item.ratings && item.ratings.length">
							<li v-show="needShow(item.rateType, item.text)" v-for="(item, index) in item.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{item.username}}</span>
									<img class="avatar" width="12" height="12" :src="item.avatar" />
								</div>
								<div class="time">{{item.rateTime | formatDate}}</div>
								<p class="text">
									<i :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType === 1}"></i>
									{{item.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!item.ratings || !item.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Vue from "vue";
	import BScroll from "better-scroll";
	import Viewcartcontrol from "../../components/cartcontrol/Cartcontrol.vue";
	import Viewsplit from "../../components/split/Split.vue";
	import Viewratingselect from "../../components/ratingselect/Ratingselect.vue";
	import {formatDate} from "../../assets/js/date.js";
	const ALL = 2;
	
	export default {
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		created() {
			this.$root.eventHub.$on('ratingType.select', (type) => {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			});
			this.$root.eventHub.$on('content.toggle', (onlyContent) => {
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			});
		},
		components: {
			Viewcartcontrol,
			Viewsplit,
			Viewratingselect
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.item, {
							click: true
						});
					}else {
						this.scroll.refresh();
					}
				})
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if(!event._constructed) return;
				this.$root.eventHub.$emit('cart.add', event.target);
				Vue.set(this.item, 'count', 1);
			},
			needShow(type, text) {
				if(this.onlyContent && !text) {
					return false;
				}
				if(this.selectType === ALL) {
					return true;
				}else {
					return type === this.selectType;
				}
			},
			innerSelect(data) {
				this.selectType = data;
			},
			innerContent(data) {
				this.onlyContent = data;
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.detail-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		z-index: 8;
		width: 100%;
		background-color: #fff;
		&.move-to-left-enter-active, &.move-to-left-leave-active { transition: all .3s}
		&.move-to-left-enter, &.move-to-left-leave-active { transform: translate3d(100%, 0, 0)}
		.img-header {
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img { position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
			.back {
				position: absolute;
				top: 10px;
				left: 0;
				.icon-arrow_lift { display: block; padding: 10px; color: #fff; font-size: 20px;}
			}
		}
		.content {
			position: relative;
			padding: 18px;
			.title { margin-bottom: 8px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px; font-weight: 700;}
			.num {
				margin-bottom: 18px;
				height: 10px;
				line-height: 10px;
				font-size: 0;
				.sell-count, .rating { color: rgb(147, 153, 159); font-size: 10px;}
				.sell-count { margin-right: 12px;}
			}
			.price {
				line-height: 24px;
				font-size: 0;
				font-weight: 700px;
				.now { margin-right: 8px; color: rgb(240, 20, 20); font-size: 14px;}
				.old { color: rgb(147, 153, 159); font-size: 10px; text-decoration: line-through;}
			}
			.cartcontrol-wrapper { position: absolute; right: 12px; bottom: 12px;}
			.buy { position: absolute; right: 18px; bottom: 18px; z-index: 7; height: 24px; padding: 0 12px; line-height: 24px; background-color: rgb(0, 160, 220); color: #fff; font-size: 10px; box-sizing: border-box; border-radius: 12px;}
		}
		.info {
			padding: 18px;
			.title { margin-bottom: 6px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
			.text { padding: 0 8px; line-height: 24px; color: rgb(77, 85, 93); font-size: 14px;}
		}
		.rating {
			padding-top: 18px;
			.title { margin-left: 18px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
		}
		.rating-wrapper {
			padding: 0 18px;
			.rating-item {
				position: relative;
				padding: 16px 0;
				.border-1px(rgba(7, 17, 27, .1));
				.user {
					position: absolute;
					top: 16px;
					right: 0;
					line-height: 12px;
					font-size: 0;
					.name { display: inline-block; margin-right: 6px; color: rgb(147, 153, 159); font-size: 10px; vertical-align: top;}
					.avatar { border-radius: 50%;}
				}
				.time { margin-bottom: 6px; line-height: 12px; color: rgb(147, 153, 159); font-size: 10px;}
				.text {
					line-height: 16px;
					color: rgb(7, 17, 27);
					font-size: 12px;
					.icon-thumb_up, .icon-thumb_down { margin-right: 4px; line-height: 16px; font-size: 12px;}
					.icon-thumb_up { color: rgb(0, 160, 220);}
					.icon-thumb_down { color: rgb(147, 153, 159);}
				}
			}
			.no-rating { padding: 16px 0; color: rgb(147, 153, 159); font-size: 12px;}
		}
	}
</style>