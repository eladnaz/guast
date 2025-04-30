import type { ArmorWithName } from "~/models/view/armor-with-name.model"
import type { DecoWithName } from "~/models/view/deco-with-name.model"
// stores/loadout.ts
import { defineStore } from "pinia"
import { ref } from "vue"
import { ArmorType } from "~/constants/mappings"

export const useLoadoutStore = defineStore("loadout", () => {
	// State
	const helm = ref<ArmorWithName | null>(null)
	const body = ref<ArmorWithName | null>(null)
	const arm = ref<ArmorWithName | null>(null)
	const waist = ref<ArmorWithName | null>(null)
	const leg = ref<ArmorWithName | null>(null)
	const weapon = ref<ArmorWithName | null>(null)
	const modalOpen = ref<boolean>(false)
	const partToFilter = ref<string>("All")
	const helmDeco = ref<DecoWithName[]>([])
	const bodyDeco = ref<DecoWithName[]>([])
	const armDeco = ref<DecoWithName[]>([])
	const waistDeco = ref<DecoWithName[]>([])
	const legDeco = ref<DecoWithName[]>([])
	const weaponDeco = ref<DecoWithName[]>([])

	// Actions
	function getArmorBySlot(part: string) {
		if (part === ArmorType.Head)
			return helm
		if (part === ArmorType.Body)
			return body
		if (part === ArmorType.Arms)
			return arm
		if (part === ArmorType.Waist)
			return waist
		if (part === ArmorType.Legs)
			return leg
		return null
	}

	function setArmor(armor: ArmorWithName) {
		if (armor.armorSlot === ArmorType.Head)
			helm.value = armor
		if (armor.armorSlot === ArmorType.Body)
			body.value = armor
		if (armor.armorSlot === ArmorType.Arms)
			arm.value = armor
		if (armor.armorSlot === ArmorType.Waist)
			waist.value = armor
		if (armor.armorSlot === ArmorType.Legs)
			leg.value = armor
	}

	function setDeco(deco: DecoWithName, partName: string) {
		if (partName === ArmorType.Head)
			helmDeco.value.push(deco)
		if (partName === ArmorType.Body)
			bodyDeco.value.push(deco)
		if (partName === ArmorType.Arms)
			armDeco.value.push(deco)
		if (partName === ArmorType.Waist)
			waistDeco.value.push(deco)
		if (partName === ArmorType.Legs)
			legDeco.value.push(deco)
	}

	function clearArmor(armor: ArmorWithName) {
		if (armor.armorSlot === ArmorType.Head) {
			helm.value = null
			helmDeco.value = []
		}
		if (armor.armorSlot === ArmorType.Body) {
			body.value = null
			bodyDeco.value = []
		}
		if (armor.armorSlot === ArmorType.Arms) {
			arm.value = null
			armDeco.value = []
		}
		if (armor.armorSlot === ArmorType.Waist) {
			waist.value = null
			waistDeco.value = []
		}
		if (armor.armorSlot === ArmorType.Legs) {
			leg.value = null
			legDeco.value = []
		}
	}

	function openModal(partName: string) {
		partToFilter.value = partName
		modalOpen.value = true
	}

	function closeModal() {
		modalOpen.value = false
	}

	function loadoutHasValue() {
		return [
			helm.value,
			body.value,
			arm.value,
			waist.value,
			leg.value,
		].every(a => a != null)
	}

	function getLoadoutCompatibility() {
		const selectedIds = [
			helm.value,
			body.value,
			arm.value,
			waist.value,
			leg.value,
		].flatMap(a => a != null && a.armorId)
		const firstLoadoutArmor = [
			helm.value,
			body.value,
			arm.value,
			waist.value,
			leg.value,
		].find(a => a !== null && a.weaponType !== 2)
		const compatType = firstLoadoutArmor ? [firstLoadoutArmor.weaponType, 2] : []
		return { selectedIds, compatType }
	}

	function clearLoadout() {
		helm.value = null
		body.value = null
		arm.value = null
		waist.value = null
		leg.value = null
		weapon.value = null
	}

	return {
		// State
		helm,
		body,
		arm,
		waist,
		leg,
		weapon,
		helmDeco,
		bodyDeco,
		armDeco,
		waistDeco,
		legDeco,
		weaponDeco,
		modalOpen,
		partToFilter,

		// Actions
		openModal,
		closeModal,
		getArmorBySlot,
		setArmor,
		setDeco,
		clearArmor,
		loadoutHasValue,
		getLoadoutCompatibility,
		clearLoadout,
	}
})
