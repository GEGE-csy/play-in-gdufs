<template>
	<view class="welcome">
		<view class="welcome-title">玩<br>转广外</view>
		<view class="welcome-content">这里有很全面的广外消息..</view>
		<view class="welcome-btn" @click="getUserInfo">点击开始这段旅程</view>
		<image class="welcome-img" :src="welcomeImg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				profile: '',
				welcomeImg: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/welcome%E8%83%8C%E6%99%AF2.png'
			}
		},
		methods: {
			getUserInfo() {
				uni.getUserProfile({
					desc: '登录',
					lang: 'zh_CN',
					success: res => {
						uni.setStorage({
							key: 'userInfo',
							data: res.userInfo
						})
						uni.navigateTo({
							url: '/pages/home/home'
						})
					},
				});	
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #CED6EF;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.welcome {
			width: 70%;

			.welcome-title {
				color: #fff;
				font-size: 60rpx;
				margin-bottom: 20rpx;
				font-weight: bolder;
			}

			.welcome-content {
				color: #fff;
				margin-bottom: 40rpx;
			}

			.welcome-btn {
				display: inline-block;
				border-radius: 20rpx;
				background-color: #fff;
				color: #81a4ef;
				padding: 24rpx 40rpx;
			}

			.welcome-img {
				margin-top: 60rpx;
				width: 500rpx;
			}
		}
	}
</style>
