import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Thêm methods cho inventory
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private data: Map<string, any>; // Thêm storage cho data chung

  constructor() {
    this.users = new Map();
    this.data = new Map(); // Khởi tạo data storage
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Thêm methods mới cho inventory storage
  async get(key: string): Promise<any> {
    return this.data.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    this.data.set(key, value);
  }
}

export const storage = new MemStorage();
