<template>
	<view class="school-profile">
		<swiper indicator-dots 
						autoplay 
						circular 
						indicator-active-color="#fff" 
						@change="changeSlides">
			<swiper-item v-for="(item,index) in schoolProfileSLides" 
									 :key="item.id"
									 @click="preview(index)">
				<image :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="school-content_word">
			{{schoolProfileTexts[currentSlide]}}
		</view>
	</view>
</template>

<script>
	import { schoolProfileSLides,schoolProfileTexts } from '../data/school.js';
	export default {
		// 学校简介
		name:"school-profile",
		data() {
			return {
				currentSlide: 0, // 轮播图index
				schoolProfileSLides,	// 轮播图地址
				schoolProfileTexts	// 轮播图文字
			};
		},
		methods: {
			// 记录轮播图当前的index
			changeSlides(e) {
				this.currentSlide = e.detail.current;
			},
			// 预览图片
			preview(index) {
				// 要预览的图片数组
				const imgUrls = this.schoolProfileSLides;
				// 当前预览图
				const currentUrl = imgUrls[index];
				uni.previewImage({
					urls: imgUrls,
					current: currentUrl
				});
			},
		}
	}
</script>

<style lang="scss">
.school-profile {
	swiper {
		height: calc(600 / 1100 * 750rpx);
		margin-bottom: 40rpx;
	
		swiper-item {
			border-radius: 24rpx;
			image {
				width: 100%;
			}
		}
	}
	.school-content_word {
		padding: 0 10rpx;
		font-size: 32rpx;
		line-height: 50rpx;
	}
}
</style>
