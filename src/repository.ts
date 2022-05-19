import { Item } from './model.js'

export class ItemRepository {
  private db: { [id: number]: Item }

  constructor() {
    this.db = {} as { [id: number]: Item }
  }

  add(item: Item): void {
    this.db[item.id] = item
  }
}
