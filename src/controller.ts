import Express from 'express'
import { Service, itemCouldNotBeDeletedError, itemNotInBasketError } from './service.js'
import { Item } from './model.js'

export class Controller {
  private service: Service

  constructor(service: Service) {
    this.service = service
  }

  public add(req: Express.Request, res: Express.Response): void {
    const item = this.reqBodyToItem(req)
    try {
      this.service.add(item)
      res.status(201).json(item)
    } catch(e) {
      console.error(e)
      res.status(500).json({ "msg": e.message })
    }
  }

  public remove(req: Express.Request, res: Express.Response): void {
    const itemId = parseInt(req.params.id)
    try {
      this.service.remove(itemId)
      res.status(204).send()
    } catch(e) {
      console.error(e)
      if (e == itemCouldNotBeDeletedError) {
        res.status(500).json({ "msg": e.message })
      } else if (e == itemNotInBasketError) {
        res.status(404).json({ "msg": e.message })
      }
    }
  }

  public show(req: Express.Request, res: Express.Response): void {
    res.json(this.service.show())
  }

  private reqBodyToItem(req: Express.Request): Item {
    let item = {} as Item
    item.id = req.body.id
    item.name = req.body.name
    item.price = req.body.price
    item.description = req.body.description
    return item
  }
}
