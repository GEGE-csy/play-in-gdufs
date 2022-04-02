<template>
	<view class="timeline">
		<view class="timeline-item" v-for="(item,index) in schoolHistoryTimeline[activeIndex].detail" :key="index">
			<view class="timeline-item_time">
				{{ item.time }}
			</view>
			<view class="timeline-item_line">
				<view class="timeline-item_outer">
					<view class="timeline-item_inner"></view>
				</view>
			</view>
			<view class="timeline-item_content">
				<view class="school-history_event">
					<view class="school-history_detail">{{item.event}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { schoolHistoryTimeline } from '../../data/school.js'
	export default {
		data() {
			return {
				schoolHistoryTimeline
			}
		},
		props: {
			activeIndex: {
				type: Number
			}
		},
	}
</script>

<style lang="scss">
	.timeline {
		margin-top: 60rpx;

		.timeline-item {
			display: flex;

			&:last-child {
				.timeline-item_time {
					background-color: transparent;
				}
			}

			.timeline-item_time {
				width: 120rpx;
				padding: 5rpx 10rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #6ea0f0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				background: #eaebf7;
				height: 40rpx;
				border-radius: 30rpx;
				margin-right: 20rpx;
				text-align: center;
			}

			.timeline-item_line {
				width: 1px;
				background: rgba(204, 204, 204, 1);
				position: relative;
				top: 10rpx;

				.timeline-item_outer {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					justify-content: center;
					align-items: center;
					width: 28rpx;
					height: 28rpx;
					background: #eaebf7;
					border-radius: 50%;

					.timeline-item_inner {
						width: 16rpx;
						height: 14rpx;
						background: #6ea0f0;
						border-radius: 50%;
					}
				}
			}

			.timeline-item_content {
				flex: 1;
				padding: 0 10rpx 40rpx;
				margin-left: 20rpx;
				min-height: 50rpx;

				.school-history_event {
					padding: 20rpx 30rpx;
					box-sizing: border-box;
					background-color: #eaebf7;
					box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
					border-radius: 20rpx;
					margin-bottom: 30rpx;

					.school-history_detail {
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

				}
			}
		}
	}
</style>
