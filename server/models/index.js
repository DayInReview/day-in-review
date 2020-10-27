const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dayinreview.lmllq.gcp.mongodb.net/todo_list?retryWrites=true&w=majority`, {
  // connecting to the mongodb database name: "todo-app" locally
  keepAlive: true, // keeping the connection alive
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true); // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

module.exports = {
  Todo: require("./todo"),
  User: require("./user"),
}
