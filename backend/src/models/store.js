import crypto from 'crypto';

function generateId() {
  try {
    return crypto.randomUUID();
  } catch (_e) {
    return crypto
      .createHash('sha1')
      .update(Math.random().toString())
      .digest('hex')
      .slice(0, 12);
  }
}

class InMemoryStore {
  constructor() {
    this.idToItem = new Map();
  }

  create(item) {
    const id = generateId();
    const now = new Date().toISOString();
    const newItem = { id, createdAt: now, updatedAt: now, ...item };
    this.idToItem.set(id, newItem);
    return newItem;
  }

  get(id) {
    return this.idToItem.get(id);
  }

  list() {
    return Array.from(this.idToItem.values());
  }

  update(id, patch) {
    const existing = this.idToItem.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    this.idToItem.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.idToItem.delete(id);
  }
}

export class UsersStore extends InMemoryStore {
  findByEmail(email) {
    return this.list().find((u) => u.email === email);
  }
}

export const usersStore = new UsersStore();
export const tripsStore = new InMemoryStore();


