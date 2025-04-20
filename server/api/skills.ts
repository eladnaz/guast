import { databaseService } from "../services/database.service.js";

export default defineEventHandler(async () => {
  try {
    const skills = await databaseService.loadSkills();
    return skills;
  } catch (error) {
    console.error("Error loading skills:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to load skills",
    });
  }
});
