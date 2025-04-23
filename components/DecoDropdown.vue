<script setup>
const selectedValue = ref("")
// const dropdownClass = computed(() => {
// 	const baseCss = "select cursor-pointer"
// 	return !hasValue.value ? baseCss : `${baseCss} pr-12`"
// })
function clearValue() {
	selectedValue.value = ""
}
const dropdown = useTemplateRef("dropdownRef")
const dropdownOpen = ref(false)
const isSelected = computed(() => {
	return selectedValue.value && selectedValue.value.length
})
const displayDeco = computed(() => {
	return selectedValue.value && selectedValue.value.length ? selectedValue.value : "Select a decoration"
})
function setValue(value) {
	selectedValue.value = value
}
function testToggle() {
	dropdownOpen.value = !dropdownOpen.value
	if (dropdownOpen.value === true) {
		dropdown.value.toggleAttribute("open", true)
	}
}
// Close other dropdowns
function handleClickOutside() {
	if (dropdownOpen.value === true && dropdown.value.attributes.getNamedItem("open") !== null) {
		dropdown.value.toggleAttribute("open", false)
	}
	else if (dropdownOpen.value === false && dropdown.value.attributes.getNamedItem("open") === null) {
		dropdown.value.toggleAttribute("open", true)
	}
}
document.addEventListener("click", handleClickOutside)
onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside)
})
// const { fetchDecorations } = useDatabase()
// const decos = await fetchDecorations()
// const selectedDeco = ref(null)
</script>

<template>
	<div class="pt-1 flex items-center w-[100%]">
		<div class="w-[85%]">
			<details ref="dropdownRef" class="dropdown cursor-pointer" @click="testToggle">
				<summary class="btn select select-sm select-warning pl-2">
					<span class="truncate max-w-21 2xl:max-w-32">{{ displayDeco }}</span>
				</summary>
				<div class="menu dropdown-content">
					<label class="input input-neutral focus-within:outline-0 focus:outline-0">
						<LucideSearch />
						<input type="search" placeholder="Search" @click.stop>
					</label>
					<ul class="rounded-box z-1 shadow-sm">
						<li><a @click="setValue('Test Decoration')">Item 1</a></li>
						<li><a @click="setValue('Test Decoration2')">Item 2</a></li>
					</ul>
				</div>
			</details>
		</div>
		<div class="w-[15%] h-full flex justify-center items-center pt-1">
			<button v-if="isSelected" class="btn btn-circle btn-error dark:btn-outline size-4 flex items-center" @click="clearValue()">
				<LucideX />
			</button>
		</div>
	</div>
</template>
