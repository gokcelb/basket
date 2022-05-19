import express from 'express'
import { Controller } from './controller.js'
import { Service } from './service.js'
import { ItemRepository } from './repository.js'

const repo = new ItemRepository()
const svc = new Service(repo)
const ctrl = new Controller(svc)

export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send(hello())
})

function hello(): string {
  return 'Hello World! Hi!'
}

app.post('/items', (req, res) => {
  ctrl.add(req, res)
})
