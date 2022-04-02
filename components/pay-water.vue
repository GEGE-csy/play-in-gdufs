<template>
	<view class="pay-water">
		<swiper indicator-dots indicator-color="#FFE9D3" indicator-active-color="#FFAA54">
			<swiper-item v-for="(item,index) in waterSteps" :key="index">
				<view class="pay-water_steps">
					<image :src="item.img" @click="previewImg(index)"></image>
					<view class="pay-water-steps_bottom">
						<view class="pay-water_text">
							{{ item.text }}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { waterSteps } from '../data/service.js';
	export default {
		// 点击充校卡进入的详情界面，水费/电费/空调费
		name: "pay-water",
		props: {
			isConditioner: {	// 是否是空调费充值，默认是水费/电费充值
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				waterSteps,		// 充水费的步骤
			};
		},
		created() {
			if(this.isConditioner) {
				this.waterSteps[0].text = '线下充值地点：一饭对面';
				this.waterSteps.push({
					text: '线下充值：公众号',
					img: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/IMG_2578.jpg'
				})
			}
		},
		methods: {
			previewImg(index) {
				// 要预览的图片数组
				const imgUrls = this.waterSteps.map(item => item.img);
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
	.pay-water {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;

		swiper {
			height: 620rpx;
			width: 96%;

			.pay-water_steps {
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

				.pay-water-steps_bottom {
					display: flex;
					justify-content: center;
				}

				// .pay-water_index {
				// 	text-align: center;
				// 	color: #FFAA54;
				// 	background-color: #FFE9D3;
				// 	padding: 8rpx 16rpx;
				// 	border-radius: 6px;
				// 	font-size: 28rpx;
				// 	margin-right: 20rpx;
				// }

				.pay-water_text {
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
