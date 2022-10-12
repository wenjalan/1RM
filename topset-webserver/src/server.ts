import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import session from 'express-session'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import clientRouter from './routes/client'
import database from './db'
import User from './models/User'

dotenv.config()

export interface ServerConfig {
  sessionSecret: string
  googleAuthClientId: string
  googleAuthClientSecret: string
  googleAuthCallbackUrl: string
}

const ENV_CONFIG: ServerConfig = {
  sessionSecret: process.env["SESSION_SECRET"] ? process.env["SESSION_SECRET"] : "",
  googleAuthClientId: process.env["GOOGLE_AUTH_CLIENT_ID"] ? process.env["GOOGLE_AUTH_CLIENT_ID"] : "",
  googleAuthClientSecret: process.env["GOOGLE_AUTH_CLIENT_SECRET"] ? process.env["GOOGLE_AUTH_CLIENT_SECRET"] : "",
  googleAuthCallbackUrl: process.env["GOOGLE_AUTH_CALLBACK_URL"] ? process.env["GOOGLE_AUTH_CALLBACK_URL"] : "",
}

function init(config: ServerConfig): Express {
  const server = express()

  // middleware //
  server.use(express.json())
  server.use(session({
    secret: config.sessionSecret,
  }))
  server.use(passport.authenticate('session'))

  // passport //
  const googleStrategy = new GoogleStrategy.Strategy(
    {
      clientID: config.googleAuthClientId,
      clientSecret: config.googleAuthClientSecret,
      callbackURL: config.googleAuthCallbackUrl,
      scope: ['profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Find a way to extract this user creation process
      let user: User
      if (await database.hasUser(profile.id)) {
        user = await database.getUser(profile.id)
      }
      else {
        user = {
          id: profile.id,
          displayName: profile.displayName
        }
        await database.addUser(user)
      }
      done(null, user)
    }
  )
  passport.use(googleStrategy)
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: Express.User, done) => done(null, user))

  // routers //
  server.use('/auth', authRouter)
  server.use('/api', apiRouter)
  server.use('/', clientRouter)
  return server
}

function serve(port: number, config: ServerConfig = ENV_CONFIG) {
  const server = init(config)
  server.listen(port, () => {
    console.log(`server started on port ${port}`)
  })
}

export default {
  serve: serve
}