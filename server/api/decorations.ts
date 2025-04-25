import type { Decoration } from "~/models/entity/decoration.model.js"
import type { ItemSkill } from "~/models/entity/item-skill.model.js"
import type { Item } from "~/models/entity/item.model.js"
import { DecoWithName } from "~/models/view/deco-with-name.model.js"
import { databaseService } from "../services/database.service.js"

export default defineEventHandler(async () => {
	try {
		const decos = await databaseService.loadDeco()
		const items = await databaseService.loadItems()
		const itemSkills = await databaseService.loadItemSkills()
		const decoWithNames = decos
			.map((decoItem) => {
				const itemData = items.find(item => item.itemId === decoItem.decoId)
				const itemSkill = itemSkills.find(item => item.itemId === decoItem.decoId)
				return new DecoWithName(decoItem as Decoration, itemData as Item, itemSkill as ItemSkill)
			})
			.sort((a, b) => {
				return a.name.localeCompare(b.name)
			})

		return decoWithNames
	}
	catch (error) {
		console.error("Error loading armor:", error)
		throw createError({
			statusCode: 500,
			message: "Failed to load decos",
		})
	}
})
