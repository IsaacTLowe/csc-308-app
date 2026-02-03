import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from "./user_services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// GET /users - fetch all users or filter by name and/or job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    // Filter by both name and job
    userServices
      .findUserByNameAndJob(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  } else if (name) {
    // Filter by name only
    userServices
      .findUserByName(name)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  } else if (job) {
    // Filter by job only
    userServices
      .findUserByJob(job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  } else {
    // Get all users
    userServices
      .getUsers()
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  }
});

// GET /users/:id - fetch user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

// POST /users - create a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

// DELETE /users/:id - delete user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res.status(404).send("User not found.");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});