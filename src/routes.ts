import express from 'express'

export const app = express()

app.get('/', (req, res) => {
  res.send(hello())
})

function hello(): string {
  return 'Hello World! Hi!'
}
