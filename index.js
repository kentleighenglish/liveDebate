const express = require('express');
const path = require('path');
const app = new express();
const http = require('http').Server(app);

const io = require("socket.io")(http);

const port = process.env.port || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
	response.render(`index`);
});

io.on('connection', (socket) => {
	console.log('CONNECTION');
	socket.on('stream', (image) => {
		io.emit('stream', image);
	});
});

http.listen(port, () => {
	console.log(`Server running on port ${port}`);
});