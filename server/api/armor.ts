import type { Armor } from "~/models/entity/armor.model.js"
import type { ItemSkill } from "~/models/entity/item-skill.model.js"
import type { Item } from "~/models/entity/item.model.js"
import type { Skill } from "~/models/entity/skill.model.js"
import { ArmorWithName } from "~/models/view/armor-with-name.model.js"
import { databaseService } from "../services/database.service.js"

export default defineEventHandler(async () => {
	try {
		const armor = await databaseService.loadArmor()
		const items = await databaseService.loadItems()
		const itemSkills = await databaseService.loadItemSkills()
		const skillNames = await databaseService.loadSkills()
		const armorWithNames = armor
			.map((armorItem) => {
				const itemData = items.find(
					item => item.itemId === armorItem.armorId,
				)
				const armorSkills = itemSkills.filter(
					s => s.itemId === armorItem.armorId,
				)
				const skillData = skillNames.filter(skill =>
					armorSkills.some(
						armorSkill => armorSkill.skillId === skill.skillId,
					),
				)
				return new ArmorWithName(
					armorItem as Armor,
					itemData as Item,
					armorSkills as ItemSkill[],
					skillData as Skill[],
				)
			})
			.sort((a, b) => {
				return a.name.localeCompare(b.name)
			})
		return armorWithNames
	}
	catch (error) {
		console.error("Error loading armor:", error)
		throw createError({
			statusCode: 500,
			message: "Failed to load armor",
		})
	}
})
