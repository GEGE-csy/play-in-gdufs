<template>
	<view class="course">
		<view class="course-head">
			<view class="course-head_left">
				<view class="course-head_img">
					<image :src="head" mode="widthFix"></image>
				</view>
				<view class="course-head_title">
					你好，{{name}}
				</view>
			</view>
			<view @click="updateCourse" class="course-head_update">
				更新
			</view>
		</view>
		<view class="choose-weekday">
			<view>
				星期{{weekday}}
			</view>
			<image @click="handleShow" src="https://play-in-gdufs.oss-cn-beijing.aliyuncs.com/temp/zhankaigengduo.png"
				mode="widthFix">
			</image>
		</view>
		<view class="weekday-hide-box" v-show="isShow">
			<view @click="changeWeekDay(index)" class="weekday-hide-item" v-for="(item,index) in weekObj" :key="index">
				星期{{item}}
			</view>
		</view>
		<view class="course-list_container">
			<view class="course-time_container">
				<view class="course-time_item" v-for="(item,index) in time" :key="index">
					<view class="course-time_class">
						{{item.class}}
					</view>
					<view class="course-time_time">
						{{item.detailTime}}
					</view>
				</view>
			</view>
			<view class="course-subject_container">
				<view class="course-subject_item" v-for="(item,index) in todayCourse" :key="index"
					:class="{threeHeight: isThreeHeight[index]}" :style="{top: topArr[index] * 140 + 'rpx', 
							borderBottom: hasCourse[index] ? '2px solid #f4f4f4': 'none',
							borderTop: hasCourse[index] && index !== 0 ? '2px solid #f4f4f4': 'none'}">
					<view class="course-subject_style_item" :class="{activeCourse: hasCourse[index]}">
						<view class="course-subject-item_course">
							{{item.course}}
						</view>
						<view class="course-subject-item_place">
							{{item.room}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		time
	} from '../../data/course.js';
	import {
		cheerio
	} from '../../util/cheerio.js'
	export default {
		data() {
			return {
				head: '', // 头像
				name: '', // 名字
				weekday: '一', // 显示周几
				weekObj: {
					0: '天',
					1: '一',
					2: '二',
					3: '三',
					4: '四',
					5: '五',
					6: '六'
				},
				isShow: false, // 是否显示隐藏列表
				time, // 时间段
				table: '', // 后台返回的table课表，(html字符串)
				todayCourse: [], // 课程名
				hasCourse: [], // 是否有课，有课的话要添加activeClass类
				isThreeHeight: [], // 是否是三小节高度，默认不是
				topArr: [], // 存的是小节的开头数字-1，比如第9小节，就存8，top值设置成高度(140rpx)*8
			}
		},
		methods: {
			// 获取用户姓名和用户头像
			getUserInfo() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						this.head = res.data.avatarUrl;
						this.name = res.data.nickName;
					}
				})
			},
			// 设置当前是周几
			showCurDay() {
				const date = new Date();
				let curWeekday = date.getDay();
				this.weekday = this.weekObj[curWeekday];
			},
			// 点击展开按钮，显示选择周几
			handleShow() {
				this.isShow = !this.isShow;
			},
			// 点击隐藏盒中的周几，选择显示周几的课表
			changeWeekDay(index) {
				this.weekday = this.weekObj[index];
				this.isShow = false;
				this.getTodayCourse();
				this.computedStyle();
			},
			// 整合得到今天的课程
			getTodayCourse() {
				console.log(this.weekday);
				// 初始化数组
				this.todayCourse = [];
				const $ = cheerio.load(this.table);
				const kbcontent1 = Array.from($('.kbcontent1')); // 不包含小节名
				const kbcontent = Array.from($('.kbcontent')); // 包含小节名
				// 全部课程名
				const tableContent = kbcontent1.map(item => item.children[0].data);
				// 课程对应的小节名
				let section = [];
				kbcontent.forEach((item, index) => {
					section[index] = item.children.length > 1 ? item.children[4].children[2].data : '';
				})
				// 课程对应的教室名
				let tableRoom = [];
				kbcontent1.forEach((item, index) => {
					tableRoom[index] = item.children.length > 1 ? item.children[4].children[0].data : '';
				})
				const courseNameObj = {
					'1': tableContent.slice(0, 7), // 第一大节周1-周5的课
					'2': tableContent.slice(7, 14), // 第二大节
					'3': tableContent.slice(14, 21), // 第三大节
					'4': tableContent.slice(21, 28), // 第四大节
					'5': tableContent.slice(28, 35), // 第五大节
					'6': tableContent.slice(35, 42), // 第六大节
					'7': tableContent.slice(42, 49) // 第七大节
				};
				const roomNameObj = {
					'1': tableRoom.slice(0, 7), // 第一大节周1-周5的课室
					'2': tableRoom.slice(7, 14), // 第二大节
					'3': tableRoom.slice(14, 21), // 第三大节
					'4': tableRoom.slice(21, 28), // 第四大节
					'5': tableRoom.slice(28, 35), // 第五大节
					'6': tableRoom.slice(35, 42), // 第六大节
					'7': tableRoom.slice(42, 49) // 第七大节
				};
				const sectionNameObj = {
					'1': section.slice(0, 7), // 第一大节周1-周5的小节
					'2': section.slice(7, 14), // 第二大节
					'3': section.slice(14, 21), // 第三大节
					'4': section.slice(21, 28), // 第四大节
					'5': section.slice(28, 35), // 第五大节
					'6': section.slice(35, 42), // 第六大节
					'7': section.slice(42, 49) // 第七大节
				};
				// 获取现在点击的today，默认是今天的真实周几
				let today = '';
				Object.keys(this.weekObj).forEach(i => {
					if (this.weekday === this.weekObj[i]) {
						today = i;
					}
				});
				for (let i = 1; i <= 7; i++) {
					let itemObj = {};
					const itemCourse = courseNameObj[i];
					const itemRoom = roomNameObj[i];
					const itemSection = sectionNameObj[i];

					const todayCourse = itemCourse[today - 1];
					const todayRoom = itemRoom[today - 1];
					const todaySection = itemSection[today - 1];

					const sliceTodaySection = todaySection.slice(1, todaySection.length - 2); // 去掉括号和'节'
					const splitTodaySection = sliceTodaySection.split('-');

					itemObj['course'] = todayCourse;
					itemObj['room'] = todayRoom;
					itemObj['section'] = splitTodaySection;
					this.todayCourse.push(itemObj);
				}
			},
			// 有课的地方高亮，计算item的top值，处理三小节科目的特殊高度情况
			computedStyle() {
				this.hasCourse = new Array(7).fill(false); // 初始化
				const course = this.todayCourse.map(item => item.course);
				course.forEach((item, i) => {
					// 判断是否包含中文 // 这个地方不知道为什么，不是空字符串也不是一个空格？只能用正则了
					const reg = /[\u4E00-\u9FA5]/;
					this.hasCourse[i] = reg.test(course[i]) ? true : false;
				})

				this.topArr = new Array(7).fill(null); // 初始化
				this.isThreeHeight = new Array(7).fill(false); // 初始化
				const section = this.todayCourse.map(item => item.section);

				section.forEach((item, i) => {
					if (item.length > 1) { // 为1说明没有课
						let firstSection = item[0]; // 小节数组取第一个
						if (firstSection.startsWith('0')) {
							firstSection = firstSection.slice(1); // 去掉0
						}
						this.topArr[i] = firstSection - 1; // 设置top数组的值
						// 设置三小节的课目的高度
						this.isThreeHeight[i] = item.length === 3 ? 'true' : this.isThreeHeight[i];
					}
				})
			},
			// 跳转到表单页面，重新提交表单，更新课表
			updateCourse() {
				uni.navigateTo({
					url: '/pages/course-login/course-login'
				})
			}
		},
		onShow() {
			uni.getStorage({
				key: 'table',
				success: res => {
					this.table = res.data;
					this.getUserInfo();
					this.showCurDay();
					this.getTodayCourse(); // 获取当天的课表数据
					this.computedStyle(); // 设置当天的课表样式
				}
			})
		},
	}
