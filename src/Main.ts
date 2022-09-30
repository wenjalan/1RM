import express from 'express'
import apiRouter from './routes/api'
import oauth2Router from './routes/oauth2'
import session from 'express-session'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(session({
  secret: process.env['SESSION_SECRET'] ? process.env['SESSION_SECRET'] : '',
}))

app.use('/api', apiRouter)
app.use('/oauth2', oauth2Router)

app.listen(3000, () => {
  console.log('server started at http://localhost:3000')
})