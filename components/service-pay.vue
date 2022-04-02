<template>
	<view class="service-pay">
		<view class="service-pay_choose" v-if="!isEnter">
			<view class="service-pay_item" v-for="(item,index) in payType" :key="index" @click="enterDetail(index)">
				<image :src="item.icon" mode="widthFix"></image>
				<view class="service-pay_title">
					{{ item.text }}
				</view>
			</view>
		</view>
		<view v-else>
			<view class="return" @click="back">
				<image src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/fanhui.png" mode="widthFix"></image>
			</view>
			<!-- 校卡 -->
			<view class="service-pay_detail" v-if="typeIndex === 0">
				<pay-card></pay-card>	
			</view>
			<!-- 热水 -->
			<view class="service-pay_detail" v-else-if="typeIndex === 1">
				<pay-card isHotWater="true"></pay-card>
			</view>
			<!-- 水费/电费 -->
			<view class="service-pay_detail" v-else-if="typeIndex === 2 || typeIndex === 3">
				<pay-water></pay-water>
			</view>
			<!-- 空调费 -->
			<view class="service-pay_detail" v-else>
				<pay-water isConditioner="true"></pay-water>
			</view>
		</view>
	</view>
</template>

<script>
	import payCard from './pay-card.vue';
	import payWater from './pay-water.vue';
	import { payType } from '../data/service.js';
	export default {
		// 校园充值
		name: "service-pay",
		data() {
			return {
				payType,	// 循环校卡、热水、水费、电费、空调费
				typeIndex: 0, // 0校卡，1热水，2水费，3电费，4空调费
				isEnter: false, // false表示显示选择界面，true表示进入用户点击的详情界面
			};
		},
		components: {
			payCard,
			payWater
		},
		methods: {
			// 返回选择界面
			back() {
				this.isEnter = false;
			},
			// 判断进入哪个详情界面
			enterDetail(index) {
				this.typeIndex = index;
				this.isEnter = true;
			}
		}
	}
</script>

<style lang="scss">
	.service-pay {
		.return {
			image {
				width: 50rpx;
				margin-left: 20rpx;
			}
		}

		.service-pay_choose {
			display: flex;
			flex-wrap: wrap;

			.service-pay_item {
				background-color: #FFE9D3;
				display: flex;
				padding: 12rpx 24rpx;
				border-radius: 18px;
				width: 220rpx;
				height: 200rpx;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 20rpx;

				&:nth-child(4) {
					image {
						width: 85rpx;
						margin-top: 10rpx;
						margin-bottom: 10rpx;
					}
				}

				&:last-child {
					width: 530rpx;
					flex-direction: row;

					image {
						margin-right: 10rpx;
					}

					.service-pay_title {
						width: 70rpx;
					}
				}

				image {
					width: 90rpx;
				}

				.service-pay_title {
					color: #FFAA54;
				}
			}

		}
	}
</style>
