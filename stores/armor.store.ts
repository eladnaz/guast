// stores/productsStore.js
import { defineStore } from "pinia";
import { databaseService } from "~/server/services/database.service";

export const useArmorStore = defineStore("armor", {
  state: () => ({
    armor: [],
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
        this.armor = await databaseService.loadArmor();
        mainStore.setStoreLoaded("armor");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.error = err.message || "Failed to fetch armors";
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
