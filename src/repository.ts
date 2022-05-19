import { Item } from './model.js'

export class ItemRepository {
  private db: { [id: number]: Item }

  constructor() {
    this.db = {} as { [id: number]: Item }
  }

  create(item: Item): void {
    this.db[item.id] = item
  }

  exists(item: Item): boolean {
    return item.id in this.db
  }
}
