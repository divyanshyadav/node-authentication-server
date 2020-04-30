const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 8888

app.use(bodyParser.json())

const secret = 'my-super-secret-key'

const users = [
    { id: '1', username: 'admin', password: 'admin' },
    { id: '2', username: 'ship', password: 'ship' }
]

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send('Please provide username and password.')
        return
    }

    const user = users
        .find(user => user.username === username && user.password === password)

    if (!user) {
        res.send(401).send('User not found.')
        return
    }

    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, secret, { expiresIn: "3 hours" })

    res.status(200).send({ access_token: token })
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})