<script setup lang="ts">
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
	<div class="flex flex-row w-full">
		<div class="flex flex-col justify-between bg-base-300 rounded-md p-4 m-4 flex-3 items-center">
			<div class="flex w-full">
				<LoadoutCard :icon-string="iconArmorHead" part-name="Head" />
				<LoadoutCard :icon-string="iconArmorBody" part-name="Body" />
				<LoadoutCard :icon-string="iconArmorArms" part-name="Arms" />
			</div>
			<div class="flex w-full">
				<LoadoutCard :icon-string="iconArmorWaist" part-name="Waist" />
				<LoadoutCard :icon-string="iconArmorLegs" part-name="Legs" />
				<LoadoutCard :icon-string="iconSwordAndShield" part-name="Weapon" />
			</div>
		</div>
		<div class="flex-1 bg-base-300 rounded-md p-4 m-4">
			<TalismanCard />
		</div>
	</div>
</template>
