# Pokemon Frontend App

Pokemon frontend app uses Auth0 to authenticate and integrates [Pokemon Backend API](http://localhost:6060/api-docs) secured endpoints.

## Installation

Use [docker-compose](https://docs.docker.com/compose/) to install and run the API.

```bash
docker-compose up
```

Without docker/docker-compose
> Note: Developed and tested the application in Node v12.18.3 and it should work with higher version.
```bash
yarn install
yarn start
```

## Getting started

To explore the APP, navigate to the following URL: [Frontend APP](http://localhost:4040)

## Tools and stack
The backend API utilizes the followings:
- For authorization and authentication used Auth0
- Used [create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/) package to scaffold the basic version of this project
- Used [Material UI](https://mui.com/) library to use prebuilt beautifully crafted components