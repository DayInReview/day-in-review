const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express(); // generate an app object
const db = require("./models/"); // MongoDB models
const passport = require("passport");
const PORT = process.env.PORT || 3001;

// Routes
const users = require("./routes/users");

// Middleware
app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload
app.use(cors());
app.use(passport.initialize());
require("./passport")(passport);  // Configures passport
app.use("/users", users);

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`); // print this when the server starts
});
