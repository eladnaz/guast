import type { ArmorWithName } from "~/models/view/armor-with-name.model";

export const useLoadoutStore = defineStore('loadout', {
    state: () => ({
      helm: null as ArmorWithName | null,
      body: null as ArmorWithName | null,
      arm: null as ArmorWithName | null,
      waist: null as ArmorWithName | null,
      leg: null as ArmorWithName | null,
      weapon: null as ArmorWithName | null,
    }),
    
    actions: {
      setArmor(armor:ArmorWithName){
        if(armor.armorSlot === 'Helm')
            this.helm = armor;
        if(armor.armorSlot === 'Body')
            this.body = armor;
        if(armor.armorSlot === 'Arm')
            this.arm = armor;
        if(armor.armorSlot === 'Waist')
            this.waist = armor;
        if(armor.armorSlot === 'Leg')
            this.leg = armor;
      },
      clearHelm() {
        this.helm = null;
      },
      clearBody() {
        this.body = null;
      },
      clearArm() {
        this.arm = null;
      },
      clearWaist() {
        this.waist = null;
      },
      clearLeg() {
        this.leg = null;
      },
      clearWeapon() {
        this.weapon = null;
      },
      
      isNotCompatible(id:number,type:number){
        return [
            this.helm,
            this.body,
            this.arm,
            this.waist,
            this.leg
        ].find(a => a != null && (a.armorId === id || (a.weaponType !== type && a.weaponType !== 3))) !== undefined;
      },
      
    //   setLoadout(loadout: Partial<{
    //     helm: ArmorWithName | null;
    //     body: ArmorWithName | null;
    //     arm: ArmorWithName | null;
    //     waist: ArmorWithName | null;
    //     leg: ArmorWithName | null;
    //     weapon: ArmorWithName | null;
    //   }>) {
    //     Object.assign(this, loadout);
    //   },
      
      // Clear all equipment
      clearLoadout() {
        this.helm = null;
        this.body = null;
        this.arm = null;
        this.waist = null;
        this.leg = null;
        this.weapon = null;
      }
    },
    getters: {
      getHelm(): ArmorWithName | null {
        return this.helm;
      },
      getBody(): ArmorWithName | null {
        return this.body;
      },
      getArm(): ArmorWithName | null {
        return this.arm;
      },
      getWaist(): ArmorWithName | null {
        return this.waist;
      },
      getLeg(): ArmorWithName | null {
        return this.leg;
      },
      getWeapon(): ArmorWithName | null {
        return this.weapon;
      },
      getLoadout() {
        return {
          helm: this.getHelm(),
          body: this.getBody(),
          arm: this.getArm(),
          waist: this.getWaist(),
          leg: this.getLeg()
        };
      },
      getAllEquipped(): ArmorWithName[] {
        return [
          this.helm,
          this.body,
          this.arm,
          this.waist,
          this.leg,
          this.weapon
        ].filter((item): item is ArmorWithName => item !== null);
      },
    }
  });