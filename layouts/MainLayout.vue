<script setup>
//import { ref } from "vue";
import EquipmentCard from "~/components/EquipmentCard.vue";
import ArmorTable from "~/components/tables/ArmorTable.vue";
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
        <EquipmentCard :icon-string="iconSwordAndShield" />
        <EquipmentCard :icon-string="iconArmorHead" />
        <EquipmentCard :icon-string="iconArmorBody" />
        <EquipmentCard :icon-string="iconArmorArms" />
        <EquipmentCard :icon-string="iconArmorWaist" />
        <EquipmentCard :icon-string="iconArmorLegs" />
        <EquipmentCard :icon-string="iconTalisman" />
      </section>
      <section>
        <TestLorem></TestLorem>
      </section>
    </main>
  </div>
</template>
