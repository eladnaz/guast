import { defineStore } from "pinia";
import { databaseService } from "~/server/services/database.service";

interface StoreLoadStatus {
  [key: string]: boolean;
}

export const useMainStore = defineStore("main", {
  state: () => ({
    isDbInitialized: false,
    isDbLoading: false,
    dbError: null,
    storeLoadStatus: {
      armor: false,
      decoration: false,
      itemSkill: false,
      skills: false,
      items: false,
    } as StoreLoadStatus,
  }),
  getters: {
    areAllStoresLoaded(): boolean {
      return Object.values(this.storeLoadStatus).every(
        (status) => status === true,
      );
    },
  },

  actions: {
    async initDatabase() {
      if (this.isDbInitialized) return;
      this.isDbLoading = true;
      this.dbError = null;
      try {
        await databaseService.init();
        this.isDbInitialized = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.dbError = err.message || "Failed to initialize database";
        console.error(this.dbError);
      } finally {
        this.isDbLoading = false;
      }
    },
    setStoreLoaded(storeName: string) {
      this.storeLoadStatus[storeName] = true;
      if (this.areAllStoresLoaded) {
        this.closeDatabase();
      }
    },
    closeDatabase() {
      databaseService.close();
      this.isDbInitialized = false;
    },
  },
});
