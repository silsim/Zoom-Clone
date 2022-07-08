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
  socket["nickname"] = "Anon"
  console.log("Connected to Brower😀");
  socket.on("close", () => {console.log("Not Connected from Server 😈")})

  socket.on("message", (msg) => {
    const parseMsg = JSON.parse(msg);
    switch(parseMsg.type) {
      case "new_message" :
        sockets.forEach( (aSokets) => aSokets.send(`${socket.nickname}: ${parseMsg.payload}`));
    case "nickname" :
      socket["nickname"] = parseMsg.payload
    }
  })
})

server.listen(3300, handleListn)