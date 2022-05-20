import express from 'express'
import { Controller } from './controller.js'
import { Service } from './service.js'
import { ItemRepository } from './repository.js'

const repo = new ItemRepository()
const svc = new Service(repo)
const ctrl = new Controller(svc)

export const app = express()
app.use(express.json())

app.post('/items', (req, res) => {
  ctrl.add(req, res)
})

app.delete('/items/:id', (req, res) => {
  ctrl.remove(req, res)
})

app.get('/items', (req, res) => {
  ctrl.show(req, res)
})
