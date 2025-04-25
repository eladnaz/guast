import type { ArmorWithName } from "~/models/view/armor-with-name.model"
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

	function clearHelm() {
		helm.value = null
	}
	function clearBody() {
		body.value = null
	}
	function clearArm() {
		arm.value = null
	}
	function clearWaist() {
		waist.value = null
	}
	function clearLeg() {
		leg.value = null
	}
	function clearWeapon() {
		weapon.value = null
	}

	function isNotCompatible(id: number, type: number) {
		return [
			helm.value,
			body.value,
			arm.value,
			waist.value,
			leg.value,
		].find(a => a != null && (a.armorId === id || (a.weaponType !== type && a.weaponType !== 3))) !== undefined
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

		// Actions
		getArmorBySlot,
		setArmor,
		clearHelm,
		clearBody,
		clearArm,
		clearWaist,
		clearLeg,
		clearWeapon,
		isNotCompatible,
		clearLoadout,
	}
})
