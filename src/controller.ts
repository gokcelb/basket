import Express, { request } from 'express'
import { Service } from './service.js'
import { Item } from './model.js'

export class Controller {
  private service: Service

  constructor(service: Service) {
    this.service = service
  }

  add(req: Express.Request, res: Express.Response): void {
    const item = this.reqBodyToItem(req)
    try {
      this.service.add(item)
      res.json(item)
    } catch(e) {
      console.error(e)
      res.status(500).json({"msg": e.message})
    }
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
