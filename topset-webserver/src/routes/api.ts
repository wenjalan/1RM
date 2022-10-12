import express from 'express'
import userRouter from './api/user'
import sessionRouter from './api/session'
const router = express.Router()

router.use('/user', userRouter)
router.use('/session', sessionRouter)

export default router