import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import db from '../../db'
import Session from '../../models/Session'

const router = express.Router()

router.use((req, res) => {
  if (!req.session.passport) {
    res.status(StatusCodes.UNAUTHORIZED).send({ "error": "Not logged in" })
  }
})

router.get('/', async (req: Request, res: Response) => {
  const id = req.body.id
  try {
    const session = await db.getSession(id)
    res.status(200).json(session)  
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err)
  }
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.session.passport.user.id
  const session: Session = {
    id: `${userId}:${Date.now()}`,
    userId: userId,
    date: Date.now().toString(),
    movement: req.body.movement,
    weight: req.body.weight,
    reps: req.body.reps,
    sets: req.body.sets
  }
  await db.addSession(session)
  res.status(200).json(session)
})