import type { ArmorWithName } from "~/models/view/armor-with-name.model"
import type { DecoWithName } from "~/models/view/deco-with-name.model"

export function useDatabase() {
	const fetchFromApiOrCache = async (endpoint: string, cacheKey: string) => {
		const cachedData = localStorage.getItem(cacheKey)
		if (cachedData) {
			return JSON.parse(cachedData)
		}
		else {
			const { data } = await useFetch(endpoint)
			if (data.value) {
				localStorage.setItem(cacheKey, JSON.stringify(data.value))
			}
			return data.value
		}
	}

	const fetchSkills = () => fetchFromApiOrCache("/api/skills", "skills-cache")
	const fetchArmor = () =>
		fetchFromApiOrCache("/api/armor", "armor-cache") as Promise<
			ArmorWithName[]
		>
	const fetchDecorations = () =>
		fetchFromApiOrCache("/api/decorations", "decorations-cache") as Promise<
			DecoWithName[]
		>
	const fetchItems = () => fetchFromApiOrCache("/api/items", "items-cache")
	const fetchItemSkills = () =>
		fetchFromApiOrCache("/api/item-skills", "item-skills-cache")

	return {
		fetchSkills,
		fetchArmor,
		fetchDecorations,
		fetchItems,
		fetchItemSkills,
	}
}
