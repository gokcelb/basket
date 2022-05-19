import { Item } from './model.js'
import { ItemRepository } from './repository.js'

const itemAlreadyInBasketError = new Error('Item already in basket.')
const itemNotInBasketError = new Error('Item not in basket.')
const itemCouldNotBeDeletedError = new Error('Item could not be deleted.')

export class Service {
  private repository: ItemRepository

  constructor(repository: ItemRepository) {
    this.repository = repository;
  }

  public add(item: Item): void {
    if (this.repository.exists(item)) {
      throw itemAlreadyInBasketError
    }
    this.repository.create(item)
  }

  public remove(item: Item): void {
    if (!this.repository.exists(item)) {
      throw itemNotInBasketError
    }

    const deletionSuccessful = this.repository.delete(item)
    if (!deletionSuccessful) {
      throw itemCouldNotBeDeletedError
    }
  }
}
