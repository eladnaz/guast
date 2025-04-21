<!-- eslint-disable vue/html-self-closing -->
<script setup>
import { FilterMatchMode } from "@primevue/core/api";
import DataTable from '~/src/volt/DataTable.vue';
import Button from '~/src/volt/Button.vue';
import Column from 'primevue/column';
import ElementText from "~/components/tables/armor-table/ElementText.vue";
import iconElementThunder from "../assets/icons/element_thunder.png";
import iconElementFire from "../assets/icons/element_fire.png";
import iconElementIce from "../assets/icons/element_ice.png";
import iconElementDragon from "../assets/icons/element_dragon.png";
import iconElementWater from "../assets/icons/element_water.png";
import iconArmorArms from "../assets/icons/icon_armor_arms.png";
import iconArmorBody from "../assets/icons/icon_armor_body.png";
import iconArmorHead from "../assets/icons/icon_armor_head.png";
import iconArmorLegs from "../assets/icons/icon_armor_legs.png";
import iconArmorWaist from "../assets/icons/icon_armor_waist.png";
import { WeaponType } from "~/constants/mappings";
const { fetchArmor } = useDatabase();
const armor = ref([]);
const iconMap = {
        'Head': iconArmorHead,
        'Body': iconArmorBody,
        'Arms': iconArmorArms,
        'Waist': iconArmorWaist,
        'Legs': iconArmorLegs,
      };
try {
  armor.value = await fetchArmor();
} catch (e) {
  error.value = e.message;
}
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
<template>
  <Suspense>
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="10"
      :rows-per-page-options="[5, 10, 15, 20]"
      :value="armor"
      size="small"
      striped-rows
      class="text-center w-full"
      :global-filter-fields="['name','skillsDisplayString']"
    >
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon class="flex justify-center items-center">
              <i class="pi pi-search" ></i>
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              size="small"
              placeholder="Name/Skill Search"
            />
          </IconField>
        </div>
      </template>
      <Column field="name" header="Name" />
      <Column
        field="armor"
        header="Part"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      >
      <template #body="slotProps">
        <div class="flex justify-center items-center">
          <img :src="iconMap[slotProps.data.armorSlot]" class="max-w-4 xl:max-w-6" alt="Part Icon" />
        </div>
      </template>
    </Column>
      <Column
        field="armor"
        header="Defense"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      >
        <template #body="slotProps">
          <span>
            {{ slotProps.data.baseDef }}~{{ slotProps.data.maxDef }}
          </span>
        </template>
      </Column>
      <Column
        field="armor"
        header="Resistances"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      >
        <template #body="slotProps">
          <div class="flex flex-row justify-center items-center">
            <ElementText :icon-string="iconElementDragon" alt-text="Dragon Element" :res-value="slotProps.data.dragonRes" text-color-class="dragon-element-text"></ElementText>
            <ElementText :icon-string="iconElementFire" alt-text="Fire Element" :res-value="slotProps.data.fireRes" text-color-class="fire-element-text"></ElementText>
            <ElementText :icon-string="iconElementIce" alt-text="Ice Element" :res-value="slotProps.data.iceRes" text-color-class="ice-element-text"></ElementText>
            <ElementText :icon-string="iconElementThunder" alt-text="Thunder Element" :res-value="slotProps.data.thunderRes" text-color-class="thunder-element-text"></ElementText>
            <ElementText :icon-string="iconElementWater" alt-text="Water Element" :res-value="slotProps.data.waterRes" text-color-class="water-element-text"></ElementText>
          </div>
        </template>
      </Column>
      <Column
        field="decoSlot"
        header="Slots"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      />
      <Column
        field="armor"
        header="Type"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      >
        <template #body="slotProps">
          <span>{{ WeaponType[slotProps.data.weaponType] }}</span>
        </template>
      </Column>
      <Column field="skillsDisplayString" header="Skills">
      </Column>
      <Column>
        <template #body>
          <Button icon="pi pi-plus"></Button>
        </template>
      </Column>
    </DataTable>
  </Suspense>
</template>
<style>
.p-datatable-tbody
  > tr
  > td:not(:first-child):not(:nth-last-child(2)) {
  text-align: center;
}
</style>
