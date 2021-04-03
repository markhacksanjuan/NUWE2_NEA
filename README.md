# NUWE HackThatStartUp 2
---
## Author
Mark Sanjuán

## Install
npm install

## Environment variables
Remember to create .env file with MONGODB_URL and JWT_SECRET
---

Link to deployed app: [NUWE 2](https://nuwe2-nea.herokuapp.com/)

### Routes
#### NEA routes
/asteroid/insertAll - insert the CSV to MongoDB
/asteroid/deleteAll - remove all NEA from DB
/asteroid/createOne - insert one new NEA to DB
/asteroid/getOne - get one NEA with the full name
/asteroid/getOneById/:id - get one NEA with the id from the DB
/asteroid/getAll - get all NEA from the DB
/asteroid/editOne - update one NEA with the full name
/asteroid/editOneById - update one NEA with the id from the DB
/asteroid/deleteOne - remove one NEA with the full name
/asteroid/deleteOneById - remove one NEA with the id from the DB

#### AUTH routes
/auth/signup - sign up a new user (create new user)
/auth/login - log in a user using email & password

#### USER routes
/user/getOne - get one user with the email
/user/getAll - get all the users from the DB
/user/getOneById - get one user with the id from the DB
/user/deleteOne - remove one user with the email
/user/deleteOneById/:id - remove one user with the id from the DB
/user/editUser - update one user with the email
/user/editUserById/:id - update one user with the id from the DB

Link to postman JSON: [POSTMAN](https://nuwe2-nea.herokuapp.com/test)
