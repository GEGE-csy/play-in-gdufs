<template>
	<view class="bus">
		<!-- 选择公交车的去程、单向、返程 -->
		<view class="car-choose_bar">
			<view class="car-choose_options" 
						v-for="(item,index) in busOptions" 
						:key="index"
						:class="{activeBusOptions: index === activeBusIndex}"
						@click="switchBusOptions(index)"
						>
				{{item}}
			</view>
		</view>
		<view class="car-route_container">
			<view class="car-route_detail">
				<!-- 展示去程 -->
				<view v-if="activeBusIndex === 0">
					<bus-option :options="goOptions" ></bus-option>
				</view>
				<!-- 展示单向 -->
				<view v-else-if="activeBusIndex === 1">
					<bus-option :options="onewayOptions" ></bus-option>
				</view>
				<!-- 展示返程 -->
				<view v-else>
					<bus-option :options="backOptions" ></bus-option>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import busOption from './bus-option.vue';
	import { goOptions,backOptions,onewayOptions } from '../data/car.js';
	export default {
		name:"bus",
		data() {
			return {
				activeBusIndex: 1, // 0去，1单向，2回
				busOptions: ['去程','单向行驶','回程'],
				goOptions,
				backOptions,
				onewayOptions
			};
		},
		components: {
			busOption
		},
		methods: {
			switchBusOptions(index) {
				this.activeBusIndex = index;
			}
		}
	}
</script>

<style lang="scss">
	.bus {
		.car-choose_bar {
			border-radius: 8px;
			margin: 40rpx auto;
			background-color: #eaebf7;
			display: flex;
			width: 80%;
			.car-choose_options {
				flex: 1;
				text-align: center;
				line-height: 35px;
				border-radius: 8px;
			}
			.activeBusOptions {
				background-color: #6ea0f0
			}
		} 
	}
</style>
