<template>
	<view class="school-apperance">
		<view class="school-apperance_position">
			<map class="school-apperance_map" :longitude="longitude" :latitude="latitude" :markers="markers"
				:scale="15"></map>
			<view class="school-position_title">
				地理位置
				<view @click="clickToMap" class="click-open-map">
					<image src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/daozhequ-2.png" mode="widthFix">
					</image>
					到这去
				</view>
			</view>
		</view>
		<view class="school-apperance_area">
			<view v-for="(item,index) in schoolApperanceImgs" :key="index">
				<text>{{item.text}}</text>
				<image @click="preview(index,'img')" :src="item.url" mode="widthFix"></image>
			</view>
		</view>
		<view class="school-img_title">校园的每一角</view>
		<view class="school-img_list">
			<swiper autoplay :interval="2000" circular>
				<swiper-item @click="preview(index,'slides')" v-for="(item,index) in schoolApperanceSlides" :key="index">
					<view class="school-img_item">
						<image :src="item.url"></image>
						<view class="school-img_text">
							{{item.text}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { schoolApperanceImgs,schoolApperanceSlides } from '../data/school.js'
	export default {
		// 校园概貌
		name: "school-apperance",
		data() {
			return {
				// map配置
				longitude: 113.397523, // 坐标经度
				latitude: 23.063914, // 坐标纬度
				markers: [{
					id: 12345,
					longitude: 113.397523,
					latitude: 23.063914,
					iconPath: "https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E5%9D%90%E6%A0%87icon.png",
					width: 38,
					height: 38
				}],
				schoolApperanceImgs,	// 教学区平面图、生活区平面图
				schoolApperanceSlides	// 轮播图
			}
		},
		methods: {
			// 预览图片
			preview(index, obj) {
				const target = (obj === 'img') ? this.schoolApperanceImgs : this.schoolApperanceSlides;
				// 要预览的图片数组
				const imgUrls = target.map(item => item.url);
				// 当前预览图
				const currentUrl = imgUrls[index];
				uni.previewImage({
					urls: imgUrls,
					current: currentUrl
				});
			},
			// 打开手机地图
			clickToMap() {
				uni.openLocation({
					latitude: this.latitude,
					longitude: this.longitude,
				})
			}
		}
	}
</script>

<style lang="scss">
	.school-apperance {
		.school-apperance_position {
			border-bottom-left-radius: 16rpx;
			border-bottom-right-radius: 16rpx;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
			margin-bottom: 40rpx;

			.school-position_title {
				text-align: center;
				padding: 30rpx;
				font-size: 32rpx;
				position: relative;

				.click-open-map {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					position: absolute;
					right: 14rpx;
					bottom: 18rpx;
					font-size: 28rpx;
					color: #FF8960;
					border: 1px solid #FF8960;
					border-radius: 10px;
					padding: 10rpx;

					image {
						width: 40rpx;
					}
				}
			}

			.school-apperance_map {
				width: 100%;
				height: 400rpx;
			}
		}

		.school-position_title {
			font-size: 40rpx;
			margin-bottom: 40rpx;
		}

		.school-img_title {
			font-size: 40rpx;
			margin-bottom: 40rpx;
		}

		.school-img_list {
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
			border-radius: 12px;

			swiper {
				height: calc(600 / 1000 * 750rpx);

				image {
					width: 100%;
					border-top-left-radius: 12px;
					border-top-right-radius: 12px;
					height: 360rpx;
					position: absolute;
					top: 0;
				}

				.school-img_item {
					text {
						text-align: center;
					}

					.school-img_text {
						position: absolute;
						bottom: 10px;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}

		.school-apperance_area {
			text {
				font-size: 40rpx;
				margin-top: 20rpx;
			}

			image {
				margin: 40rpx 0;
			}
		}
	}
</style>
