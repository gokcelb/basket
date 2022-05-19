import { mock, instance, when, verify } from 'ts-mockito'
import { Service } from '../src/service'
import { ItemRepository } from '../src/repository'
import { Item } from '../src/model'

describe('Service', () => {
  let mockRepo: ItemRepository
  let mockItem: Item
  let item: Item

  beforeEach(() => {
    mockRepo = mock(ItemRepository)
    mockItem = mock<Item>()
    item = instance(mockItem)
    item.id = 1
  })

  describe('add', () => {
    test('calls ItemRepository create method', () => {
      when(mockRepo.exists(item.id)).thenReturn(false)

      const service = new Service(instance(mockRepo))
      service.add(item)

      verify(mockRepo.exists(item.id)).once()
      verify(mockRepo.create(item)).once()
    })

    test('throws itemAlreadyInBasketError', () => {
      when(mockRepo.exists(item.id)).thenReturn(true)

      const service = new Service(instance(mockRepo))
      try {
        service.add(item)
      } catch(e) {
        verify(mockRepo.exists(item.id)).once()
        verify(mockRepo.create(item)).never()
        expect(e.message).toBe('Item already in basket.')
      }
    })
  })

  describe('remove', () => {
    test('calls ItemRepository delete method', () => {
      when(mockRepo.exists(item.id)).thenReturn(true)
      when(mockRepo.delete(item.id)).thenReturn(true)

      const service = new Service(instance(mockRepo))
      service.remove(item.id)

      verify(mockRepo.exists(item.id)).once()
      verify(mockRepo.delete(item.id)).once()
    })

    test('throws itemNotInBasketError', () => {
      when(mockRepo.exists(item.id)).thenReturn(false)

      const service = new Service(instance(mockRepo))
      try {
        service.remove(item.id)
      } catch(e) {
        verify(mockRepo.exists(item.id)).once()
        verify(mockRepo.delete(item.id)).never()
        expect(e.message).toBe('Item not in basket.')
      }
    })

    test('throws itemCouldNotBeDeletedError', () => {
      when(mockRepo.exists(item.id)).thenReturn(true)
      when(mockRepo.delete(item.id)).thenReturn(false)

      const service = new Service(instance(mockRepo))
      try {
        service.remove(item.id)
      } catch(e) {
        verify(mockRepo.exists(item.id)).once()
        verify(mockRepo.delete(item.id)).once()
        expect(e.message).toBe('Item could not be deleted.')
      }
    })
  })
})
