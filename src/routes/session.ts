import express from 'express'
const router = express.Router()

router.get('/:id', (req, res) => {
  res.send('GET SESSION ' + req.params.id)
})

router.post('/', (req, res) => {
  res.send('POST SESSION')
})

router.put('/:id', (req, res) => {
  res.send('PUT SESSION ' + req.params.id)
})

router.delete('/:id', (req, res) => {
  res.send('DELETE SESSION ' + req.params.id)
})

export default router