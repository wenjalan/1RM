import express, { Express } from 'express'
import session from 'express-session'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import clientRouter from './routes/client'

export interface ServerConfig {
  port: number
  sessionSecret: string
  googleAuthClientId: string
  googleAuthClientSecret: string
  googleAuthCallbackUrl: string
}

function init(config: ServerConfig): Express {
  const server = express()

  // settings
  server.set('json spaces', 2)

  // middleware //
  server.use(session({
    secret: config.sessionSecret,
  }))
  server.use(passport.authenticate('session'))

  // passport //
  passport.use(new GoogleStrategy.Strategy({
    clientID: config.googleAuthClientId,
    clientSecret: config.googleAuthClientSecret,
    callbackURL: config.googleAuthCallbackUrl,
    scope: ['profile'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
  }))
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user: Express.User, done) => done(null, user))

  // routers //
  server.use('/auth', authRouter)
  server.use('/api', apiRouter)
  server.use('/', clientRouter)
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