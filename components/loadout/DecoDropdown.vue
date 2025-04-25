<script setup lang="ts">
import type { DecoWithName } from "~/models/view/deco-with-name.model"
import { useDatabase } from "~/composables/useDatabase"

const props = defineProps({
	maxSlotSize: {
		type: Number,
		required: true,
	},
	disabled: {
		type: Boolean,
		required: true,
	},
	modelValue: null,
})
const emit = defineEmits(["update:modelValue"])

const selectedDeco = ref<DecoWithName | null>(null)
function selectDeco(deco: DecoWithName) {
	selectedDeco.value = deco
	emit("update:modelValue", deco)
	// @ts-expect-error .blur() is a valid javascript command for document.activeElement
	document.activeElement.blur()
}
const searchTerm = ref("")
const displayDeco = computed(() => {
	return selectedDeco.value && selectedDeco.value.name.length ? selectedDeco.value.name : "Select a decoration"
})
const decos = ref(await useDatabase().fetchDecorations())
const filteredDecos = computed(() => {
	const size = props.maxSlotSize + (!selectedDeco.value ? 0 : selectedDeco.value.slotsNeeded)
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
	if (selectedDeco.value) {
		selectedDeco.value = null
		emit("update:modelValue", null)
	}
}
</script>

<template>
	<div class="flex flex-row w-full">
		<div class="w-3/4 dropdown" :class="{ 'opacity-50 pointer-events-none': props.disabled }">
			<div tabindex="0" class="w-full h-8 m-1 text-left truncate cursor-pointer select-sm dark:select-info btn select">
				{{ displayDeco }}
			</div>
			<div tabindex="0" class="z-1 w-[25vw] p-2 bg-base-300 shadow-sm border-1 dark:border-info rounded-box dropdown-content menu">
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

		<div class="flex justify-center items-center w-1/4">
			<LucideX
				class="size-6 p-1 opacity-50 cursor-default btn"
				:class="{
					'btn-disabled': !modelValue,
					'opacity-100 btn-info hover:btn-error cursor-pointer': modelValue,
				}" @click="clearDecoSlot()"
			/>
		</div>
	</div>
</template>

<style>

</style>
