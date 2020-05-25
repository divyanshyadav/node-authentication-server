const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { checkSchema } = require('express-validator');

const { SECRET } = require('./constants')
const { getValidationErrors } = require('./helper')
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

app.post('/login', checkSchema({
    username: {
        isEmpty: {
            negated: true,
            errorMessage: "required"
        }
    },
    password: {
        isEmpty: {
            negated: true,
            errorMessage: "required"
        }
    }
}), (req, res) => {
    const { username, password } = req.body
    const validationErrors = getValidationErrors(req)

    if (validationErrors) {
        return res
            .status(422)
            .json(validationErrors)
    }
    
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