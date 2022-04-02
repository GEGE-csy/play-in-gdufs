<template>
	<view class="service">
		<view class="service-title">
			<view class="service-title_text">
				校园服务
			</view>
			<view class="service-title-img">
				<image :src="titleImg" mode="widthFix"></image>
			</view>
		</view>
		<!-- 切换校园充值、快递寄取、失物招领 -->
		<view class="service-head">
			<view @click="switchType(index)" 
						class="service-head_item" 
						v-for="(item,index) in title" 
						:key="index"
						:class="{activeService: index === activeIndex}">
				{{item}}
			</view>
		</view>
		<view class="service-content">
			<view class="service-content_detail">
				<view v-if="activeIndex === 0">
					<service-pay></service-pay>
				</view>
				<view v-else-if="activeIndex === 1">
					<service-courier-and-find :itemList="courierList"></service-courier-and-find>
				</view>
				<view v-else>
					<service-courier-and-find :itemList="findList"></service-courier-and-find>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import servicePay from '../../components/service-pay.vue';
	import serviceCourierAndFind from '../../components/service-courier-and-find.vue';
	import {
		courierList,
		findList
	} from '../../data/service.js'
	export default {
		data() {
			return {
				title: ['校园充值', '快递寄取', '失物招领'],
				titleImg: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E5%AE%9A%E4%BD%8D%E4%B8%A2%E5%A4%B1-3.png',
				activeIndex: 0,
				courierList,
				findList
			}
		},
		components: {
			servicePay,
			serviceCourierAndFind
		},
		methods: {
			switchType(index) {
				this.activeIndex = index;
			}
		},
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 40rpx;
		.service {
			margin: 80rpx 60rpx;

			.service-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 80rpx;
				padding: 0 20rpx;
				position: relative;

				.service-title_text {
					font-size: 40rpx;
				}

				.service-title-img {
					image {
						position: absolute;
						top: -70rpx;
						right: 0;
						width: 200rpx;
					}
				}
			}

			.service-head {
				display: flex;
				justify-content: center;
				margin-bottom: 50rpx;

				.service-head_item {
					flex: 1;
					text-align: center;
					color: #fff;
					padding: 10rpx 20rpx;
					color: #919191;
					border-radius: 12px;
					margin: 0 10rpx;
				}

				.activeService {
					color: #6ea0f0;
					background-color: #eaebf7;
				}
			}
		}
	}
</style>
