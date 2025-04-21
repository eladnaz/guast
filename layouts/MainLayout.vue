<script setup>
//import { ref } from "vue";
import EquipmentCard from "~/components/EquipmentCard.vue";
import ArmorTable from "~/components/tables/armor-table/ArmorTable.vue";
import GuastHeader from "~/components/GuastHeader.vue";
import iconArmorArms from "../assets/icons/icon_armor_arms.png";
import iconArmorBody from "../assets/icons/icon_armor_body.png";
import iconArmorHead from "../assets/icons/icon_armor_head.png";
import iconArmorLegs from "../assets/icons/icon_armor_legs.png";
import iconArmorWaist from "../assets/icons/icon_armor_waist.png";
import iconSwordAndShield from "../assets/icons/icon_sword_and_shield.png";
import iconTalisman from "../assets/icons/icon_talisman.png";
// const { fetchArmor } = useDatabase();
// const isLoading = ref(true);
// const error = ref(null);
// const armor = ref([]);

// async function firstLoad() {
//   try {
//     isLoading.value = true;
//     const { data: armorData, error: armorError } = await fetchArmor();
//     if (armorError.value) {
//       error.value = armorError.value;
//     } else {
//       console.log(armorData);
//       armor.value = armorData.value;
//     }
//   } catch (e) {
//     error.value = e.message;
//   } finally {
//     isLoading.value = false;
//     console.log("Data loaded");
//     console.log("Armor Count:%d", armor.value.length);
//   }
// }
// firstLoad().then();
</script>

<template>
  <div class="h-auto font-sans secondary-soho">
    <header class="shadow h-[10%]">
      <GuastHeader />
    </header>
    <main class="flex flex-col justify-center items-start p-5">
      <section class="flex w-full">
        <ArmorTable></ArmorTable>
      </section>
      <section class="flex w-full justify-between flex-row pt-4">
        <EquipmentCard :icon-string="iconSwordAndShield" part-name="Weapon" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorHead" part-name="Head" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorBody" part-name="Body" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorArms" part-name="Arms" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorWaist" part-name="Waist" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorLegs" part-name="Legs" class="flex-1" />
        <EquipmentCard :icon-string="iconTalisman" part-name="Talisman" class="flex-1" />
      </section>
      <section>
        <TestLorem></TestLorem>
      </section>
    </main>
  </div>
</template>
