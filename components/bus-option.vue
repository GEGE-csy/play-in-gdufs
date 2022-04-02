<template>
	<view class="bus-option">
		<view class="bus-option_item" v-for="(item,index) in options" :key="index">
			<view class="bus-option_title">
				{{item.title}}
			</view>
			<view class="bus-option_line">
				<uni-steps :options="options[index].route" direction="column" :active="options[index].active">
				</uni-steps>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bus-option",
		props: {
			options: {
				type: Array
			},
		},
	}
</script>

<style lang="scss">
	.bus-option {
		padding: 0 50rpx;
		display: flex;
		justify-content: space-around;

		.bus-option_item {
			.bus-option_title {
				display: inline-block;
				margin-left: 20rpx;
				margin-bottom: 10rpx;
			}
		}
	}
</style>
