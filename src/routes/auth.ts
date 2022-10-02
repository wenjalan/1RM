import express, { Request, Response } from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/login/google', passport.authenticate('google'))

router.get('/redirect/google', passport.authenticate('google', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failed'
}))

router.get('/success', (req: Request, res: Response) => {
  res.redirect('/')
})

router.get('/failed', (req: Request, res: Response) => {
  res.send('failed')
})

router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error(err)
    res.send('logged out')
  })
})

export default router