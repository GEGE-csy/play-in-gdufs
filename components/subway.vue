<template>
	<view class="subway">
		<view class="subway-item" v-for="(item,index) in subwayList" :key="index">
			<view class="subway-item_title">
				{{item.title}}
			</view>
			<view class="subway-item_distance">
				距此{{item.distance}}km
			</view>
			<view class="subway-station">
				<view class="subway-station_item" v-for="(item,index) in item.station" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { subwayList } from '../data/car.js';
	export default {
		name: "subway",
		data() {
			return {
				subwayList
			};
		}
	}
</script>

<style lang="scss">
	.subway {
		margin: 30rpx 80rpx 60rpx 80rpx;

		.subway-item {
			border-radius: 12px;
			background-color: #eaebf7;
			padding: 60rpx;
			margin-bottom: 50rpx;

			.subway-item_title {
				font-size: 40rpx;
				color: #6ea0f0;
				font-weight: bold;
				letter-spacing: 4px;
				margin-bottom: 10rpx;
			}

			.subway-item_distance {
				color: #aaa;
				margin-bottom: 20rpx;
			}

			.subway-station {
				display: flex;

				.subway-station_item {
					font-size: 32rpx;
					background: rgba(255, 255, 255, 0.5);
					margin-right: 30rpx;
					padding: 10rpx 40rpx;
					border-radius: 12px;
					color: #6ea0f0;
				}
			}
		}
	}
</style>
