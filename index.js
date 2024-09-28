const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Create a server for sockit
const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
    socket.on('sendLocation', (data) => {
        console.log("================================");
        console.log(data);
        console.log(socket.id);
        console.log("================================");
        
        
        io.emit('reciveLocation', {id: socket.id, ...data});
    });
    socket.on('disconnect', () => {
        io.emit('userDisconnected', socket.id);
    });
    
});


// Set up a basic route
app.get('/', (req, res) => {
    res.render('index');
});

// Listen for connection
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});