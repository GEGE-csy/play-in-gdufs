<template>
	<view class="school-introduction">
		<view class="school-intro_title">
			关于校园
		</view>
		<view class="school-intro_menu">
			<view @click="switchTab(index)" class="school-menu_item" v-for="(item,index) in menuList" :key="index">
				<image :src="item.url" mode="widthFix"></image>
				{{item.title}}
			</view>
		</view>
		<view class="school-content">
			<view v-if="activeIndex === 0">
				<school-profile></school-profile>
			</view>
			<view v-else-if="activeIndex === 1">
				<school-apperance></school-apperance>
			</view>
			<view v-else>
				<school-history></school-history>
			</view>
		</view>
	</view>
</template>

<script>
	import schoolProfile from '../../components/school-profile.vue';
	import schoolApperance from '../../components/school-apperance.vue';
	import schoolHistory from '../../components/school-history.vue'
	export default {
		data() {
			return {
				// 切换选项卡
				menuList: [{
						title: '学校简介',
						url: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E6%A0%A1%E5%9B%AD%E7%AE%80%E4%BB%8Bicon.png'
					},
					{
						title: '校园概貌',
						url: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E6%A0%A1%E5%9B%AD%E6%A6%82%E8%B2%8Cicon.png'
					},
					{
						title: '历史记忆',
						url: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BF%86icon.png'
					}
				],
				activeIndex: 1, // 选项卡的切换index
			}
		},
		components: {
			schoolProfile,
			schoolApperance,
			schoolHistory
		},
		methods: {
			switchTab(index) {
				this.activeIndex = index;
			},
		},
		onLoad(options) {
			const name = options.name;
			// 初始化activeIndex
			this.activeIndex = (name === '学校简介') ? 0 : (name === '校园概貌') ? 1 : 2;
		}
	}
</script>

<style lang="scss">
	.school-introduction {
		.school-intro_title {
			font-size: 40rpx;
			padding: 50rpx 60rpx;
		}

		.school-intro_menu {
			display: flex;
			padding-left: 60rpx;
			justify-content: space-between;

			.school-menu_item {
				margin-right: 40rpx;
				font-size: 32rpx;
				padding: 20rpx 40rpx;
				border-radius: 40rpx;
				word-break: keep-all;

				image {
					width: 30px;
				}

				&:first-child {
					background-color: #f7f3de;
					color: #e1b164;
				}

				&:nth-child(2) {
					background-color: #f7ede7;
					color: #FF8960;
				}

				&:nth-child(3) {
					background-color: #eaebf7;
					color: #6ea0f0;
					margin-right: 0;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}
			}
		}

		.school-content {
			padding: 60rpx;
			margin-bottom: 30rpx;
			padding-bottom: 100rpx;
		}
	}
</style>
