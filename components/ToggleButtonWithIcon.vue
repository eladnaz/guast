<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: Boolean,
		default: true,
	},
	activeClass: {
		type: String,
		default: "btn btn-soft",
	},
	inactiveClass: {
		type: String,
		default: "btn btn-dash",
	},
})
const emit = defineEmits(["update:modelValue"])
const showActive = ref(props.modelValue)
function handleClick() {
	showActive.value = !showActive.value
	emit("update:modelValue", showActive.value)
}
</script>

<template>
	<button
		:disabled="props.disabled"
		:class="{
			[props.inactiveClass]: !showActive,
			[props.activeClass]: showActive,
		}" @click="handleClick"
	>
		{{ label }}
		<LucideEye v-if="showActive" />
		<LucideEyeOff v-if="!showActive" />
	</button>
</template>
