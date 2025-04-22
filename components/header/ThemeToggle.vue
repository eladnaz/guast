<script setup lang="ts">
import { Moon,Sun } from 'lucide-vue-next';
const initializeTheme = () => {
  const savedPreference = localStorage.getItem("darkModePreference");
  if (savedPreference === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    return true;
  } else if (savedPreference === "light") {
    document.documentElement.setAttribute("data-theme", "nord");
    return false;
  } else {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "nord");
    }
    return systemPrefersDark;
  }
};
const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("darkModePreference", isDark.value ? "dark" : "light");
  if (isDark.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "nord");
  }
};
const toggleText = computed(() => {
    return `${isDark.value ? "Dark" : "Light"}`;
});
const isDark = ref(initializeTheme());
</script>
<template>
    <div class="flex justify-center items-stretch">
      <label class="toggle toggle-lg text-base-content">
        <input type="checkbox" :checked="isDark" @click="toggleTheme">
        <Sun class="size-5"/>
        <Moon class="size-5"/>
    </label>
    <span class="ps-2">{{toggleText}} Mode</span>
    </div>
</template>