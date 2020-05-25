# Demo of JWT-Token authentication
* JWT-Token Authentication Server: use to generate the access_token by taking username and password.
* Client server: Has some public and private routes. To access private routes user need to send the access_token with the request.

## Installation
```bash
npm install
```

## Launch client server
```bash
npm start
```

## Launch auth server
```bash
npm run start:authServer
```

## License
[MIT](https://choosealicense.com/licenses/mit/)