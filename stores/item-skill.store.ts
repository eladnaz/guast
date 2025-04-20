// stores/productsStore.js
import { defineStore } from "pinia";
import { databaseService } from "~/server/services/database.service";

export const useItemSkillStore = defineStore("itemSkill", {
  state: () => ({
    itemSkills: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      const mainStore = useMainStore();

      if (!mainStore.isDbInitialized) {
        await mainStore.initDatabase();
      }

      this.isLoading = true;
      this.error = null;

      try {
        this.itemSkills = await databaseService.loadItemSkills();
        mainStore.setStoreLoaded("itemSkill");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.error = err.message || "Failed to fetch item skills";
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
