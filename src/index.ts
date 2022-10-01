import * as dotenv from 'dotenv'
import server from './server'
dotenv.config()

server.serve({
  port: process.env["PORT"] ? parseInt(process.env["PORT"]) : 3000,
  sessionSecret: process.env["SESSION_SECRET"] ? process.env["SESSION_SECRET"] : "",
})