import type { Decoration } from "../entity/decoration.model"
import type { ItemSkill } from "../entity/item-skill.model"
import type { Item } from "../entity/item.model"

export class DecoWithName {
	decoId: number
	slotsNeeded: number
	name: string
	pointValue: number
	skillId: number
	constructor(deco: Decoration, item: Item, skillItem: ItemSkill) {
		this.decoId = deco.decoId
		this.slotsNeeded = deco.slotsNeeded
		this.name = item.name
		this.pointValue = skillItem.pointValue
		this.skillId = skillItem.skillId
	}
}
