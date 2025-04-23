import type { Armor } from "../entity/armor.model"
import type { ItemSkill } from "../entity/item-skill.model"
import type { Item } from "../entity/item.model"
import type { Skill } from "../entity/skill.model"
import { ItemSkillWithName } from "./item-skill-with-name.model"

export class ArmorWithName {
	armorId: number
	baseDef: number
	armorSlot: string
	maxDef: number
	fireRes: number
	waterRes: number
	thunderRes: number
	iceRes: number
	dragonRes: number
	weaponType: number
	decoSlot: number
	name: string
	skillsDisplayString: string
	skills: ItemSkillWithName[]
	constructor(
		armor: Armor,
		item: Item,
		armorSkills: ItemSkill[],
		skillNames: Skill[],
	) {
		this.armorId = armor.armorId
		this.baseDef = armor.baseDef
		this.armorSlot = armor.armorSlot
		this.maxDef = armor.maxDef
		this.fireRes = armor.fireRes
		this.waterRes = armor.waterRes
		this.thunderRes = armor.thunderRes
		this.iceRes = armor.iceRes
		this.dragonRes = armor.dragonRes
		this.weaponType = armor.weaponType
		this.decoSlot = armor.decoSlot
		this.name = item.name
		this.skills = armorSkills.map((s) => {
			const testVar = skillNames.find(n => n.skillId === s.skillId)
			return new ItemSkillWithName(s, testVar)
		})
		this.skillsDisplayString = this.skills
			.map(s => `${s.skillName}+${s.pointValue}`)
			.join(" ")
	}
}
