const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Novo Usuario conectado');

  socket.on('setUsername', (username) => {
    socket.username = username
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      username: socket.username,
      message: msg
    })
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(3001, () => {
  console.log('Servidor rodando na porta 3000');
});
