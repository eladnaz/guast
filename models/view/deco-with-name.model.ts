import type { Decoration } from "../entity/decoration.model"
import type { Item } from "../entity/item.model"

export class DecoWithName {
	decoId: number
	slotsNeeded: number
	name: string

	constructor(deco: Decoration, item: Item) {
		this.decoId = deco.decoId
		this.slotsNeeded = deco.slotsNeeded
		this.name = item.name
	}
}
