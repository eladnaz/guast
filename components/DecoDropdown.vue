<!-- eslint-disable vue/attribute-hyphenation -->
<script setup>
const { fetchDecorations } = useDatabase();
const decos = await fetchDecorations();
const selectedDeco = ref(null);
</script>
<template>
  <Suspense>
    <div class="pt-1">
      <Select
        v-model="selectedDeco"
        :options="decos"
        filter
        show-clear
        size="small"
        option-label="name"
        placeholder="Decoration"
        class="w-[100%]"
        :virtual-scroller-options="{ itemSize: 20 }"
      /></div>
  ></Suspense>
</template>
<style>
span {
  font-size: var(--text-xs);
  line-height: var(--text-xs--line-height);
}
</style>
