<template>
	<view class="scene">
		<view class="scene-title">著名景观</view>
		<image class="scene-title_img" :src=titleImg mode="widthFix">
		</image>
		<view class="scene-img_list">
			<view class="scene-img_item" v-for="(item,index) in sceneList" :key="index">
				<view class="scene-img_img">
					<image @click="move(index,0)" :src="item.src1" :class="{moveImg: isMove && index === clickIndex}">
					</image>
					<image @click="move(index,1)" :src="item.src2"></image>
				</view>
				<view class="scene-img_detail">
					<view class="scene-img_text">
						{{item.text}}
					</view>
					<view class="scene-img_go">
						<image @click="clickToMap(index)" :src="go" mode="widthFix"></image>
					</view>
				</view>
				<image class="scene-img_icon" :src="item.icon" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { sceneList } from '../../data/scene.js'
	export default {
		data() {
			return {
				isMove: false,	// 首图是否左移
				clickIndex: 0,	// 点击的图片索引
				titleImg: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/undraw_Winners_re_wr1l-5.png',
				go: 'https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/daohang.png',
				sceneList,	
			}
		},
		methods: {
			// flag0表示点击首图，flag1表示点击第二张图
			move(index, flag) {
				if (flag) {
					this.isMove = false;
				} else {
					this.isMove = true;
					this.clickIndex = index;
				}
			},
			// 跳转手机地图
			clickToMap(index) {
				uni.openLocation({
					latitude: this.sceneList[index].latitude,
					longitude: this.sceneList[index].longitude
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 40rpx 0;
		.scene {
			position: relative;
		
			.moveImg {
				left: -100% !important;
			}
		
			.scene-title {
				margin: 40rpx;
				font-size: 40rpx;
				text-align: right;
				padding-right: 40rpx;
			}
		
			.scene-title_img {
				position: absolute;
				width: 320rpx;
				top: -120rpx;
				left: 40rpx;
			}
		
			.scene-img_list {
				margin: 40rpx 60rpx;
		
				.scene-img_item {
					margin-bottom: 60rpx;
					position: relative;
					height: 500rpx;
					padding: 40rpx;
					background-color: rgba(255, 237, 173, 0.5);
					border-radius: 15px;
		
					.scene-img_img {
						position: relative;
						height: 420rpx;
						overflow: hidden;
		
						image {
							height: 420rpx;
							width: 100%;
							border-radius: 15px;
							position: absolute;
							transition: left 0.7s;
		
							&:nth-child(1) {
								left: 0;
								top: 0;
								z-index: 1;
							}
						}
		
						&::after {
							position: absolute;
							content: "";
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							background-color: rgba(0, 0, 0, 0.2);
							border-radius: 15px;
							z-index: 2;
							pointer-events: none;
						}
					}
		
					.scene-img_detail {
						margin-top: 30rpx;
						font-size: 36rpx;
						display: flex;
						justify-content: space-between;
						padding-right: 20rpx;
		
						.scene-img_text {}
		
						.scene-img_go {
							image {
								width: 54rpx;
							}
						}
					}
		
					.scene-img_icon {
						position: absolute;
						bottom: 140rpx;
						left: 70rpx;
						width: 80rpx;
						z-index: 3;
					}
				}
			}
		}
	}
	
</style>
