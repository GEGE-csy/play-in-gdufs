<template>
	<view class="book-list">
		<view class="book-item" 
					v-for="(item,index) in searchList" 
					:key="item.id">
			<view class="book-item-info">
				<image :src="item.img" mode="widthFix"></image>
				<view class="book-detail">
					<view class="book-name">{{item.title}}</view>
					<view class="book-author">{{item.author}}</view>
				</view>
			</view>
			<view class="book-item-op">
				<view @click="downloadFile" class="book-item-download">
					下载
				</view>
				<view class="book-item-review">
					预览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 根据用户搜索关键词显示的书籍列表
		name: "search-list",
		props: ['searchList'],
		methods: {
			downloadFile() {
				uni.downloadFile({
					// 下载资源的url（）
					url,
					success: res => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.book-list {
		height: 500px;
		padding: 15px 20px;

		.book-item {
			font-size: 14px;
			padding: 15px;
			background-color: #fff;
			border-radius: 12px;
			display: flex;
			justify-content: space-between;
			margin-top: 15px;

			&:first-child {
				margin-top: 0;
			}

			.book-item-info {
				display: flex;
				align-items: center;

				image {
					width: 40px;
					margin-right: 5px;
				}

				.book-detail {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;
				}
			}

			.book-item-op {
				display: flex;
				align-items: center;

				.book-item-download {
					margin-right: 10px;
					padding: 5px 10px;
					border-radius: 8px;
					background-color: #FAE7E0;
				}

				.book-item-review {
					padding: 5px 10px;
					border-radius: 8px;
					border: 1px solid #FAE7E0;
				}
			}
		}
	}
</style>
