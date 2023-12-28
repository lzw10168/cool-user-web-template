<template>
	<view class="form-input">
		<div class="label">
			{{ label }}
		</div>
		<div class="input">
			<cl-input
				:value="value"
				:password="password"
				@change="handleInput"
				:placeholder="placeholder"
			/>
		</div>
	</view>
</template>

<script lang="ts">
/**
 * @description form-input
 * @param {string} [modelValue] 绑定值
 * @param {string} [label] 标签
 */

import { computed, defineComponent, PropType, ref, watch } from "vue";
import { parseRpx } from "/@/cool/utils";
import { router } from "/@/cool";

const { statusBarHeight } = uni.getSystemInfoSync();

export default defineComponent({
	name: "form-input",

	props: {
		modelValue: String,
		label: String,
		placeholder: String,
		password: Boolean,
	},

	emits: ["update:modelValue"],

	setup(props, { emit }) {
		const value = ref("");
		// 打开
		function handleInput(e) {
			value.value = e;
			emit("update:modelValue", e);
		}
		watch(
			() => props.modelValue,
			(val: string | undefined) => {
				value.value = val;
			},
			{
				immediate: true,
			}
		);

		return {
			value,
			handleInput,
		};
	},
});
</script>

<style lang="scss" scoped>
.form-input {
	width: 100%;
	margin-bottom: 10rpx;
	.label {
		color: #374151;
		padding: 10rpx;
		font-size: 28rpx;
	}
	.input {
		height: 96rpx;
		.cl-input {
			height: 80rpx !important;
			border-radius: 20rpx;
			border: 1px solid #bec5d1;
		}
	}
}
</style>
