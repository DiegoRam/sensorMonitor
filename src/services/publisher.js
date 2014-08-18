var zmq = require('zmq'),
	port='tcp://localhost:4040';

function Publisher(){
	this.socket = zmq.socket('sub');
	this.socket.identity = ('suscriber ' + process.pid);
	this.socket.connect(port);
}

Publisher.prototype.subscribe = function(callback){
	this.socket.subscribe('');
	this.socket.on('message', function(data){
		callback(data);
	});
}

module.exports = new Publisher();


