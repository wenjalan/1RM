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
  if (!req.body || !req.body.id) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing id in request body\n')
  }
  const id = req.body.id
  try {
    const session = await db.getSession(id)
    return res.status(200).json(session)  
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ "error": err })
  }
})

router.post('/', async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing request body')
  }
  if (!req.body.movement) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing movement in request body\n')
  }
  if (!req.body.weight) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing weights in request body\n')
  }
  if (!req.body.sets) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing sets in request body\n')
  }
  if (!req.body.reps) {
    return res.status(StatusCodes.BAD_REQUEST).send('Missing reps in request body\n')
  }
  
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
  return res.status(200).json(session)
})

export default router