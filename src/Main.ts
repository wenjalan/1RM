import express, { Request, Response } from 'express'
import apiRouter from './routes/api'

const app = express();

app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log('server started at http://localhost:3000')
})