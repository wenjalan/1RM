import * as dotenv from 'dotenv'
import server from './server'
dotenv.config()

server.serve({
  port: process.env["PORT"] ? parseInt(process.env["PORT"]) : 3000,
  sessionSecret: process.env["SESSION_SECRET"] ? process.env["SESSION_SECRET"] : "",
  googleAuthClientId: process.env["GOOGLE_AUTH_CLIENT_ID"] ? process.env["GOOGLE_AUTH_CLIENT_ID"] : "",
  googleAuthClientSecret: process.env["GOOGLE_AUTH_CLIENT_SECRET"] ? process.env["GOOGLE_AUTH_CLIENT_SECRET"] : "",
  googleAuthCallbackUrl: process.env["GOOGLE_AUTH_CALLBACK_URL"] ? process.env["GOOGLE_AUTH_CALLBACK_URL"] : "",
})