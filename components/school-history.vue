<template>
	<view class="school-history">
		<view class="school-history_title">
			{{type[activeIndex]}}
		</view>
		<view @click="switchUnfold" class="school-history_btn">
			<image :style="{transform: (isUnfold ? 'rotate(0)':'rotate(-90deg)')}"
				src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E5%B1%95%E5%BC%80%E6%8C%89%E9%92%AE.png">
			</image>
		</view>
		<!-- 隐藏盒，选择切换时间表 -->
		<view :class="{unfoldBox: isUnfold}" class="choose-history">
			<view class="history-type" @click="changeHistoryType(index)" :class="{activeHistory: index === activeIndex}"
				v-for="(item,index) in type" :key="index">
				{{item}}
			</view>
		</view>
		<timeline :activeIndex="activeIndex"></timeline>
	</view>
</template>

<script>
	import timeline from './foreign-timeline/timeline.vue';
	export default {
		name: "school-history",
		data() {
			return {
				type: [
					'广州外国语学院年表（1965-1980）',
					'广州外国语学院年表（1980-1995）'
				],
				activeIndex: 0, // 激活的index
				isUnfold: false, // 是否展开隐藏列表
			};
		},
		components: {
			timeline
		},
		methods: {
			// 按钮的切换，控制展开/不展开隐藏列表
			switchUnfold() {
				this.isUnfold = !this.isUnfold;
			},
			// 切换历史表
			changeHistoryType(index) {
				this.activeIndex = index;
				this.isUnfold = false;
			}
		},
	}
</script>

<style lang="scss">
	.school-history {
		position: relative;

		.school-history_title {
			font-size: 34rpx;
		}

		.school-history_btn {
			position: absolute;
			right: 20rpx;
			top: -6rpx;

			image {
				width: 60rpx;
				height: 60rpx;
				transform: rotate(-90deg);
				transition: 0.3s transform;
			}
		}

		.choose-history {
			display: none;
			border-radius: 10rpx;
			margin: 30rpx 0 60rpx 0;
			overflow: hidden;

			.history-type {
				margin-left: 20rpx;

				&:first-child {
					margin-bottom: 20rpx;
				}
			}

			// 激活的选项
			.activeHistory {
				color: #6ea0f0;
			}
		}

		// 展开
		.unfoldBox {
			display: block;
		}
	}
</style>
