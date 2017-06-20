<template>
	<div class="seller">
		<div class="seller-wrapper" ref="sellerWrapper">
			<div class="seller-content">
				<div class="overview">
					<h2 class="title">{{seller.name}}</h2>
					<div class="desc border-1px">
						<Star :size="36" :score="seller.score"></Star>
						<span class="text">{{seller.ratingCount}}</span>
						<span class="text">月售{{seller.sellCount}}单</span>
					</div>
					<ul class="remark">
						<li class="block">
							<h3>起送价</h3>
							<div class="content">
								<span class="stress">{{seller.minPrice}}</span>元
							</div>
						</li>
						<li class="block">
							<h3>商家配送</h3>
							<div class="content">
								<span class="stress">{{seller.deliveryPrice}}</span>元
							</div>
						</li>
						<li class="block">
							<h3>平均配送时间</h3>
							<div class="content">
								<span class="stress">{{seller.deliveryTime}}</span>分钟
							</div>
						</li>
					</ul>
					<div class="favorite" @click="toggleFavorite($event)">
						<i class="icon-favorite" :class="{'active': favorite}"></i>
						<span class="text">{{favoriteText}}</span>
					</div>
				</div>
				<Split></Split>
				<div class="bulletin">
					<h3 class="title">公告与活动</h3>
					<div class="content-wrapper border-1px">
						<div class="content">{{seller.bulletin}}</div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item border-1px" v-for="(item, index) in seller.supports">
							<i class="icon" :class="classMap[seller.supports[index].type]"></i>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
				</div>
				<Split></Split>
				<div class="pics">
					<h3 class="title">商家实景</h3>
					<div class="pic-wrapper" ref="picWrapper">
						<ul class="pic-list" ref="picList">
							<li class="pic-item" v-for="(pic, index) in seller.pics">
								<img :src="pic" width="120" height="90" />
							</li>
						</ul>
					</div>
				</div>
				<Split></Split>
				<div class="info">
					<h3 class="title">商家信息</h3>
					<ul>
						<li class="info-item" v-for="(info, index) in seller.infos">{{info}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import {save2local, loadFromLocal} from '../../assets/js/storage.js';
	import Star from '../../components/star/Star.vue';
	import Split from '../../components/split/Split.vue';
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			Star,
			Split
		},
		data(){
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted() {
			this.initScroll();
			this.initPics();
		},
		watch: {
			seller() {
				this.initScroll();
				this.initPics();
			}
		},
		methods: {
			initScroll() {
				if(!this.scroll) {
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.sellerWrapper, {
							click: true
						});
					})
				}else {
					this.$nextTick(() => {
						this.scroll.refresh();
					})
				}
			},
			initPics() {
				if(this.seller.pics) {
					let picWidth = 120;
					let picMargin = 6;
					let width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						}else {
							this.$nextTick(() => {
								this.picScroll.refresh();
							})
						}
					})
				}
			},
			toggleFavorite(event) {
				if (!event._constructed) return;
				this.favorite = !this.favorite;
				save2local(this.seller.id, 'favorite', this.favorite);
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.seller-wrapper {
		overflow: hidden;
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		.overview {
			position: relative;
			padding: 18px;
			.title { margin-bottom: 8px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
			.desc {
				.border-1px(rgba(7, 17, 27, .1));
				padding-bottom: 18px;
				font-size: 0;
				.star { display: inline-block; margin-right: 8px; vertical-align: top;}
				.text { display: inline-block; margin-right: 12px; line-height: 18px; color: rgb(77, 85, 93); font-size: 10px; vertical-align: top;}
			}
			.remark {
				display: flex;
				padding-top: 18px;
				.block {
					flex: 1;
					border-right: rgba(7, 17, 27, .1) solid 1px;
					text-align: center;
					&:last-child { border-right: none;}
					h3 { margin-bottom: 4px; line-height: 10px; color: rgb(147, 153, 159); font-size: 10px;}
					.content {
						line-height: 24px;
						color: rgb(7, 17, 27);
						font-size: 10px;
						.stress { font-size: 24px;}
					}
				}
			}
			.favorite {
				overflow: hidden;
				position: absolute;
				top: 18px;
				right: 10px;
				width: 40px;
				text-align: center;
				.icon-favorite {
					display: block;
					margin-bottom: 4px;
					line-height: 24px;
					color: #d4d6d9;
					font-size: 24px;
					&.active { color: rgb(240, 20, 20);}
				}
				.text { line-height: 10px; color: rgb(77, 85, 93); font-size: 10px;}
			}
		}
		.bulletin {
			padding: 18px 18px 0 18px;
			.title { margin-bottom: 8px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
			.content-wrapper {
				.border-1px(rgba(7, 17, 27, .1));
				padding: 0 12px 16px 12px;
				.content { line-height: 24px; color: rgb(240, 20, 20); font-size: 12px;}
			}
			.supports {
				.support-item {
					.border-1px(rgba(7, 17, 27, .1));
					padding: 16px 12px;
					font-size: 0;
					&:last-child { .border-none();}
					.icon {
						display: inline-block;
						margin-right: 6px;
						width: 16px;
						height: 16px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						vertical-align: top;
						&.decrease { .bg-image('decrease_4');}
						&.discount { .bg-image('discount_4');}
						&.guarantee { .bg-image('guarantee_4');}
						&.invoice { .bg-image('invoice_4');}
						&.special { .bg-image('special_4');}
					}
					.text { line-height: 16px; color: rgb(7, 17, 27); font-size: 12px;}
				}
			}
		}
		.pics {
			padding: 18px;
			.title { margin-bottom: 12px; line-height: 14px; color: rgb(7, 17, 27); font-size: 14px;}
			.pic-wrapper {
				overflow: hidden;
				width: 100%;
				white-space: nowrap;
				.pic-list {
					font-size: 0;
					.pic-item {
						display: inline-block;
						margin-right: 6px;
						width: 120px;
						height: 90px;
						&:last-child { margin-right: 0;}
					}
				}
			}
		}
		.info {
			padding: 18px 18px 0 18px;
			color: rgb(7, 17, 27);
			.title { .border-1px(rgba(7, 17, 27, .1)); padding-bottom: 12px; line-height: 14px; font-size: 14px;}
			.info-item {
				.border-1px(rgba(7, 17, 27, .1));
				padding: 16px 12px;
				line-height: 16px;
				font-size: 12px;
				&:last-child { .border-none();}
			}
		}
	}
</style>