<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="item.count > 0" @click.stop="decreaseCount($event)">
				<div class="inner icon-remove_circle_outline"></div>
			</div>
		</transition>
		<div class="cart-count" v-show="item.count > 0">{{item.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCount($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		props: {
			item: {
				type: Object
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
		methods: {
			addCount(event) {
				if(!event._constructed) return;
				if(!this.item.count) {
					Vue.set(this.item, 'count', 1);
				}else{
					this.item.count++;
				}
				this.$root.eventHub.$emit('cart.add', event.target);
			},
			decreaseCount(event) {
				if(!event._constructed) return;
				if(this.item.count) {
					this.item.count--;
				}
			}
		}
	}
</script>

<style lang="less">
	.cartcontrol {
		font-size: 0;
		.cart-decrease {
			display: inline-block;
			padding: 6px;
			transition: .3s all;
			.inner {
				line-height: 24px;
				font-size: 24px;
				color: rgb(0, 160, 220);
				transition: .3s all;
				transform: rotate(0);
			}
			&.move-enter-active {
				transform: translate3d(0, 0, 0);
				opacity: 1;
				.inner { transform: rotate(0);}
			}
			&.move-leave-active {
				transform: translate3d(24px, 0, 0);
				opacity: 0;
				.inner { transform: rotate(180deg);}
			}
			&.move-enter, &.move-leave {
				transform: translate3d(24px, 0, 0);
				opacity: 0;
				.inner { transform: rotate(180deg);}
			}
		}
		.cart-count { display: inline-block; width: 12px; padding-top: 6px; line-height: 24px; color: rgb(147, 153, 159); font-size: 10px; text-align: center; vertical-align: top;}
		.cart-add { display: inline-block; padding: 6px; line-height: 24px; font-size: 24px; color: rgb(0, 160, 220);}
	}
</style>