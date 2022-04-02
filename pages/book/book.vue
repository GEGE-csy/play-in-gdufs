<template>
	<view class="book">
		<view class="book-head-container">
			<view class="book-head">找到你需要的书籍</view>
			<image src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/book%E6%8F%92%E7%94%BB.png"
				mode="widthFix"></image>
			<view class="book-search">
				<image
					src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/%E6%90%9C%E7%B4%A2%E6%8C%89%E9%92%AE.png"
					mode="widthFix"></image>
				<input type="text" placeholder="请输入关键词" v-model="keyword" @input="handleSearch" />
			</view>
		</view>
		<view v-show="!isSearch" class="book-category">
			<view class="book-category-container">
				<view @click="switchCate(index)" :class="{activeBook: index === activeIndex}" class="book-category-item"
					v-for="(item,index) in category" :key="index">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<view class="book-show-cnt" v-show="isSearch">
			查询到{{ cnt }}条相关信息
		</view>
		<book-list :bookList="bookList"></book-list>
	</view>
</template>

<script>
	import bookList from '../../components/book-list.vue';
	import searchList from '../../components/search-list.vue'
	export default {
		data() {
			return {
				activeIndex: 0, // 专业书籍、教材精选、文学名著、休闲小说切换index
				isSearch: false, //是否在搜索
				keyword: '', // 搜索词
				category: ['专业书籍', '教材精选', '文学名著', '休闲小说'],
				bookList: [],
				cnt: 0, // 搜索到的书的条目
			}
		},
		components: {
			bookList,
			searchList
		},
		methods: {
			// 切换书的类别
			switchCate(index) {
				this.activeIndex = index;
				this.getBookList();
			},
			// 搜索
			handleSearch(e) {
				let content = e.detail.value;
				this.isSearch = content === '' ? false : true;
				this.$request({
					url: '/book/search',
					method: 'POST',
					data: {
						key: content
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
				}).then(res => {
					// 找到书
					if (res.data.code === 200) {
						this.bookList = res.data.data;
						this.cnt = this.bookList.length;
					} else {	// 找不到书
						this.bookList = [];
						this.cnt = 0;
					}
				}, reason => {
					uni.showToast({
						title: '查询失败！',
						icon: 'error',
					})
				})
			},
			// 获取书本list
			getBookList() {
				uni.showLoading({
					title: '正在加载...'
				})
				this.$request({
					url: '/book/list',
					data: {
						type: this.activeIndex + 1
					}
				}).then(res => {
					uni.hideLoading();
					this.bookList = res.data.data;
				})
			}
		},
		onLoad() {
			this.getBookList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FAE7E0;

		.book {
			.book-head-container {
				padding: 40rpx 60rpx;
				position: relative;
				background-color: #FF8960;

				.book-head {
					margin: 60rpx 0 50rpx 0;
					font-size: 40rpx;
					padding-left: 20rpx;
				}

				image {
					position: absolute;
					width: 230rpx;
					top: 24rpx;
					right: 36rpx;
					z-index: 1000;
				}

				.book-search {
					position: relative;
					background-color: #f5f6f9;
					height: 84rpx;
					border-radius: 48rpx;
					margin-bottom: 40rpx;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.1);

					image {
						position: absolute;
						width: 36rpx;
						top: 24rpx;
						left: 30rpx;
					}

					input {
						position: absolute;
						width: 80%;
						top: 20rpx;
						left: 92rpx;
					}
				}
			}

			.book-category {
				padding: 40rpx 30rpx;
				background-color: #fff;

				.book-category-container {
					display: flex;

					view {
						flex: 1;
						justify-content: center;
						text-align: center;
						padding-bottom: 16rpx;
					}
				}
			}

			.activeBook {
				border-bottom: 2px solid #FFa365;
			}

			.book-show-cnt {
				text-align: center;
				margin-top: 40rpx;
			}
		}
	}
</style>
