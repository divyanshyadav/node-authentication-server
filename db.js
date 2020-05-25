const users = [
    { id: '1', username: 'admin', password: 'admin' },
    { id: '2', username: 'ship', password: 'ship' }
]

function getUser(username, password) {
    return users.find(user => user.username === username && user.password === password)
}

module.exports = {
    getUser
}