<template>
	<view class="pay-card">
		<swiper indicator-dots indicator-color="#FFE9D3" indicator-active-color="#FFAA54">
			<swiper-item v-for="(item,index) in cardSteps" :key="index">
				<view class="pay-card_steps">
					<image :src="item.img" @click="previewImg(index)"></image>
					<view class="pay-car-steps_bottom">
						<view class="pay-card_index">
							步骤{{index+1}}
						</view>
						<view class="pay-card_text">
							{{ item.text }}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { cardSteps } from '../data/service.js';
	export default {
		// 点击充校卡进入的详情界面，校卡/热水
		name: "pay-card",
		props: {
			isHotWater: {	// 是否是热水充值，默认是校卡充值
				type: Boolean,
				default: false
			}
		},
		data() {
			return {	// 充校卡的步骤
				cardSteps,
			};
		},
		created() {
			this.cardSteps[3].text = !this.isHotWater ? '点击卡片充值' : '点击南校热水充值'
		},
		methods: {
			previewImg(index) {
				// 要预览的图片数组
				const imgUrls = this.cardSteps.map(item => item.img);
				// 当前预览图
				const currentUrl = imgUrls[index];
				uni.previewImage({
					urls: imgUrls,
					current: currentUrl
				})
			}
		}
	}
</script>

<style lang="scss">
	.pay-card {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	
		swiper {
			height: 620rpx;
			width: 96%;

			.pay-card_steps {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background: #FFF5EB;
				padding: 40rpx 0;
				border-radius: 8px;

				image {
					width: 540rpx;
					height: 360rpx;
					margin-bottom: 40rpx;
				}

				.pay-car-steps_bottom {
					display: flex;
					justify-content: center;
				}

				.pay-card_index {
					text-align: center;
					color: #FFAA54;
					background-color: #FFE9D3;
					padding: 8rpx 16rpx;
					border-radius: 6px;
					font-size: 28rpx;
					margin-right: 20rpx;
				}

				.pay-card_text {
					color: #FFAA54;
					background-color: #FFE9D3;
					padding: 8rpx 16rpx;
					border-radius: 6px;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
