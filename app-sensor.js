var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')
app.use('/public', express.static(__dirname + '/static'));

app.get('/',function(req, res){
	res.render('index');
});

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

http.listen(3000,function(){
	console.log("Starting server at port: 3000");
});