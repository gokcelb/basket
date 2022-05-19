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

  public exists(itemId: number): boolean {
    return itemId in this.db
  }
}
