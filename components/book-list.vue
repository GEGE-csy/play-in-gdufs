<template>
	<view class="book-list">
		<view class="book-item" v-for="(item,index) in bookList" :key="item.id">
			<view class="book-item-info">
				<image :src="item.cover" mode="widthFix"></image>
				<view class="book-detail">
					<view class="book-name">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="book-item-op">
				<view @click="downloadFile(index,idList.includes(item.id),item.id)" class="book-item-download">
					{{idList.includes(item.id) ? '打开': '下载'}}
				</view>
				<view @click="previewFile(index)" class="book-item-review">
					预览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "book-list",
		props: ['bookList'],
		data() {
			return {
				downloadURL: 'https://gdufs.yansp.xyz/book/download',
				savedFile: [], // 已下载文件list
				idList: [], // 已下载文件idList
			}
		},
		methods: { // index:每个type中循环书的索引、flag:true打开、id:所有type中书的id
			downloadFile(index, flag, id) {
				if (flag) { // 打开
					uni.showLoading({
						title: '正在打开...'
					})
					// 找到当前点开的书
					const openIndex = this.savedFile.findIndex(file => file.id === id);
					uni.openDocument({ // 直接打开保存在本地的文件
						filePath: this.savedFile[openIndex].path,
						fileType: 'pdf',
						showMenu: true,
						success: res => {
							uni.hideLoading();
						}
					})
				} else {
					uni.showLoading({
						title: '正在下载...'
					})
					uni.downloadFile({ // 下载到本地，返回临时路径
						url: `${this.downloadURL}?path=${this.bookList[index].path}`,
						success: res => {
							uni.saveFile({ // 保存文件到本地，返回永久路径
								tempFilePath: res.tempFilePath, // 文件的临时路径，在应用本次启动期间可以正常使用
								success: res => {
									uni.openDocument({ // 直接打开保存在本地的文件
										filePath: res.savedFilePath,
										fileType: 'pdf',
										showMenu: true,
										success: res => {
											uni.hideLoading();
										},
									})
									// 要存进本地的文件信息对象
									const fileDetail = {
										id: this.bookList[index].id,
										path: res.savedFilePath
									};
									this.savedFile.push(fileDetail);
									uni.setStorage({ // 已下载的文件信息存进本地
										key: 'savedFile',
										data: this.savedFile
									})
								},
								fail: err => {
									uni.hideLoading();
									uni.showToast({
										title: '下载失败！',
										icon: 'error'
									})
								}
							})
						},
						fail: err => {
							uni.hideLoading();
							uni.showToast({
								title: '下载失败！',
								icon: 'error'
							})
						}
					})
				}
			},
			previewFile(index) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.$request({
					url: '/book/preview',
					method: 'POST',
					data: {
						page: 1,
						path: this.bookList[index].path
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					responseType: 'arraybuffer' // 流
				}).then(res => {
					const fileManager = uni.getFileSystemManager(); // 获取全局的文件管理器
					const filePath = `${wx.env.USER_DATA_PATH}/${this.bookList[index].name}.pdf`; // 文件存储到本地的路径
					fileManager.writeFile({
						data: res.data,
						filePath: filePath,
						encoding: 'binary',
						success: res => {
							uni.openDocument({ // 直接打开
								filePath: filePath,
								fileType: 'pdf',
								showMenu: true,
								success: res => {
									uni.hideLoading();
								}
							})
						}
					})
				})
			},
		},
		created() {
			// 读本地，初始化savedFile和idList
			uni.getStorage({
				key: 'savedFile',
				success: res => {
					const storageFile = res.data;
					this.savedFile = storageFile;
					this.idList = storageFile.map(item => item.id);
				}
			})
		},
		watch: {
			savedFile(curSavedList) {
				// 监视最新的保存文件list，更新idlist
				this.idList = curSavedList.map(item => item.id);
			}
		}
	}
</script>

<style lang="scss">
	.book-list {
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
					width: 100rpx;
					margin-right: 34rpx;
				}

				.book-detail {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;

					.book-name {
						width: 240rpx;
						font-size: 32rpx;
					}
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
					text-align: center;
					white-space: nowrap;
				}

				.book-item-review {
					padding: 5px 10px;
					border-radius: 8px;
					border: 1px solid #FAE7E0;
					text-align: center;
					white-space: nowrap;
				}
			}
		}
	}
</style>
