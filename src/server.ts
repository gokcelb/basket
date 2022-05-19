import { app } from './routes.js'

const port = 3000

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
