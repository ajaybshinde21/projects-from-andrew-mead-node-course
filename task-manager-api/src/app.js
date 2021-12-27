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
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const users = await User.findById(_id);
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
