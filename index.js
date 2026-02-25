import http from "http";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})


//Socket.io
io.on('connection', (socket) => {
    console.log("User Connected: "+socket.id);
    socket.on("user-msg", (message) => {
        io.emit("msgSend",message);
    });
})

server.listen(port, () => {
    console.log("Server running on "+port);
});