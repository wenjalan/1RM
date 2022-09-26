import express, { Request, Response } from 'express';
const router = express.Router()

router.get('/:id', (req: Request, res: Response) => {
  res.send('GET USER ' + req.params.id)
})

router.post('/', (req: Request, res: Response) => {
  res.send('POST USER')
})

router.put('/:id', (req: Request, res: Response) => {
  res.send('PUT USER ' + req.params.id)
})

router.delete('/:id', (req: Request, res: Response) => {
  res.send('DELETE USER ' + req.params.id)
})

export default router