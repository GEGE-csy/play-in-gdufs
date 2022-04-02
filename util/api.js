const BASE_URL = 'https://gdufs.yansp.xyz'

export const request = config => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + config.url,
			method: config.method || 'GET',	// 默认为get
			data: config.data || {},	// 参数
			header: config.header || {},	// 请求头，post默认请求头为application/json
			responseType: config.responseType || '', // 响应体类型
			success: res => {
				resolve(res);
			},
			fail: err => {
				uni.showToast({
					title: '请求接口失败！'
				})
				reject(err);
			}
		})
	})
}