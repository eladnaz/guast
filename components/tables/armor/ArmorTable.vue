<script setup>
import { WeaponType } from "~/constants/mappings"
import { useLoadoutStore } from "~/stores/loadoutStore"
import iconArmorArms from "../assets/icons/icon_armor_arms.png"
import iconArmorBody from "../assets/icons/icon_armor_body.png"
import iconArmorHead from "../assets/icons/icon_armor_head.png"
import iconArmorLegs from "../assets/icons/icon_armor_legs.png"
import iconArmorWaist from "../assets/icons/icon_armor_waist.png"
import ResistanceGroup from "./ResistanceGroup.vue"

const { fetchArmor } = useDatabase()
const loadout = useLoadoutStore()
const iconMap = {
	Head: iconArmorHead,
	Body: iconArmorBody,
	Arms: iconArmorArms,
	Waist: iconArmorWaist,
	Legs: iconArmorLegs,
}
// Master Load
const searchTerms = ref([])
const masterArmorList = ref(await fetchArmor())
// Filtering
const filteredArmorList = computed(() => {
	return masterArmorList.value.filter((item) => {
		const compat = loadout.isNotCompatible(item.armorId, item.weaponType)
		const matchesSearch = (!searchTerms.value || !searchTerms.value.length) || searchTerms.value.every(t =>
			item.name.toLowerCase().includes(t.toLowerCase())
			|| item.skillsDisplayString.toLowerCase().includes(t.toLowerCase()),
		)

		return !compat && matchesSearch
	})
})
function addTerm(event) {
	const term = event.target.value
	if (searchTerms.value.length < 5 && term.trim() && !searchTerms.value.some(s => s.toLowerCase() === term.trim().toLowerCase()))
		searchTerms.value.push(term)
	event.target.value = ""
}
function removeTerm(term) {
	searchTerms.value = searchTerms.value.filter(t => t !== term)
}
function clearAllTerms() {
	searchTerms.value = []
}
function addArmorToStore(armor) {
	loadout.setArmor(armor)
}
// Pagination Stuff
const currentPage = ref(1)
const itemsPerPage = ref(10)
const pagedArmorList = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return filteredArmorList.value.slice(start, end)
})
const currentPageTotalItems = computed(() => {
	if (pagedArmorList.value.length < itemsPerPage.value) {
		return pagedArmorList.value.length
	}
	else {
		return currentPage.value * itemsPerPage.value
	}
})
const totalPages = computed(() => {
	return Math.ceil(filteredArmorList.value.length / itemsPerPage.value)
})
function nextPage() {
	try {
		if (currentPage.value < totalPages.value) {
			currentPage.value++
		}
	}
	catch (error) {
		console.error(error.message)
	}
}
function previousPage() {
	if (currentPage.value > 1) {
		currentPage.value--
	}
}
// function goToPage(page) {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//   }
// }
watch(searchTerms, () => {
	currentPage.value = 1
})
</script>

<template>
	<div class="flex flex-col w-full">
		<div class="flex w-full items-end">
			<div class="flex flex-row flex-9 items-end">
				<fieldset class="fieldset">
					<legend class="fieldset-legend">
						Filter by Name/Skill
					</legend>
					<div class="tooltip tooltip-bottom z-2" data-tip="Press [Enter] to add a filter tag.">
						<label class="input input-accent dark:input-info">
							<LucideSearch class="size-4" />
							<input type="search" placeholder="Search" @keyup.enter="addTerm($event)">
						</label>
					</div>
				</fieldset>
				<div class="flex flex-row justify-start pl-1">
					<div v-for="term in searchTerms" :key="term" class="badge badge-accent dark:badge-info tag-guast m-1 cursor-pointer " @click="removeTerm(term)">
						{{ term }}
						<LucideCircleX class="size-4" />
					</div>
					<div v-if="searchTerms.valueOf().length === 5" class="badge badge-error tag-guast m-1 cursor-pointer">
						MAX FILTER TAGS REACHED
					</div>
				</div>
			</div>
			<div class="mb-1">
				<button class="btn btn-accent dark:btn-info dark:btn-outline" @click="clearAllTerms">
					Clear Filter Tags
				</button>
			</div>
		</div>
		<div class="bg-base-200">
			<table class="table table-pin-rows table-sm 2xl:table-md">
				<thead class="border-1 border-accent/50 dark:border-info/50">
					<tr>
						<th class="text-center">
							Type
						</th>
						<th class="text-center">
							Part
						</th>
						<th>Name</th>
						<th class="text-center">
							Defense
						</th>
						<th class="text-center">
							Resistance
						</th>
						<th>Skills</th>
						<th />
					</tr>
				</thead>
				<tbody class="border-1 border-accent/50 dark:border-info/50">
					<tr v-for="a in pagedArmorList" :key="a.armorId" class="hover:bg-base-300">
						<td class="text-center">
							{{ WeaponType[a.weaponType] }}
						</td>
						<td class="flex justify-center items-stretch">
							<img
								:src="iconMap[a.armorSlot]"
								class="max-w-4 xl:max-w-6"
								alt="Part Icon"
							>
						</td>
						<td>{{ a.name }}</td>
						<td class="text-center">
							{{ a.baseDef }}~{{ a.maxDef }}
						</td>
						<td>
							<ResistanceGroup :armor="a" />
						</td>
						<td>{{ a.skillsDisplayString }}</td>
						<td class="flex-justify-content">
							<button class="btn btn-sm  btn-square btn-accent dark:btn-outline dark:btn-info" @click="addArmorToStore(a)">
								<LucideClipboardPlus class="size-4" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="w-full flex flex-row bg-base-100 border-1 border-accent/50 dark:border-info/50 p-1">
				<div class="flex-1" />
				<div class="join flex-1 flex justify-center">
					<button class="join-item btn btn-accent dark:btn-info dark:btn-outline dark:border-info/50" @click="previousPage">
						«
					</button>
					<span class="join-item btn btn-accent cursor-default hover:bg-transparent dark:hover:text-info hover:shadow-none border-1 border-black/50 dark:btn-info dark:btn-outline dark:border-info/50">
						Page {{ totalPages === 0 ? 0 : currentPage }} of  {{ totalPages }}
					</span>
					<button class="join-item btn btn-accent  dark:btn-info dark:btn-outline dark:border-info/50" @click="nextPage">
						»
					</button>
				</div>
				<div class="flex-1 items-center flex justify-end">
					<p class="pr-4">
						Showing {{ currentPageTotalItems }} out of {{ filteredArmorList.length }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
