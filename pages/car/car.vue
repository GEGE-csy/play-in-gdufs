<template>
	<view class="car">
		<view class="car-head">
			<view class="car-head_title">
				选择你喜欢的出行方式吧
			</view>
			<!-- 选择公交还是地铁 -->
			<view class="car-head_route">
				<view class="car-head-route_item" v-for="(item,index) in routeType" :key="index"
					:class="{activeRoute: index === activeIndex }" @click="switchRoute(index)">
					<view class="car-route-item_icon">
						<image :src="item.icon" mode="widthFix"></image>
					</view>
					<view class="car-route-item_text">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<view class="car-body_container">
			<view v-if="activeIndex === 0">
				<bus></bus>
			</view>
			<view v-else>
				<subway></subway>
			</view>
		</view>
	</view>
</template>

<script>
	import bus from '../../components/bus.vue';
	import subway from '../../components/subway.vue';
	export default {
		data() {
			return {
				routeType: [{
						title: '公交路线',
						icon: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/gongjiao.png'
					},
					{
						title: '地铁路线',
						icon: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/ditie.png'
					}
				],
				activeIndex: 0, // 0公交，1地铁
			}
		},
		components: {
			bus,
			subway
		},
		methods: {
			switchRoute(index) {
				this.activeIndex = index;
			},
		}
	}
</script>

<style lang="scss">
	.car {
		.car-head {
			background-color: #526cf4;
			background-color: rgba(82, 108, 244, 0.9);
			padding: 60rpx;
			padding-bottom: 90rpx;

			.car-head_title {
				color: #fff;
				font-size: 20px;
				margin: 0 auto 20px;
				width: 80%;
			}

			.car-head_route {
				display: flex;
				justify-content: space-between;

				.activeRoute {
					border: 1px solid rgba(255, 255, 255, 0.6);
				}

				.car-head-route_item {
					background-color: #7387f4;
					padding: 30rpx 60rpx 20rpx 30rpx;
					border-radius: 12px;
					box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
					box-sizing: border-box;
					width: 45%;

					&:first-child {
						margin-left: 0;
					}

					.car-route-item_icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: fit-content;
						padding: 10rpx;
						background-color: #fff;
						border-radius: 8px;

						image {
							width: 50rpx;
						}
					}

					.car-route-item_text {
						margin: 20rpx 0;
						color: #fff;
					}
				}
			}

		}

		.car-body_container {
			border-radius: 20px;
			background-color: #fff;
			position: relative;
			top: -40rpx;
			padding-top: 40rpx;
		}
	}
</style>
