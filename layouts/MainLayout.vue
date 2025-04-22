<script setup>
// import EquipmentCard from "~/components/EquipmentCard.vue";
import ArmorTable from "~/components/tables/armor-table/ArmorTable.vue";
import GuastHeader from "~/components/header/GuastHeader.vue";
// import iconArmorArms from "../assets/icons/icon_armor_arms.png";
// import iconArmorBody from "../assets/icons/icon_armor_body.png";
// import iconArmorHead from "../assets/icons/icon_armor_head.png";
// import iconArmorLegs from "../assets/icons/icon_armor_legs.png";
// import iconArmorWaist from "../assets/icons/icon_armor_waist.png";
// import iconSwordAndShield from "../assets/icons/icon_sword_and_shield.png";
// import iconTalisman from "../assets/icons/icon_talisman.png";
</script>

<template>
  <div class="h-auto overflow-hidden">
    <header>
      <GuastHeader />
    </header>
    <main class="flex flex-col justify-center items-start p-5">
       <section class="flex w-full">
        <ArmorTable/>
      </section>
      <!-- <section class="flex w-full justify-between flex-row pt-4">
        <EquipmentCard :icon-string="iconSwordAndShield" part-name="Weapon" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorHead" part-name="Head" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorBody" part-name="Body" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorArms" part-name="Arms" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorWaist" part-name="Waist" class="flex-1" />
        <EquipmentCard :icon-string="iconArmorLegs" part-name="Legs" class="flex-1" />
        <EquipmentCard :icon-string="iconTalisman" part-name="Talisman" class="flex-1" />
      </section>
      <section>
        <TestLorem/>
      </section> -->
    </main>
  </div>
</template>
