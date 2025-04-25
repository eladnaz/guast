<script setup>
import { ArmorType, WeaponType } from "~/constants/mappings"
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
		<div class="flex items-end w-full">
			<div class="flex flex-row flex-9 items-end">
				<fieldset class="fieldset">
					<legend class="fieldset-legend">
						Filter by Name/Skill
					</legend>
					<div class="tooltip-bottom z-2 tooltip" data-tip="Press [Enter] to add a filter tag.">
						<label class="input input-accent dark:input-info">
							<LucideSearch class="size-4" />
							<input type="search" placeholder="Search" @keyup.enter="addTerm($event)">
						</label>
					</div>
				</fieldset>
				<div class="flex flex-row justify-start pl-1">
					<div v-for="term in searchTerms" :key="term" class="group m-1 hover:shadow-md hover:scale-105 transition hover:-translate-y-1 duration-200 ease-in-out cursor-pointer hover:badge-error badge badge-accent dark:badge-info tag-guast" @click="removeTerm(term)">
						<span class="group-hover:invisible visible">{{ term }}</span>
						<LucideCircleX class="hidden group-hover:block absolute size-4" />
					</div>
					<div v-if="searchTerms.valueOf().length === 5" class="m-1 cursor-pointer badge badge-error tag-guast">
						MAX FILTER TAGS REACHED
					</div>
				</div>
			</div>
			<div class="mb-1">
				<button class="dark:btn-outline btn btn-accent hover:btn-error dark:btn-info" @click="clearAllTerms">
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
						<th class="text-center">
							Deco Slot
						</th>
						<th />
					</tr>
				</thead>
				<tbody class="border-1 border-accent/50 dark:border-info/50">
					<tr v-for="a in pagedArmorList" :key="a.armorId" class="hover:bg-base-300">
						<td class="text-center">
							{{ WeaponType[a.weaponType] }}
						</td>
						<td>
							<img
								:src="iconMap[a.armorSlot]"
								class="max-w-4 xl:max-w-6"
								:alt="ArmorType[a.armorSlot]"
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
						<td class="text-center">
							{{ a.decoSlot }}
						</td>
						<td class="flex justify-content">
							<button class="dark:btn-outline btn btn-sm btn-square btn-accent dark:btn-info" @click="addArmorToStore(a)">
								<LucideBetweenVerticalStart class="size-4" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex flex-row w-full p-1 bg-base-100 border-1 border-accent/50 dark:border-info/50">
				<div class="flex-1" />
				<div class="flex flex-1 justify-center join">
					<button class="dark:btn-outline join-item btn btn-accent dark:btn-info" @click="previousPage">
						<LucideArrowLeft />
					</button>
					<span class="flex items-center p-2 bg-accent dark:bg-transparent dark:text-info text-accent-content cursor-default join-item">
						Page {{ totalPages === 0 ? 0 : currentPage }} of  {{ totalPages }}
					</span>
					<button class="dark:btn-outline join-item btn btn-accent dark:btn-info" @click="nextPage">
						<LucideArrowRight />
					</button>
				</div>
				<div class="flex flex-1 justify-end items-center">
					<p class="pr-4">
						Showing {{ currentPageTotalItems }} out of {{ filteredArmorList.length }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
