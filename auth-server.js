const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator');
const { SECRET } = require('./constants')
const { getValidationErrors } = require('./helper')
const { getUser } = require('./db')

const app = express()
const PORT = process.env.PORT || 8888

app.use(bodyParser.json())

app.post('/login', [
    check('username')
        .not().isEmpty().withMessage("can't be empty"),
    check('password')
        .not().isEmpty().withMessage("can't be empty")
] ,(req, res) => {
    const { username, password } = req.body
    const validationErrors = getValidationErrors(req)

    if (validationErrors) {
        return res.status(422).json(validationErrors)
    }
    
    const user = getUser(username, password)

    if (!user) {
        res.status(401).send('User not found.')
        return
    }

    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, SECRET, { expiresIn: "3 hours" })

    res.status(200).send({ access_token: token })
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log(`Auth server is running on  http://localhost:${PORT}`)
})