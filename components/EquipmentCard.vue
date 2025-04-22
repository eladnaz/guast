<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
const props = defineProps<{
  iconString: string;
  armorName?: string;
  partName: string;
}>();
const cardContent = computed(() => {
  return props.armorName ?? props.partName;
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center primary-soho ml-1 mr-1 pt-4 pb-4"
  >
    <img
      :src="props.iconString"
      class="xl:max-w-10 2xl:max-w-12"
      alt="Part Icon"
    >
    <div class="p-1">{{ cardContent }}</div>
    <div class="flex flex-col">
      <DecoDropdown >
      <DecoDropdown />
      <DecoDropdown />
    </decodropdown></div>
  </div>
</template>
