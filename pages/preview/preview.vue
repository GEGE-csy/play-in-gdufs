<template>
	<view class="preview">
		<!-- <image :src="img" mode="widthFix"></image> -->
	</view>
</template>

<script>
	// import {weBtoa} from '../../util/wep.js';
	export default {
		data() {
			return {
				path: '',
				name: '',
				// img: '',
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.path = options.path;
			this.name = options.name;
		},
		onShow() {
			uni.showLoading({
				title: '正在加载...'
			})
			this.$request({
				url: '/book/preview',
				method: 'POST',
				data: {
					page: 1,
					path: this.path
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				responseType: 'arraybuffer'	// 流
			}).then(res => {
					console.log(res.data)
				  //   var binary = '';
				  //   var bytes = new Uint8Array( res.data );
						// const str = String.fromCharCode(...bytes);
						// const data = weBtoa(str);
						// console.log(data);
						
						// const imgData = data.replace(/[\r\n]/g, '')
						 // this.img = `data:image/png;base64,${data.replace(/[\r\n]/g, '')}`;
				    // var len = bytes.byteLength;
				    // for (let i = 0; i < len; i++) {
				    //     binary += String.fromCharCode( bytes[ i ] );
				    // }
				// console.log(res.data);
				// const arrayBuffer = new Uint8Array(res.data);
				// console.log(arrayBuffer);
				// const base64 = uni.arrayBufferToBase64(arrayBuffer);
				// console.log(base64);
				// const base64ImgUrl = 'data:image/png;base64,' + base64;
				// this.img = base64ImgUrl.replace(/[\r\n]/g,""); 
				// console.log(base64ImgUrl);
				// console.log(res);
				const fileManager = uni.getFileSystemManager();	// 获取全局的文件管理器
				const filePath = `${wx.env.USER_DATA_PATH}/${this.name}.pdf`;	// 文件存储到本地的路径
				fileManager.writeFile({
					data: res.data,
					filePath: filePath,
					encoding: 'binary',
					success: res => {
						console.log(res);
						uni.openDocument({	// 直接打开
							filePath: filePath,
							fileType: 'pdf',
							showMenu: true,
							success: res => {
								// uni.hideLoading();
							}
						})
					}
				})
				
			})
		}
	}
</script>

<style lang="scss">

</style>
