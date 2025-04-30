<script setup lang="ts">
import type { DecoWithName } from "~/models/view/deco-with-name.model"
import { useLoadoutStore } from "~/stores/loadoutStore"
import DecoDropdown from "./DecoDropdown.vue"

const props = defineProps<{
	iconString: string
	partName: string
}>()
const loadout = useLoadoutStore()
const armor = loadout.getArmorBySlot(props.partName)
const decosSelected = ref<DecoWithName[]>([null, null, null])
const availableDecoSlots = computed(() => {
	if (!armor?.value || armor.value.decoSlot === 0) {
		return 0
	}
	const filledDecos = decosSelected.value.filter(d => d !== null)
	const slots = armor.value.decoSlot - (!filledDecos || !filledDecos.length ? [] : filledDecos).reduce((acc, current) => acc + current.slotsNeeded, 0)
	return slots
})
const cardContent = computed(() => {
	return armor?.value?.name ?? props.partName
})

function openModal(partName: string) {
	loadout.openModal(partName)
}

function clearArmor() {
	loadout.clearArmor(armor.value)
	decosSelected.value = [null, null, null]
}
</script>

<template>
	<div class="flex flex-col w-full m-2 p-2 bg-base-200 rounded-sm">
		<div class="flex justify-end w-full">
			<button class="btn-outline btn btn-sm btn-error" :disabled="armor === null" @click="clearArmor">
				<LucideX />
			</button>
		</div>
		<div class="flex justify-center w-full p-1">
			<span>{{ cardContent }}</span>
		</div>
		<div class="flex flex-row w-full">
			<div class="flex flex-col justify-center items-center w-1/4 h-full rounded-sm btn-outline cursor-pointer btn btn-accent dark:btn-info" @click="openModal(props.partName)">
				<img
					:src="props.iconString"
					class="size-8 2xl:size-12"
					alt="Part Icon"
				>
			</div>
			<div class="flex flex-col w-3/4 pr-2 pl-2">
				<div v-for="index in 3" :key="index" class="flex w-full">
					<DecoDropdown v-model="decosSelected[index]" :disabled="availableDecoSlots <= 0 && !decosSelected[index]" :part-name="partName" :max-slot-size="availableDecoSlots" />
				</div>
			</div>
		</div>
	</div>
</template>
