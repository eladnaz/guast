<script setup lang="ts">
import { useDatabase } from "~/composables/useDatabase"

const selectedDeco = ref("")
function closeDropdown(deco: string) {
	selectedDeco.value = deco
	// @ts-expect-error .blur() is a valid javascript command for document.activeElement
	document.activeElement.blur()
}
const searchTerm = ref("")
const displayDeco = computed(() => {
	return selectedDeco.value && selectedDeco.value.length ? selectedDeco.value : "Select a decoration"
})
const decos = ref(await useDatabase().fetchDecorations())
const filteredDecos = computed(() => {
	if (searchTerm.value && searchTerm.value.length) {
		return decos.value.filter(d => d.name.toLowerCase().includes(searchTerm.value.trim().toLowerCase()))
	}
	else {
		return decos.value
	}
})
function clearSearch() {
	searchTerm.value = ""
}
</script>

<template>
	<div class="dropdown">
		<div tabindex="0" class="btn m-1 select select-sm dark:select-info cursor-pointer h-8 w-full text-left">
			{{ displayDeco }}
		</div>
		<div tabindex="0" class="dropdown-content menu bg-base-300 border-1 dark:border-info rounded-box z-1 w-[20vw] p-2 shadow-sm">
			<label class="input input-md input-info">
				<LucideSearch />
				<input v-model="searchTerm" placeholder="Search">
				<LucideX class="cursor-pointer" @click="clearSearch()" />
			</label>
			<ul class="overflow-y-scroll h-48 m-1">
				<li v-for="deco in filteredDecos" :key="deco.decoId" class="hover:bg-info hover:text-info-content cursor-pointer p-2" @click="closeDropdown(deco.name)">
					{{ deco.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style>

</style>
