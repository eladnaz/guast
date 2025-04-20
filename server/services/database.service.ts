import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";
import path from "path";
import type { Armor } from "~/models/entity/armor.model";
import type { Decoration } from "~/models/entity/decoration.model";
import type { ItemSkill } from "~/models/entity/item-skill.model";
import type { Item } from "~/models/entity/item.model";
import type { Skill } from "~/models/entity/skill.model";
class DatabaseService {
  private connectionPool: Map<
    string,
    {
      connection: Database;
      lastUsed: number;
      inUse: boolean;
    }
  > = new Map();
  private dbPath: string = path.resolve(process.cwd(), "server/db/mhgu.db");
  private maxConnections: number = 5;
  private connectionTimeout: number = 60000; // 1 minute
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startConnectionCleanup();
  }

  private startConnectionCleanup() {
    this.cleanupInterval = setInterval(() => {
      this.cleanupIdleConnections();
    }, 30000);
  }

  private async cleanupIdleConnections() {
    const now = Date.now();

    for (const [
      id,
      { connection, lastUsed, inUse },
    ] of this.connectionPool.entries()) {
      if (!inUse && now - lastUsed > this.connectionTimeout) {
        await connection.close();
        this.connectionPool.delete(id);
        console.log(`Closed idle database connection: ${id}`);
      }
    }
  }

  async getConnection(): Promise<Database> {
    for (const [_, connInfo] of this.connectionPool.entries()) {
      if (!connInfo.inUse) {
        connInfo.inUse = true;
        connInfo.lastUsed = Date.now();
        return connInfo.connection;
      }
    }

    if (this.connectionPool.size >= this.maxConnections) {
      throw new Error("Connection pool exhausted");
    }
    try {
      const newConnection = await open({
        filename: this.dbPath,
        driver: sqlite3.Database,
      });

      const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      this.connectionPool.set(connectionId, {
        connection: newConnection,
        lastUsed: Date.now(),
        inUse: true,
      });

      console.log(`Created new database connection: ${connectionId}`);
      return newConnection;
    } catch (error) {
      console.error("Failed to open database connection:", error);
      throw error;
    }
  }

  async releaseConnection(connection: Database) {
    // Find this connection in the pool
    for (const [_, connInfo] of this.connectionPool.entries()) {
      if (connInfo.connection === connection) {
        connInfo.inUse = false;
        connInfo.lastUsed = Date.now();
        return;
      }
    }
  }

  private async withConnection<T>(
    operation: (db: Database) => Promise<T>,
  ): Promise<T> {
    const connection = await this.getConnection();
    try {
      return await operation(connection);
    } finally {
      await this.releaseConnection(connection);
    }
  }

  async loadSkills(): Promise<Skill[]> {
    return this.withConnection(async (db) => {
      // Get all skills
      const rawSkills = await db.all("SELECT * FROM skills");

      // Get all skill trees
      const rawSkillTree = await db.all("SELECT * FROM skill_trees");

      // Process and combine the data
      const skills: Skill[] = [];
      for (const tree of rawSkillTree) {
        const rawSkill = rawSkills.find((s) => s.skill_tree_id === tree._id);
        const skill: Skill = {
          skillId: tree._id,
          name: tree.name,
          altName: rawSkill?.name,
          description: rawSkill?.description,
          requiredPoints: rawSkill?.required_skill_tree_points,
        };
        skills.push(skill);
      }
      return skills;
    });
  }

  async loadItemSkills(): Promise<ItemSkill[]> {
    return this.withConnection(async (db) => {
      const rawItemSkills = await db.all("SELECT * FROM item_to_skill_tree");
      return rawItemSkills.map((row) => ({
        itemId: row.item_id,
        skillId: row.skill_tree_id,
        pointValue: row.point_value,
      }));
    });
  }

  async loadArmor(): Promise<Armor[]> {
    return this.withConnection(async (db) => {
      const rawArmor = await db.all("SELECT * FROM armor");
      return rawArmor.map((row) => ({
        armorId: row._id,
        baseDef: row.defense,
        maxDef: row.max_defense,
        armorSlot: row.slot,
        fireRes: row.fire_res,
        waterRes: row.water_res,
        thunderRes: row.thunder_res,
        iceRes: row.ice_res,
        dragonRes: row.dragon_res,
        weaponType: row.hunter_type,
        decoSlot: row.num_slots,
      }));
    });
  }

  async loadDeco(): Promise<Decoration[]> {
    return this.withConnection(async (db) => {
      const rawDeco = await db.all("SELECT * FROM decorations");
      return rawDeco.map((row) => ({
        decoId: row._id,
        slotsNeeded: row.num_slots,
      }));
    });
  }

  async loadItems(): Promise<Item[]> {
    return this.withConnection(async (db) => {
      const rawItems = await db.all(
        "SELECT * FROM items WHERE type='Armor' OR type='Decoration'",
      );
      return rawItems.map((row) => ({
        itemId: row._id,
        name: row.name,
        description: row.description,
      }));
    });
  }

  async shutdown() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    for (const [id, { connection }] of this.connectionPool.entries()) {
      try {
        await connection.close();
        console.log(`Closed database connection: ${id}`);
      } catch (error) {
        console.error(`Error closing connection ${id}:`, error);
      }
    }

    this.connectionPool.clear();
  }
}

export const databaseService = new DatabaseService();
