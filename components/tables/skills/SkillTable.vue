<script setup lang="ts">
import { ArmorType } from "~/constants/mappings"
import { SkillTableRow } from "~/models/view/skill-table-row.model"
import iconArmorArms from "../assets/icons/icon_armor_arms.png"
import iconArmorBody from "../assets/icons/icon_armor_body.png"
import iconArmorHead from "../assets/icons/icon_armor_head.png"
import iconArmorLegs from "../assets/icons/icon_armor_legs.png"
import iconArmorWaist from "../assets/icons/icon_armor_waist.png"
import iconSwordAndShield from "../assets/icons/icon_sword_and_shield.png"
import iconTalisman from "../assets/icons/icon_talisman.png"

const loadout = useLoadoutStore()
const { helm, body, arm, waist, leg, helmDeco, bodyDeco, armDeco, waistDeco, legDeco } = storeToRefs(loadout)
const skillData = computed(() => {
	const skills: SkillTableRow[] = []
	helm.value.skills.forEach((as) => {
		if (!skills.some(s => s.skillId === as.skillId)) {
			const skill = new SkillTableRow(ArmorType.Head, as)
			skills.push(skill)
		}
	})
	return skills
})
</script>

<template>
	<div class="w-full p-2 bg-base-300 rounded-md">
		<table class="skill-table table table-sm 2xl:table-md">
			<thead>
				<tr>
					<th>Skill</th>
					<th>
						<img
							:src="iconArmorHead"
							class="max-w-4 xl:max-w-6"
							alt="Head"
						>
					</th>
					<th>
						<img
							:src="iconArmorBody"
							class="max-w-4 xl:max-w-6"
							alt="Body"
						>
					</th>
					<th>
						<img
							:src="iconArmorArms"
							class="max-w-4 xl:max-w-6"
							alt="Arms"
						>
					</th>
					<th>
						<img
							:src="iconArmorWaist"
							class="max-w-4 xl:max-w-6"
							alt="Waist"
						>
					</th>
					<th>
						<img
							:src="iconArmorLegs"
							class="max-w-4 xl:max-w-6"
							alt="Legs"
						>
					</th>
					<th>
						<img
							:src="iconSwordAndShield"
							class="max-w-4 xl:max-w-6"
							alt="Weapon"
						>
					</th>
					<th>
						<img
							:src="iconTalisman"
							class="max-w-4 xl:max-w-6"
							alt="Talisman"
						>
					</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 3" :key="i">
					<td>Critical Eye</td>
					<td>5</td>
					<td>5</td>
					<td>5</td>
					<td>5</td>
					<td>5</td>
					<td>5</td>
					<td>5</td>
					<td>/</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
.skill-table th:not(:first-child):not(:last-child) > img {
	margin:auto;
}
.skill-table td:not(:first-child):not(:last-child){
	text-align:center;
}
</style>
