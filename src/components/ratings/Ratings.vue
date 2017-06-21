<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h2 class="score">{{seller.score}}</h2>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star :size="36" :score="seller.serviceScore"></Star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star :size="36" :score="seller.foodScore"></Star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<Viewsplit></Viewsplit>
			<Viewratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @select-type="innerSelect" @only-content="innerContent"></Viewratingselect>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(item, index) in ratings" v-show="needShow(item.rateType, item.text)">
						<div class="avatar"><img :src="item.avatar" width="28" height="28" /></div>
						<div class="content">
							<h3 class="name">{{item.username}}</h3>
							<div class="star-wrapper">
								<Star :size="24" :score="item.score"></Star>
								<span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{item.text}}</p>
							<div class="recommend" v-show="item.recommend && item.recommend.length">
								<i class="icon-thumb_up"></i>
								<span class="item" v-for="(recommend, index) in item.recommend">{{recommend}}</span>
							</div>
							<div class="time">{{item.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import Star from '../../components/star/Star.vue';
	import Viewsplit from "../../components/split/Split.vue";
	import Viewratingselect from "../../components/ratingselect/Ratingselect.vue";
	import {formatDate} from "../../assets/js/date.js";
	const ALL = 2;
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			Star,
			Viewsplit,
			Viewratingselect
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: true,
				ratings: []
			}
		},
		created() {
			this.$http.get('./data.json').then((res) => {
				this.ratings = res.data.ratings;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings, {
						click: true
					});
				})
			});
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
		methods: {
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
	
	.ratings {
		overflow: hidden;
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		.overview {
			display: flex;
			padding: 18px 0;
			.overview-left {
				flex: 0 0 137px;
				border-right: rgba(7, 17, 27, .1) solid 1px;
				width: 137px;
				padding: 6px 0;
				text-align: center;
				@media only screen and (max-width: 320px) {
					flex: 0 0 115px;
					width: 115px;
				}
				.score { margin-bottom: 6px; line-height: 28px; color: rgb(255, 153, 0); font-size: 24px;}
				.title { margin-bottom: 8px; line-height: 12px; color: rgb(7, 17, 27); font-size: 12;}
				.rank { line-height: 10px; color: rgb(147, 153, 159); font-size: 10px;}
			}
			.overview-right {
				flex: 1;
				padding: 6px 0 6px 24px;
				@media only screen and (max-width: 320px) {
					padding-left: 6px;
				}
				.score-wrapper {
					margin-bottom: 8px;
					font-size: 0;
					.title { display: inline-block; line-height: 18px; color: rgb(7, 17, 27); font-size: 12px; vertical-align: top;}
					.star { display: inline-block; margin: 0 12px; vertical-align: top;}
					.score { display: inline-block; line-height: 18px; color: rgb(255, 153, 0); font-size: 12px; vertical-align: top;}
				}
				.delivery-wrapper {
					font-size: 0;
					.title { color: rgb(7, 17, 27); font-size: 12px;}
					.delivery { margin-left: 12px; color: rgb(147, 153, 159); font-size: 12px;}
				}
			}
		}
		.rating-wrapper {
			padding: 0 18px;
			.rating-item {
				display: flex;
				padding: 18px 0;
				.border-1px(rgba(7, 17, 27, .1));
				.avatar {
					flex: 0 0 28px;
					margin-right: 12px;
					width: 28px;
					img { border-radius: 50%;}
				}
				.content {
					flex: 1;
					position: relative;
					.name { margin-bottom: 4px; line-height: 12px; color: rgb(7, 17, 27); font-size: 10px;}
					.star-wrapper {
						margin-bottom: 6px;
						font-size: 0;
						.star { display: inline-block; margin-right: 6px; vertical-align: top;}
						.delivery { display: inline-block; line-height: 12px; color: rgb(147, 153, 159); font-size: 10px; vertical-align: top;}
					}
					.text { margin-bottom: 8px; line-height: 18px; color: rgb(7, 17, 27); font-size: 12px;}
					.recommend {
						line-height: 16px;
						font-size: 0;
						.icon-thumb_up, .item { display: inline-block; margin: 0 8px 4px 0; font-size: 9px;}
						.icon-thumb_up { color: rgb(0, 160, 220);}
						.item { border: 1px solid rgba(7, 17, 27, .1); padding: 0 6px; background-color: #fff; color: rgb(147, 153, 159); border-radius: 1px;}
					}
					.time { position: absolute; top: 0; right: 0; line-height: 12px; color: rgb(147, 153, 159); font-size: 10px;}
				}
			}
		}
	}
</style>