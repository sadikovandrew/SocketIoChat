var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(3000);

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", function (socket) {
  console.log("Успешное соединение");
  connections.push(socket);

  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отключились");
  });

  socket.on("send mess", function (data) {
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
      backgroundColor: data.backgroundColor,
    });
  });
});
