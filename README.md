#Auth Service with Web UI

## How to start the project

```sh
docker-compose up --build
```

## API

the REST API works on localhost port 10000

### How to create a user

```postman
POST http://localhost:10000/signup

Body

{
  "email": "test@test.com",
  "password": "test"
}
```

### How to login

```postman
POST http://localhost:10000/login

Body

{
  "email": "test@test.com",
  "password": "test"
}
```

### How to logout

```postman
POST http://localhost:10000/logout

Header:

Authorization: Bearer AccessToken
```

## Web

the UI works on localhost port 3000
http://localhost:3000

13 hours worked
