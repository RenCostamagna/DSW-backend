import express from 'express'

const app = express()

app.use('/',(req, res) => {
    res.send('Hello!!')
})

app.listen(3000, () => {
    console.log('Server running on https://localhost:3000/')
})