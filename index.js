const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(express.static(__dirname + '/public'));
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server running...")

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", (socket) => {
	function min(input) {
		return Math.min.apply(Math, input);
	}
	connections.push(socket.handshake.issued);
	socket.user = {
		username: (socket.handshake.issued === min(connections)) ? process.env.USERNAME+" (host)" : process.env.USERNAME,
		isHost: (socket.handshake.issued === min(connections)) ? true : false
	};
	console.log("Connected: %s sockets connected", connections.length);

	// Disconnect
	socket.on("disconnect", (data) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnected: %s sockets connected", connections.length);
	});

	socket.on("roll dice", (one, two) => {
		console.log("triggered roll");
    	io.emit('roll dice', one, two);
	});

	socket.on("random player", (ranPlayer) => {
		console.log("triggered starter");
    	io.emit('random player', ranPlayer, socket.user, connections.length);
	});

	socket.on("move piece", (dpts, pkg) => {
		// check win
		console.log("triggered move");
    	io.emit('move piece', dpts, pkg);
	});

	socket.on("next turn", () => {
		console.log("triggered next");
    	io.emit('next turn');
	});	

	socket.on("ambush piece", () => {
		console.log("triggered ambush");
    	io.emit('ambush piece');
	});

	socket.on("login", (player_name) => {
		console.log("triggered login");
    	io.emit('login', player_name, connections.length);
	});

	socket.on("start game!", () => {
		console.log("triggered load");
    	io.emit('start game!');
	});

	// socket.on("detect position", () => {
	// 	console.log("triggered detect");
 //    	io.emit('detect position', connections.length);
	// });
})