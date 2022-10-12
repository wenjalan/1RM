import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import db from '../../db'
import User from '../../models/User'

const router = express.Router()

router.use((req, res) => {
  if (!req.session.passport) {
    res.status(StatusCodes.UNAUTHORIZED).send({ "error": "Not logged in" })
  }
})

router.get('/', async (req: Request, res: Response) => {
  const id = req.session.passport.user.id
  const user: User = await db.getUser(id)
  res.status(200).json(user)
})

router.get('/log', async (req: Request, res: Response) => {
  const id = req.session.passport.user.id
  const sessions = db.getSessionLog(id)
  res.status(200).json(sessions)
})

export default router