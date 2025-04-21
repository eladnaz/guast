<!-- eslint-disable vue/attribute-hyphenation -->
<script setup>
import Select from '~/src/volt/Select.vue';
import Button from '~/src/volt/Button.vue';
const { fetchDecorations } = useDatabase();
const decos = await fetchDecorations();
const selectedDeco = ref(null);
</script>
<template>
  <!-- <Select v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Country" class="w-full md:w-56">
    <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
    </template>
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
</Select> -->
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
      :virtual-scroller-options="{ itemSize: 20 }"/>
    </div></Suspense>
</template>
<style>
  span {  
    font-size: var(--text-xs); 
    line-height: var(--text-xs--line-height); 
  }
</style>
