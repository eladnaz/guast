<script setup lang="ts">
import { useLoadoutStore } from "~/stores/loadout.store"
import DecoDropdown from "../DecoDropdown.vue"

const props = defineProps<{
	iconString: string
	armorName?: string
	partName: string
}>()
const loadout = useLoadoutStore()
const armor = loadout.getArmorBySlot(props.partName)
const cardContent = computed(() => {
	return armor?.value?.name ?? props.partName
})
// const decoSlots = computed(() => {
// 	return armor?.value?.decoSlot ?? 0;
// })
</script>

<template>
	<div
		class="flex flex-col justify-center items-center size-[100vw/6]"
	>
		<img
			:src="props.iconString"
			class="xl:max-w-10 2xl:max-w-12"
			alt="Part Icon"
		>
		<div class="p-1">
			{{ cardContent }}
		</div>
		<div class="flex flex-col w-full pl-2 pr-2">
			<DecoDropdown />
		</div>
	</div>
</template>
