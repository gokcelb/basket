import { Item } from './model.js'
import { ItemRepository } from './repository.js'

const itemAlreadyInBasketError = new Error('Item already in basket.')

export class Service {
  private repository: ItemRepository

  constructor(repository: ItemRepository) {
    this.repository = repository;
  }

  add(item: Item) {
    throw itemAlreadyInBasketError
    this.repository.add(item)
  }
}
