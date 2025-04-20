<!-- eslint-disable vue/html-self-closing -->
<script setup>
import { FilterMatchMode } from "@primevue/core/api";
import { Search } from "lucide-vue-next";
import iconElementThunder from "../assets/icons/element_thunder.png";
import iconElementFire from "../assets/icons/element_fire.png";
import iconElementIce from "../assets/icons/element_ice.png";
import iconElementDragon from "../assets/icons/element_dragon.png";
import iconElementWater from "../assets/icons/element_water.png";
import { WeaponType } from "~/constants/mappings";
const { fetchArmor } = useDatabase();
const armor = ref([]);
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
      scroll-height="600px"
      class="text-center w-full"
      :global-filter-fields="['name']"
    >
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon class="flex justify-center items-center">
              <Search />
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
        field="armorSlot"
        header="Part"
        :pt="{
          columnHeaderContent: 'flex justify-center text-center',
        }"
      />
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
          <div class="flex justify-center">
            <div class="flex items-center pr-1">
              <img
                :src="iconElementThunder"
                alt="Thunder"
                width="16"
                height="16"
                style="margin-right: 4px"
              />
              <span class="thunder-element-text">
                {{ slotProps.data.thunderRes }}
              </span>
            </div>

            <div class="flex items-center pr-1">
              <img
                :src="iconElementFire"
                alt="Fire"
                width="16"
                height="16"
                style="margin-right: 4px"
              />
              <span class="fire-element-text">
                {{ slotProps.data.fireRes }}
              </span>
            </div>

            <div class="flex items-center pr-1">
              <img
                :src="iconElementWater"
                alt="Water"
                width="16"
                height="16"
                style="margin-right: 4px"
              />
              <span class="water-element-text">
                {{ slotProps.data.waterRes }}
              </span>
            </div>

            <div class="flex items-center pr-1">
              <img
                :src="iconElementDragon"
                alt="Dragon"
                width="16"
                height="16"
                style="margin-right: 4px"
              />
              <span class="dragon-element-text">
                {{ slotProps.data.dragonRes }}
              </span>
            </div>

            <div class="flex items-center pr-1">
              <img
                :src="iconElementIce"
                alt="Ice"
                width="16"
                height="16"
                style="margin-right: 4px"
              />
              <span class="ice-element-text">
                {{ slotProps.data.iceRes }}
              </span>
            </div>
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
      <Column field="armor" header="Skills">
        <template #body="slotProps">
          <span
            v-for="skill in slotProps.data.skills"
            :key="skill.id"
            class="mr-1 p-1"
          >
            {{ skill.skillName }} +{{ skill.pointValue }}
          </span>
        </template>
      </Column>
    </DataTable>
  </Suspense>
</template>
<style>
/* .p-datatable-tbody
  > tr
  > td:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
  text-align: center;
} */
.p-datatable-tbody > tr > td:not(:first-child):not(:last-child) {
  text-align: center;
}
</style>
