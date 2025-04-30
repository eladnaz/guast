<script setup lang="ts">
import { useDatabase } from "~/composables/useDatabase"
import { DecoWithName } from "~/models/view/deco-with-name.model"

const props = defineProps({
	maxSlotSize: {
		type: Number,
		required: true,
	},
	disabled: {
		type: Boolean,
		required: true,
	},
	partName: {
		type: String,
		required: true,
	},
	modelValue: DecoWithName,
})
const emit = defineEmits(["update:modelValue"])
function selectDeco(deco: DecoWithName) {
	emit("update:modelValue", deco)
	// @ts-expect-error .blur() is a valid javascript command for document.activeElement
	document.activeElement.blur()
}
const searchTerm = ref("")
const displayDeco = computed(() => {
	return props.modelValue && props.modelValue.name.length ? props.modelValue.name : "Select a decoration"
})
const decos = ref(await useDatabase().fetchDecorations())
const filteredDecos = computed(() => {
	const size = props.maxSlotSize + (!props.modelValue ? 0 : props.modelValue.slotsNeeded)
	if (size === 0) {
		return []
	}
	const validSizeDecos = decos.value.filter(d => d.slotsNeeded.valueOf() <= size)
	if (searchTerm.value && searchTerm.value.length) {
		return validSizeDecos.filter(d => d.name.toLowerCase().includes(searchTerm.value.trim().toLowerCase()))
	}
	else {
		return validSizeDecos
	}
})
function clearSearch() {
	searchTerm.value = ""
}
function clearDecoSlot() {
	if (props.modelValue) {
		emit("update:modelValue", null)
	}
}
</script>

<template>
	<div class="flex flex-row w-full">
		<div class="w-4/5 dropdown" :class="{ 'opacity-50 pointer-events-none': props.disabled }">
			<div tabindex="0" class="w-full h-8 m-1 text-left truncate cursor-pointer select-sm dark:select-info btn select">
				{{ displayDeco }}
			</div>
			<div tabindex="0" class="z-1 w-[15vw] p-2 bg-base-300 shadow-sm border-1 dark:border-info rounded-box dropdown-content menu">
				<label class="w-full input input-md input-info">
					<LucideSearch />
					<input v-model="searchTerm" placeholder="Search">
					<LucideX class="cursor-pointer" @click="clearSearch()" />
				</label>
				<ul class="h-48 overflow-y-scroll m-1">
					<li v-for="deco in filteredDecos" :key="deco.decoId" class="p-2 hover:bg-info hover:text-info-content cursor-pointer" @click="selectDeco(deco)">
						{{ deco.name }}
					</li>
				</ul>
			</div>
		</div>

		<div class="flex justify-end items-center w-1/5">
			<LucideX
				class="size-6 p-1 opacity-50 cursor-default btn"
				:class="{
					'btn-disabled': !modelValue,
					'opacity-100 btn-error btn-outline cursor-pointer': modelValue,
				}" @click="clearDecoSlot()"
			/>
		</div>
	</div>
</template>

<style>

</style>
