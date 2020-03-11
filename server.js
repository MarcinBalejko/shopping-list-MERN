const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const port = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server up and running on port ${PORT}`)
);
