import type { ItemSkill } from "../entity/item-skill.model";
import type { Skill } from "../entity/skill.model";

export class ItemSkillWithName {
  itemId: number;
  skillId: number;
  pointValue: number;
  skillName: string;
  constructor(itemSkill: ItemSkill, skill: Skill) {
    this.itemId = itemSkill.itemId;
    this.skillId = itemSkill.skillId;
    this.pointValue = itemSkill.pointValue;
    this.skillName = skill.name;
  }
}
