<template>
	<view class="course-login">
		<image src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/Unknown.png" mode="widthFix"></image>
		<view class="course-login_head">
			<view class="course-login_title">
				友情提示
			</view>
			<view class="course-login_tip">
				课表需要授权学生账号密码才可查看
			</view>
		</view>
		<view class="course-login_form">
			<form @submit="formSubmit" @reset="formReset">
				学号<br>
				<input class="course-login_number" name="username" v-model="username" type="text" placeholder="请输入您的学生账号" />
				密码<br>
				<input class="course-login_pwd" name="password" v-model="password" type="password" placeholder="请输入您的密码" />
				验证码<br>
				<view class="course-login_code">
					<input name="code" v-model="code" type="text" placeholder="请输入右图验证码" />
					<image @click="changeCode" class="course-code_img" :src="codePath"></image>
				</view>
				<view class="course-form_btn">
					<button form-type="reset" plain>重置</button>
					<button form-type="submit" plain>提交</button>
				</view>
			</form>
		</view>
		<view class="course-login_state">
			郑重声明：<br>我们承诺为您的个人信息保密，不会泄露给第三方
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',	// 学号
				password: '',	// 密码
				code: '',	// 输入验证码
				codePath: '', // 验证码图片链接
				cookie: '',	// 验证码cookie
			}
		},
		methods: {
			// 提交表单，获取课表
			formSubmit(e) {
				this.$request({
					url: '/schedule/submit',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						username: this.username,
						password: this.password,
						code: this.code,
						cookie: this.cookie
					}
				}).then(res => {
					console.log(res);
					if(res.data === '登录失效') {
						uni.showToast({
							title: '登录失败！',
							icon: 'error'
						})
						// 重新加载验证码
						this.getCode();
						return;
					}
					uni.setStorage({
						key: 'table',
						data: res.data,
					});
					// 清空输入框
					this.username = '';
					this.password = '';
					this.code = '';
					uni.showToast({
						title: '登录成功！',
						icon: 'success',
						duration: 2500,
						success: res => {
							uni.navigateTo({
								url: '/pages/course/course'
							})
						}
					})
				})
			},
			// 获取验证码的url
			getCode() {
				this.$request({
					url: '/schedule/code',
					method: 'POST',
				}).then(res => {
					this.codePath = res.data.path;
					this.cookie = res.data.cookie;
				})
			},
			// 点击验证码图片，更换新的验证码
			changeCode() {
				this.getCode();
			}
		},
		onShow() {
			this.getCode();
		}
	}
</script>

<style lang="scss">
	.course-login {
		width: 80%;
		margin: 0 auto;

		&>image {
			width: 360rpx;
			margin: 0 80rpx;
		}

		.course-login_head {
			display: flex;
			align-items: center;
			flex-direction: column;

			.course-login_title {
				font-size: 46rpx;
				letter-spacing: 5px;
				margin-bottom: 10rpx;
				text-align: center;
			}

			.course-login_tip {
				width: 80%;
				text-align: center;
				font-size: 28rpx;

			}
		}

		.course-login_form {
			margin-top: 70rpx;
			position: relative;

			&::after {
				position: absolute;
				content: '';
				bottom: -30px;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #f6f5f5;
			}

			input {
				height: 40px;
				background-color: #f5f6f5;
				margin: 20rpx 0;
				padding-left: 10px;
				border-radius: 4px;
			}

			.course-login_code {
				display: flex;
				justify-content: space-between;
				align-items: center;

				input {}

				.course-code_img {
					width: 100px;
					height: 40px;
				}
			}
		}

		.course-form_btn {
			display: flex;
			margin-top: 40rpx;

			button {
				outline: none;
				border-radius: 16px;

				&:first-child {
					margin-right: 30rpx;
					border: 1px solid #819ee4;
					color: #819ee4;
					flex: 1;
				}

				&:nth-child(2) {
					background-color: #FF9784;
					color: #fff;
					border: 1px solid #FF8960;
					flex: 2;
				}
			}
		}


		.course-login_state {
			width: 70%;
			font-size: 28rpx;
			text-align: center;
			margin: 100rpx auto;
		}
	}
</style>
