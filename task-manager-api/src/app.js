require("./db/mongoose");
const express = require("express");
const User = require("./models/User");
const Task = require("./models/Task");
const app = express();

app.use(express.json());
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).json(user))
    .catch((err) => {
      res.status(400).send(err);
    });
});
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.status(201).json(task))
    .catch((err) => res.status(400).send(err));
});
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

app.get("/users", (req, res) => {
  User.find({})
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
