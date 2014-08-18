var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	mainController = require('./src/controllers/main')(),
	publisher = require('./src/services/publisher');

app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')
app.use('/public', express.static(__dirname + '/static'));



app.get('/',mainController.index);

io.on('connection',function(socket){
	console.log('a user has connected');
	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
});

setInterval(function(){
	io.emit('info', {
		x: (new Date()).getTime(),
		y: Math.random() * 3
	});
},1000);

publisher.subscribe(function(data){
	console.log("printing from client code: " + data)
	var jsonObj = JSON.parse(data);
	io.emit('publish',{
		x: (new Date()).getTime(),
		y: jsonObj.db / 100
	});
});

http.listen(3000,function(){
	console.log("Starting server at port: 3000");
});