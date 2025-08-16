const express = require("express");
const cors = require("cors");
const players = require("../data/players.json"); // פשוט require

const app = express();
app.use(cors());

app.get("/players", (req, res) => {
  res.json(players);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