</script>

<style lang="scss">
	.course {
		padding: 60rpx 40rpx;
		position: relative;

		.course-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15rpx;
			margin-bottom: 20rpx;

			.course-head_left {
				display: flex;
				align-items: center;

				.course-head_title {
					font-size: 40rpx;
					font-weight: bold;
				}

				.course-head_img {
					margin-right: 20rpx;

					image {
						width: 80rpx;
						border-radius: 50%;
					}
				}
			}

			.course-head_update {
				background-color: #6ea0f0;
				color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 12px;
			}

		}

		.choose-weekday {
			background-color: #eff0f3;
			height: 90rpx;
			position: relative;
			font-weight: bold;

			view {
				position: absolute;
				color: #abadb0;
				left: 20rpx;
				top: 20rpx;
			}

			image {
				position: absolute;
				width: 40rpx;
				right: 20rpx;
				top: 20rpx;
			}
		}

		.weekday-hide-box {

			.weekday-hide-item {
				background-color: #eff0f3;
				height: 90rpx;
				color: #abadb0;
				display: flex;
				align-items: center;
				padding-left: 20rpx;
			}
		}

		.course-list_container {
			padding-top: 40rpx;
			position: relative;
			display: flex;

			.course-time_container {
				text-align: center;
				position: relative;

				&::after {
					position: absolute;
					content: "";
					height: 100%;
					top: 0;
					right: 0;
					width: 1px;
					background-color: #f4f4f4;
				}

				.course-time_item {
					height: 140rpx;
					width: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #abadb0;

					.course-time_time {
						white-space: nowrap;
					}

					.course-time_class {
						margin: 10rpx 0;
					}

				}
			}

			.course-subject_container {
				flex: 1;
				position: relative;

				.threeHeight {
					height: 420rpx !important;
				}

				.course-subject_item {
					position: absolute;
					height: 280rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36rpx;
					width: 100%;


					.course-subject_style_item {
						width: 90%;
						height: 80%;
						border-radius: 12px;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						.course-subject-item_place {
							font-size: 32rpx;
						}
					}
				}

				.activeCourse {
					background-color: #eaebf7;
					color: #6ea0f0;
				}

			}
		}
	}
</style>
