<template>
	<view class="publish">
		<view class="publish-head_container">
			<view class="publish-head_title">
				了解广外
			</view>
			<view class="publish-head_text">
				这里有最全的广外宣传视频
			</view>
			<image :src="publishImg" mode="widthFix"></image>
		</view>
		<text>精彩回顾</text>
		<view class="publish-hot">
			<view class="publish-hot_item" v-for="(item,index) in hotList" :key="index">
				<video :id="item.id" :src="item.path" :object-fit="cover"></video>
				<view class="publish-hot_title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				publishImg: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/publish%E6%8F%92%E7%94%BB.png',
				hotList: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: '正在加载...'
			})
			this.$request({
				url: '/video',
				method: 'POST'
			}).then(res => {
				uni.hideLoading();
				this.hotList = res.data.data;
			})
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgba(255, 246, 212, 0.5);

		.publish {
			.publish-head_container {
				box-sizing: border-box;
				padding: 60rpx;
				position: relative;
				background-color: #f9e9b0;

				image {
					position: absolute;
					width: 340rpx;
					right: 0px;
					top: -30rpx;
				}

				.publish-head_title {
					color: #FF8960;
					font-size: 44rpx;
					font-weight: bold;
					margin: 30rpx 0 20rpx 0;
					letter-spacing: 10rpx;
				}

				.publish-head_text {
					margin-bottom: 30rpx;
					font-size: 28rpx;
					color: #808080;
				}
			}

			&>text {
				color: #FF8960;
				font-size: 36rpx;
				margin-left: 60rpx;
				padding-top: 40rpx;
				display: block;
			}

			.publish-hot {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 40rpx 60rpx;

				.publish-hot_item {
					margin-bottom: 40rpx;
					border-radius: 24rpx;
					background-color: #fff;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.1);

					video {
						width: 280rpx;
						height: 160rpx;
						border-top-left-radius: 24rpx;
						border-top-right-radius: 24rpx;
					}

					.publish-hot_title {
						text-align: center;
						margin: 10rpx 0;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
