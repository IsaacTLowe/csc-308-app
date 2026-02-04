import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    userServices
      .findUserByName(name)
      .then((users) => {
        const filtered = users.filter((user) => user.job === job);
        res.send({ users_list: filtered });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  } else {
    userServices
      .getUsers(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  }
});

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
