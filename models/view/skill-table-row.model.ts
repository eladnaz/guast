import type { ItemSkillWithName } from "./item-skill-with-name.model"
import { ArmorType } from "~/constants/mappings"

export class SkillTableRow {
	skillId: number
	skillName: string
	helmSkills: number
	bodySkills: number
	armSkills: number
	waistSkills: number
	legSkills: number
	talismanSkills: number
	weaponSkills: number
	pointsNeeded: number
	constructor(partName: string, skill: ItemSkillWithName = null) {
		this.skillId = skill.skillId
		this.skillName = skill.skillName
		if (partName === ArmorType.Head) {
			this.helmSkills = skill.pointValue
		}
		if (partName === ArmorType.Body) {
			this.bodySkills = skill.pointValue
		}
		if (partName === ArmorType.Arms) {
			this.armSkills = skill.pointValue
		}
		if (partName === ArmorType.Waist) {
			this.waistSkills = skill.pointValue
		}
		if (partName === ArmorType.Legs) {
			this.legSkills = skill.pointValue
		}
	}
}
