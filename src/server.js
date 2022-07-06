import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"))
//app.get("/*", (req, res) => res.redirect("home"))

const handleListn = () => console.log('Listening on http://localhost:3300');
// app.listen(3300, handleListem);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket)
  console.log("Connected to Brower😀");
  socket.on("close", () => {console.log("Not Connected from Server 😈")})
  socket.on("message", (message) => {
    sockets.forEach( (aSokets) => aSokets.send(message.toString('utf-8')))
  })
})

server.listen(3300, handleListn)