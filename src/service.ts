import { Item } from './model.js'
import { ItemRepository } from './repository.js'

const itemAlreadyInBasketError = new Error('Item already in basket.')
export const itemNotInBasketError = new Error('Item not in basket.')
export const itemCouldNotBeDeletedError = new Error('Item could not be deleted.')

export class Service {
  private repository: ItemRepository

  constructor(repository: ItemRepository) {
    this.repository = repository;
  }

  public add(item: Item): void {
    if (this.repository.exists(item.id)) {
      throw itemAlreadyInBasketError
    }
    this.repository.create(item)
  }

  public remove(itemId: number): void {
    if (!this.repository.exists(itemId)) {
      throw itemNotInBasketError
    }

    const deletionSuccessful = this.repository.delete(itemId)
    if (!deletionSuccessful) {
      throw itemCouldNotBeDeletedError
    }
  }

  public show(): Item[] {
    return this.repository.readAll()
  }
}
