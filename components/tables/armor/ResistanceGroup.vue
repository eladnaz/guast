<script setup lang="ts">
import type { ArmorWithName } from "~/models/view/armor-with-name.model"
import iconElementDragon from "~/assets/icons/element_dragon.png"
import iconElementFire from "~/assets/icons/element_fire.png"
import iconElementIce from "~/assets/icons/element_ice.png"
import iconElementThunder from "~/assets/icons/element_thunder.png"
import iconElementWater from "~/assets/icons/element_water.png"
import ResistanceIconText from "./ResistanceIconText.vue"

const props = defineProps<{
	armor: ArmorWithName
}>()
</script>

<template>
	<div class="flex flex-row justify-center items-center">
		<ResistanceIconText
			:icon-string="iconElementDragon"
			alt-text="Dragon Element"
			:res-value="props.armor.dragonRes"
			text-color-class="text-dragon-guast"
		/>
		<ResistanceIconText
			:icon-string="iconElementFire"
			alt-text="Fire Element"
			:res-value="props.armor.fireRes"
			text-color-class="text-fire-guast"
		/>
		<ResistanceIconText
			:icon-string="iconElementIce"
			alt-text="Ice Element"
			:res-value="props.armor.iceRes"
			text-color-class="text-ice-guast"
		/>
		<ResistanceIconText
			:icon-string="iconElementThunder"
			alt-text="Thunder Element"
			:res-value="props.armor.thunderRes"
			text-color-class="text-thunder-guast"
		/>
		<ResistanceIconText
			:icon-string="iconElementWater"
			alt-text="Water Element"
			:res-value="props.armor.waterRes"
			text-color-class="text-water-guast"
		/>
	</div>
</template>
