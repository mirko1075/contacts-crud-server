const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const cors = require("cors");

const createError = require("http-errors");
const Contact = require("./models/contacts.model");

require("dotenv").config();

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE
const app = express();

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost",
      "http://127.0.0.1",
      "http://127.0.0.1:3000",
    ],
  })
);

// SESSION MIDDLEWARE

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ROUTER
// GET '/CONTACTLIST' Get all products
app.get("/contacts-list/:contact", (req, res, next) => {
  console.log("Get contacts list");

  console.log("req :>> ", req);
  const contact = req.params.contact;
  console.log("contact :>> ", contact);
  Contact.find({ contact: contact })
    .then((contactList) => {
      res.status(200).json(contactList);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// POST CREATE CONTACT ITEM
app.post("/contact-list", (req, res, next) => {
  console.log("Create contact list item");
  const { firstName, lastName, address, city, cap, tel, mail, active} = req.body;
  Contact.create({ firstName, lastName, address, city, cap, tel, mail, active})
    .then((contactListItm) => {
      res.status(200).json(contactListItm);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// DELETE DELETE CONTACT ITEM
app.delete("/contact-list", (req, res, next) => {
  console.log("Delete contact list item");
  const { contactId } = req.body;
  console.log("contactId :>> ", contactId);
  Contact.findByIdAndDelete(contactId)
    .then((contactItm) => {
      res.status(200).json(contactItm);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// PUT UPDATE WHOLE CONTACT ITEM
app.put("/contact-list", (req, res, next) => {
  console.log("Delete contact list item");
  const { firstName, lastName, address, city, cap, tel, mail, active} = req.body;
  console.log("contactId :>> ", contactId);
  Contact.findByIdAndUpdate(contactId, { firstName, lastName, address, city, cap, tel, mail, active })
    .then((contactItm) => {
      res.status(200).json(contactItm);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// PUT UPDATE WHOLE CONTACT ITEM
app.put("/contact-list", (req, res, next) => {
  console.log("Delete contact list item");
  const { firstName, lastName, address, city, cap, tel, mail, active} = req.body;
  console.log("contactId :>> ", contactId);
  Contact.findByIdAndUpdate(contactId, { firstName, lastName, address, city, cap, tel, mail, active})
    .then((contactItm) => {
      res.status(200).json(contactItm);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// ROUTE FOR SERVING REACT APP (index.html)
app.use((req, res, next) => {
  // If no previous routes match the request, send back the React app.
  res.sendFile(__dirname + "/public/index.html");
});
// ERROR HANDLING
//  Catch 404 and respond with error message
// Shows a 404 error with a message when no route is found for the request
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" }); // .send( JSON.stringify(  { code: 'not found' }  ) )
});

// Catch `next(err)` calls
app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});

module.exports = app;
