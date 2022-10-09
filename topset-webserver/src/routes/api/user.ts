import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import db from '../../db'
import User from '../../models/User'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  if (req.session.passport) {
    const id = req.session.passport.user.id
    const user: User = await db.getUser(id)
    res.status(200).json(user)
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).send({ "error": "Not logged in" })
  }
})

export default router