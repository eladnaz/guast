<!-- eslint-disable vue/attribute-hyphenation -->
<script setup>
const { fetchDecorations } = useDatabase();
const decos = ref([]);
const selectedDeco = ref(null);
try {
  decos.value = await fetchDecorations();
} catch (e) {
  error.value = e.message;
}
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
    <Select
      v-model="selectedDeco"
      :options="decos"
      filter
      size="small"
      option-label="name"
      placeholder="Select a decoration"
      class="w-[100%] text-[1px]"
      :virtual-scroller-options="{ itemSize: 20 }"
  /></Suspense>
</template>
