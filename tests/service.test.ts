import { mock, instance, when, verify, anything } from 'ts-mockito'
import { Service } from '../src/service'
import { ItemRepository } from '../src/repository'
import { Item } from '../src/model'

describe('Service', () => {
  describe('add', () => {
    let mockRepo: ItemRepository

    beforeEach(() => {
      mockRepo = mock(ItemRepository)
    })

    test('calls ItemRepository create method', () => {
      when(mockRepo.exists(anything())).thenReturn(false)

      const item: Item = {
        id: 1,
        name: 'item1',
        price: 100,
        description: 'this is item1'
      }

      const service = new Service(instance(mockRepo))
      service.add(item)

      verify(mockRepo.exists(item)).once()
      verify(mockRepo.create(item)).once()
    })

    test('throws itemAlreadyInBasketError', () => {
      when(mockRepo.exists(anything())).thenReturn(true)

      const item: Item = {
        id: 1,
        name: 'item1',
        price: 100,
        description: 'this is item1'
      }

      const service = new Service(instance(mockRepo))
      try {
        service.add(item)
      } catch(e) {
        verify(mockRepo.exists(item)).once()
        verify(mockRepo.create(item)).never()
        expect(e.message).toBe('Item already in basket.')
      }
    })
  })
})
