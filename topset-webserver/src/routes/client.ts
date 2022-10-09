import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

const publicRoute = path.join(__dirname, '../../public')

router.use(express.static(publicRoute))

router.use('/', (req: Request, res: Response) => {
  res.sendFile(publicRoute + '/index.html')
})

export default router