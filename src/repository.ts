import { Item } from './model.js'

export class ItemRepository {
  private db: { [id: number]: Item }

  constructor() {
    this.db = {} as { [id: number]: Item }
  }

  public create(item: Item): void {
    this.db[item.id] = item
  }

  public delete(itemId: number): boolean {
    return delete this.db[itemId]
  }

  public readAll(): Item[] {
    const items = [] as Item[]
    for (let item in this.db) {
      items.push(this.db[item])
    }
    return items
  }

  public exists(itemId: number): boolean {
    return itemId in this.db
  }
}
