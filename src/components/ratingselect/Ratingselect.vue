<template>
	<div class="ratingSelect">
		<div class="ratingType border-1px">
			<span :class="{'active':selectType === 2}" class="block positive" @click="select(2, $event)">{{desc.all}}<em class="count">{{ratings.length}}</em></span>
			<span :class="{'active':selectType === 0}" class="block positive" @click="select(0, $event)">{{desc.positive}}<em class="count">{{positive.length}}</em></span>
			<span :class="{'active':selectType === 1}" class="block negative" @click="select(1, $event)">{{desc.negative}}<em class="count">{{negative.length}}</em></span>
		</div>
		<div :class="{'on':toOnlyContent === true}" class="switch" @click="toggleContent($event)">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		data() {
			return {
				toOnlyContent: this.onlyContent
			}
		},
		computed: {
			positive() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				})
			},
			negative() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				})
			}
		},
		methods: {
			select(type, event) {
				if(!event._constructed) return;
				this.$emit('selectType', type);
				this.$root.eventHub.$emit('ratingType.select', type);
			},
			toggleContent(event) {
				if(!event._constructed) return;
				this.toOnlyContent = !this.toOnlyContent;
				this.$emit('onlyContent', this.toOnlyContent);
				this.$root.eventHub.$emit('content.toggle', this.toOnlyContent);
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	
	.ratingSelect {
		.ratingType {
			margin: 0 18px;
			padding: 18px 0;
			font-size: 0;
			.border-1px(rgba(7, 17, 27, .1));
			.block {
				display: inline-block;
				margin-right: 8px;
				padding: 8px 12px;
				color: rgb(77, 85, 93);
				font-size: 12px;
				border-radius: 1px;
				.count { margin-left: 2px; line-height: 16px; font-size: 8px; font-style: normal;}
				&.active { color: #fff;}
				&.positive {
					background-color: rgba(0, 160, 220, .2);
					&.active { background-color: rgba(0, 160, 220, 1);}
				}
				&.negative {
					background-color: rgba(77, 85, 93, .2);
					&.active { background-color: rgba(77, 85, 93, 1);}
				}
			}
		}
		.switch {
			border-bottom: 1px solid rgba(7, 17, 27, .1);
			padding: 12px 18px;
			line-height: 24px;
			color: rgb(147, 153, 159);
			font-size: 0;
			.icon-check_circle { display: inline-block; margin-right: 4px; font-size: 24px; vertical-align: top;}
			.text { display: inline-block; font-size: 12px; vertical-align: top;}
			&.on .icon-check_circle { color: #00c850;}
		}
	}
</style>