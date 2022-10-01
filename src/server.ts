import express, { Express } from 'express'
import session from 'express-session'

export interface ServerConfig {
  port: number
  sessionSecret: string
}

function init(config: ServerConfig): Express {
  const server = express()

  // middleware //
  server.use(session({
    secret: config.sessionSecret,
  }))

  return server
}

function serve(config: ServerConfig) {
  const server = init(config)
  server.listen(config.port, () => {
    console.log(`server started on port ${config.port}`)
  })
}

export default {
  serve: serve
}