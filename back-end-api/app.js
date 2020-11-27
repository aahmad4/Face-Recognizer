const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  bcrypt = require("bcrypt-nodejs"),
  cors = require("cors"),
  knex = require("knex");

const register = require("./controllers/register"),
  signin = require("./controllers/signin"),
  profile = require("./controllers/profile"),
  image = require("./controllers/image");

// ----------------------------------------------
// CREATE DATABASE smartbrain TEMPLATE template0;
// ----------------------------------------------
// \c smartbrain
// ----------------------------------------------
// CREATE TABLE users (
//   id serial PRIMARY KEY,
//   name VARCHAR(100),
//   email text UNIQUE NOT NULL,
//   entries BIGINT DEFAULT 0,
//   joined TIMESTAMP NOT NULL
// );
// ----------------------------------------------
// CREATE TABLE login (
//   id serial PRIMARY KEY,
//   hash VARCHAR(100) NOT NULL,
//   email text UNIQUE NOT NULL
// );
// ----------------------------------------------

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    // host: "127.0.0.1"
    // user: "postgres",
    // password: "test",
    // database: "smartbrain",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error getting users!"));
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log(`App is listening!`);
  }
});
