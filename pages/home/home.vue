<template>
	<view class="home">
		<view class="home-head">
			<image class="home-image"
				:src="homeImg"
				mode="widthFix"></image>
			<view class="home-title">
				欢迎回来，<text>{{name}}</text>
			</view>
			<view class="home-p">
				更多信息等你自己探索哦
			</view>
		</view>
		<view class="home-nav-container">
			<view class="home-nav" v-for="(item,index) in homenav" :key="index">
				<text>{{item.title}}</text>
				<view>
					<view class="home-nav-item" v-for="(item,index) in item.items" :key="index">
						<navigator :url="`${item.path}?name=${item.name}`">
							<view :style="{backgroundColor: item.bgColor}">
								<image :class="item.class" :src="item.icon" mode="widthFix"></image>
							</view>
							<text class="home-nav-content">
								{{item.name}}
							</text>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { homenav } from '../../data/home.js';
	export default {
		data() {
			return {
				name: '', // 用户姓名
				homeImg: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E9%A6%96%E9%A1%B5%E6%8F%92%E7%94%BB.png',
				homenav,
				coursePath: '/pages/course/course'
			}
		},
		onShow() {
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					this.name = res.data.nickName;
					// 缓存中有课表就直接跳转课表页面，否则先登录
					uni.getStorage({
						key: 'table',
						success: res => {
							const item = homenav[0].items;
							item[1].path = '/pages/course/course'
						},
					})
				}
			})
		},
		// created() {
			
		// }
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f6f9;
		height: 100%;

		.home {
			height: 100%;

			.home-head {
				padding: 60rpx 80rpx;
				box-sizing: border-box;
				background-color: rgba(110, 160, 240, 0.5);
				position: relative;

				.home-image {
					position: absolute;
					width: 300rpx;
					right: 4rpx;
				}

				.home-title {
					color: #030706;
					font-size: 44rpx;
					margin-bottom: 20rpx;
					width: 360rpx;
					text {
						display: inline-block;
					}
				}

				.home-p {
					color: #787575;
					font-size: 28rpx;
					margin-bottom: 40rpx;
				}

			}

			.home-nav-container {
				box-sizing: border-box;
				padding: 90rpx 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #f5f6f9;

				.home-nav {
					&>text {
						color: #868998;
						font-weight: bold;
						margin-left: 60rpx;
					}

					&>view {
						display: flex;

						.home-nav-item {
							margin: 30rpx 50rpx;
							font-size: 28rpx;

							navigator {
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;

								.home-nav-content {
									margin-top: 16rpx;
									color: #030706;
									font-weight: normal;
								}

								view {
									border-radius: 24rpx;
									height: 100rpx;
									width: 130rpx;
									display: flex;
									justify-content: center;
									align-items: center;
									box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.1);
								}

								.home-book {
									width: 56rpx;
								}

								.home-course {
									width: 64rpx;
								}

								.home-publish {
									width: 64rpx;
								}

								.home-intro {
									width: 66rpx;
								}

								.home-face {
									width: 62rpx;
								}

								.home-history {
									width: 60rpx;
								}

								.home-scene {
									width: 60rpx;
								}

								.home-car {
									width: 56rpx;
								}

								.home-service {
									width: 60rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
