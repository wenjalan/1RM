import express, { Request, Response } from 'express'

const router = express.Router()

router.use('/', (req: Request, res: Response) => {
  if (req.session.passport) {
    res.json(req.session.passport.user)
  }
  else {
    res.send('not logged in')
  }
})

export default router