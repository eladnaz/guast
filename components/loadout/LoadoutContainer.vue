<script setup lang="ts">
import { ArmorType } from "~/constants/mappings"
import iconArmorArms from "../assets/icons/icon_armor_arms.png"
import iconArmorBody from "../assets/icons/icon_armor_body.png"
import iconArmorHead from "../assets/icons/icon_armor_head.png"
import iconArmorLegs from "../assets/icons/icon_armor_legs.png"
import iconArmorWaist from "../assets/icons/icon_armor_waist.png"
import iconSwordAndShield from "../assets/icons/icon_sword_and_shield.png"
import LoadoutCard from "./LoadoutCard.vue"
import TalismanCard from "./TalismanCard.vue"
</script>

<template>
	<div class="flex flex-row w-full mt-4">
		<div class="flex flex-col flex-5 justify-between items-center mr-1 p-2 bg-base-300 rounded-md">
			<div class="flex w-full">
				<LoadoutCard :icon-string="iconArmorHead" :part-name="ArmorType.Head" />
				<LoadoutCard :icon-string="iconArmorBody" :part-name="ArmorType.Body" />
				<LoadoutCard :icon-string="iconArmorArms" :part-name="ArmorType.Arms" />
			</div>
			<div class="flex w-full">
				<LoadoutCard :icon-string="iconArmorWaist" :part-name="ArmorType.Waist" />
				<LoadoutCard :icon-string="iconArmorLegs" :part-name="ArmorType.Legs" />
				<LoadoutCard :icon-string="iconSwordAndShield" :part-name="ArmorType.Head" />
			</div>
		</div>
		<div class="flex-1 ml-1 p-4 bg-base-300 rounded-md">
			<TalismanCard />
		</div>
	</div>
</template>
