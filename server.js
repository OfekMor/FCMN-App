import express from "express";
import fs from "fs";
import path from "path";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve API
app.get("/players", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "players.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(jsonData);
});

// WebSocket
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  ws.send(JSON.stringify({ type: "connected" }));

  // fs.watch מקשיב לשינויים בקובץ
  const filePath = path.join(process.cwd(), "data", "players.json");
  const watcher = fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      console.log("Players JSON changed, sending update...");
      ws.send(JSON.stringify({ type: "playersUpdated" }));
    }
  });

  ws.on("close", () => watcher.close());
});

server.listen(3000, () =>
  console.log("Server running on http://192.168.1.179:3000")
);
