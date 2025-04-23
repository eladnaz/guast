import { databaseService } from "../services/database.service.js"

export default defineEventHandler(async () => {
	try {
		const itemSkills = await databaseService.loadItemSkills()
		return itemSkills
	}
	catch (error) {
		console.error("Error loading item skills:", error)
		throw createError({
			statusCode: 500,
			message: "Failed to load item skills",
		})
	}
})
