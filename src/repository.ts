import { Item } from './model.js'

export class ItemRepository {
  private db: { [id: number]: Item }

  constructor() {
    this.db = {} as { [id: number]: Item }
  }

  public create(item: Item): void {
    this.db[item.id] = item
  }

  public delete(item: Item): boolean {
    return delete this.db[item.id]
  }

  public exists(item: Item): boolean {
    return item.id in this.db
  }
}
