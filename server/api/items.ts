import { databaseService } from "../services/database.service.js"

export default defineEventHandler(async () => {
	try {
		const items = await databaseService.loadItems()
		return items
	}
	catch (error) {
		console.error("Error loading items:", error)
		throw createError({
			statusCode: 500,
			message: "Failed to load items",
		})
	}
})
