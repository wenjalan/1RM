import express, { Request, Response } from 'express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.use(passport.authenticate('session'))

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env['GOOGLE_CLIENT_ID'] ? process.env['GOOGLE_CLIENT_ID'] : '',
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ? process.env['GOOGLE_CLIENT_SECRET'] : '',
  callbackURL: process.env['GOOGLE_CALLBACK_URL'] ? process.env['GOOGLE_CALLBACK_URL'] : '',
  scope: ['profile'],
  state: true
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('profile', profile)
  done(null, profile)
}))

passport.serializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  return done(null, user)
})

router.get('/login/google', passport.authenticate('google'))

router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err)
    }
    res.redirect('/loggedout')
  })
})

router.get('/redirect/google', passport.authenticate('google', {
  successRedirect: '/success',
  failureRedirect: '/failed'
}))

export default router