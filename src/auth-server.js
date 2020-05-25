const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const yup = require('yup');

const { SECRET } = require('./constants')
const validate = require('./validate')
const { getUser } = require('./db')

const app = express()
const PORT = process.env.PORT || 8888

function generateJWTToken(user) {
    return jwt.sign({
        sub: user.id,
        username: user.username
    }, SECRET, { expiresIn: "3 hours" })
}

app.use(bodyParser.json())

app.post('/login', validate({
    username: yup.string().max(30).required(),
    password: yup.string().max(30).required()
}), (req, res) => {
    const { username, password } = req.body
    const user = getUser(username, password)

    if (!user) {
        return res
            .status(401)
            .send('User not found.')
    }

    res
        .status(200)
        .send({ 
            access_token: generateJWTToken(user) 
        })
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log(`Auth server is running on  http://localhost:${PORT}`)
})