<script setup lang="ts">
import type { DecoWithName } from "~/models/view/deco-with-name.model"
import iconTalisman from "../assets/icons/icon_talisman.png"
import DecoDropdown from "./DecoDropdown.vue"

const decosSelected = ref<DecoWithName[]>([null, null, null])
const totalSlots = 3
const availableDecoSlots = computed(() => {
	const filledDecos = decosSelected.value.filter(d => d !== null)
	return totalSlots - (!filledDecos || !filledDecos.length ? [] : filledDecos).reduce((acc, current) => acc + current.slotsNeeded, 0)
})
</script>

<template>
	<div
		class="flex flex-col justify-start items-center h-full pt-2 bg-base-200 rounded-sm"
	>
		<img
			:src="iconTalisman"
			class="size-8 2xl:size-12"
			alt="Part Icon"
		>
		<div class="p-1">
			Talisman
		</div>
		<div class="flex flex-col w-full pr-2 pl-2">
			<div>
				<div v-for="index in 3" :key="index" class="flex w-full">
					<DecoDropdown v-model="decosSelected[index]" :disabled="availableDecoSlots <= 0 && !decosSelected[index]" part-name="Talisman" :max-slot-size="availableDecoSlots" />
				</div>
			</div>
		</div>
	</div>
</template>
