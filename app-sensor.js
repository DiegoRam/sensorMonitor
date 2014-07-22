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
	console.debug('a user has connected');
});



http.listen(3000,function(){
	console.log("Starting server at port: 3000");
});