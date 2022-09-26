import express from 'express'
const router = express.Router()

router.get('/:id', (req, res) => {
  res.send('GET MOVEMENT')
})

router.post('/', (req, res) => {
  res.send('POST MOVEMENT')
})

router.put('/:id', (req, res) => {
  res.send('PUT MOVEMENT')
})

router.delete('/:id', (req, res) => {
  res.send('DELETE MOVEMENT')
})

export default router