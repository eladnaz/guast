import type { Decoration } from "../entity/decoration.model"
import type { ItemSkill } from "../entity/item-skill.model"
import type { Item } from "../entity/item.model"
import type { Skill } from "../entity/skill.model"
import { ItemSkillWithName } from "./item-skill-with-name.model"

export class DecoWithName {
	decoId: number
	slotsNeeded: number
	name: string
	pointValue: number
	skill: ItemSkillWithName
	constructor(deco: Decoration, item: Item, skillItem: ItemSkill, skill: Skill) {
		this.decoId = deco.decoId
		this.slotsNeeded = deco.slotsNeeded
		this.name = item.name
		this.pointValue = skillItem.pointValue
		this.skill = new ItemSkillWithName(skillItem, skill)
	}
}
