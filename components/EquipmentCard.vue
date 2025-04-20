<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import DecoDropdown from "./DecoDropdown.vue";
const props = defineProps<{
  iconString: string;
}>();
</script>

<template>
  <div
    class="flex flex-col justify-center items-center primary-soho rounded-lg p-4"
  >
    <img :src="props.iconString" class="max-w-6" alt="Part Icon" />
    <div>Item Name Here</div>
    <div class="flex flex-col">
      <DecoDropdown></DecoDropdown>
      <DecoDropdown></DecoDropdown>
      <DecoDropdown></DecoDropdown>
    </div>
  </div>
</template>
