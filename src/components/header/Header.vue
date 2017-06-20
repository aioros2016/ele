<template>
	<header class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" />
			</div>
			<div class="content">
				<div class="title">
					<i class="brand"></i>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div class="support" v-if="seller.supports">
					<i class="icon" :class="classMap[seller.supports[0].type]"></i>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<i class="bulletin-title"></i><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>
		
		<!-- CSS Sticky footer start -->
		<transition name="fade">
			<div class="popup" v-show="popup">
				<div class="popup-wrapper clearfix">
					<div class="popup-main">
						<h2 class="name">{{seller.name}}</h2>
						<div class="star-wrapper">
							<Star :size="48" :score="seller.score"></Star>
						</div>
						<div class="title">
							<hr class="line" />
							<div class="text">优惠信息</div>
							<hr class="line" />
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item, index) in seller.supports">
								<i class="icon" :class="classMap[seller.supports[index].type]"></i>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<hr class="line" />
							<div class="text">商家公告</div>
							<hr class="line" />
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="popup-close" @click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
		<!-- CSS Sticky footer end -->
	</header>
</template>

<script>
	import Star from '../../components/star/Star.vue';
	
	export default {
		components:{
			Star
		},
		props:{
			seller: {
				type: Object
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		data(){
			return {
				popup: false
			}
		},
		mounted(){
		},
		methods: {
			showDetail() {
				this.popup = true;
			},
			hideDetail() {
				this.popup = false;
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.header {
		overflow: hidden;
		position: relative;
		background-color: rgba(7, 17, 27, .5);
		color: white;
		.content-wrapper {
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar {
				display: inline-block;
				margin-right: 16px;
				vertical-align: top;
				img { border-radius: 2px;}
			}
			.content {
				display: inline-block;
				.title {
					margin: 2px 0 8px;
					.brand { display: inline-block; margin-right: 6px; width: 30px; height: 18px; .bg-image('brand'); background-size: 30px 18px; background-repeat: no-repeat; vertical-align: top;}
					.name { display: inline-block; line-height: 18px; font-size: 16px; font-weight: bold;}
				}
				.description { margin-bottom: 10px; line-height: 12px; font-size: 12px;}
				.support {
					.icon {
						display: inline-block;
						margin-right: 4px;
						width: 12px;
						height: 12px;
						background-size: 12px;
						background-repeat: no-repeat;
						vertical-align: top;
						&.decrease { .bg-image('decrease_1');}
						&.discount { .bg-image('discount_1');}
						&.guarantee { .bg-image('guarantee_1');}
						&.invoice { .bg-image('invoice_1');}
						&.special { .bg-image('special_1');}
					}
					.text { line-height: 12px; font-size: 10px;}
				}
			}
			.support-count {
				position: absolute;
				right: 12px;
				bottom: 14px;
				height: 24px;
				line-height: 24px;
				padding: 0 8px;
				background-color: rgba(0, 0, 0, .2);
				text-align: center;
				border-radius: 24px;
				.count { margin-right: 2px; font-size: 10px; vertical-align: top;}
				.icon-keyboard_arrow_right { line-height: 24px; font-size: 10px;}
			}
		}
		.bulletin-wrapper {
			overflow: hidden;
			position: relative;
			height: 28px;
			padding: 0 22px 0 12px;
			line-height: 28px;
			background-color: rgba(7, 17, 27, .2);
			white-space: nowrap;
			text-overflow: ellipsis;
			.bulletin-title { display: inline-block; width: 22px; height: 12px; .bg-image('bulletin'); background-size: 22px 12px; background-repeat: no-repeat; vertical-align: middle;}
			.bulletin-text { margin: 0 4px; font-size: 10px;}
			.icon-keyboard_arrow_right { position: absolute; top: 8px; right: 12px; font-size: 10px;}
		}
		.background { position: absolute; top: 0; left: 0; z-index: -1; width: 100%; height: 100%; filter: blur(10px);}
		.popup {
			overflow: auto;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 11;
			width: 100%;
			height: 100%;
			background-color: rgba(7, 17, 27, .8);
			backgrop-filter: blur(10px);
			transition: .3s all;
			&.fade-enter-active { opacity: 1;}
			&.fade-leave-active { opacity: 0;}
			&.fade-enter, .fade-leave { opacity: 0;}
			.popup-wrapper {
				width: 100%;
				min-height: 100%;
				.popup-main {
					margin-top: 64px;
					padding-bottom: 64px;
					.name { text-align: center;}
					.star-wrapper {
						margin-top: 18px;
						padding: 2px 0;
						text-align: center;
					}
					.title {
						display: flex;
						margin: 28px auto 24px;
						width: 80%;
						.line { flex: 1; position: relative; top: -6px; margin: 0; border-width: 0; border-bottom: 1px solid rgba(255, 255, 255, .2);}
						.text { padding: 0 12px; font-size: 14px; font-weight: 700;}
					}
					.supports {
						margin: 0 auto;
						width: 80%;
						.support-item {
							margin-bottom: 12px;
							padding: 0 12px;
							font-size: 0;
							&:last-child { margin-bottom: 0;}
							.icon {
								display: inline-block;
								margin-right: 6px;
								width: 16px;
								height: 16px;
								background-size: 16px 16px;
								background-repeat: no-repeat;
								vertical-align: top;
								&.decrease { .bg-image('decrease_2');}
								&.discount { .bg-image('discount_2');}
								&.guarantee { .bg-image('guarantee_2');}
								&.invoice { .bg-image('invoice_2');}
								&.special { .bg-image('special_2');}
							}
							.text { line-height: 16px; font-size: 12px;}
						}
					}
					.bulletin {
						margin: 0 auto;
						width: 80%;
						.content { padding: 0 12px; line-height: 24px; font-size: 12px;}
					}
				}
			}
			.popup-close {
				position: relative;
				margin: -64px auto 0;
				width: 32px;
				height: 32px;
				font-size: 32px;
				clear: both;
			}
		}
	}
</style>