import http from "http";
import { Server } from "socket.io";
import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"))

const server = http.createServer(app);
const socketIo = new Server(server)

socketIo.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(()=>{
      done()
    }, 10000)
  })
})

server.listen(3300, ()=>{
  console.log('Listening on http://localhost:3300');
})