const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const { SECRET } = require('./constants')

const app = express()
const PORT = process.env.PORT || 8888

app.use(bodyParser.json())

const jwtCheck = expressJwt({ secret: SECRET })

app.get('/auth/secret', jwtCheck, (req, res) => {
    res.status(200).send('Your secret!!')
})

app.get('/status', (req, res) => {
    const localTime =  (new Date()).toLocaleDateString()

    res
    .status(200)
    .send(`Server time is ${localTime}.`)
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})