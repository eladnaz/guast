<script setup>
import { Sun, Moon } from "lucide-vue-next";
import ToggleSwitch from "primevue/toggleswitch";
</script>
<script>
const initializeTheme = () => {
  const savedPreference = localStorage.getItem("darkModePreference");

  if (savedPreference === "dark") {
    document.documentElement.classList.add("dark");
    return true;
  } else if (savedPreference === "light") {
    document.documentElement.classList.remove("dark");
    return false;
  } else {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    }
    return systemPrefersDark;
  }
};
const toggleTheme = (value) => {
  localStorage.setItem("darkModePreference", value ? "dark" : "light");
  isDark.value = value;
  if (value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
const isDark = ref(initializeTheme());
</script>
<template>
  <div class="w-screen px-10 py-6 h-full primary-soho">
    <nav class="flex h-full items-center justify-between">
      <div class="text-xl font-bold">MHGU Armor Set Tool</div>
      <div class="flex gap-4">
        <div class="flex items-center justify-center">
          <ToggleSwitch
            v-model:model-value="isDark"
            @update:model-value="toggleTheme"
          >
            <template #handle>
              <Moon v-if="isDark" />
              <Sun v-else />
            </template>
          </ToggleSwitch>
          <label v-if="isDark" class="p-1">Dark Mode</label>
          <label v-else class="p-1">Light Mode</label>
        </div>
      </div>
    </nav>
  </div>
</template>
