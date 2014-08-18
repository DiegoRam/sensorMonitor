module.exports = function(){
	return new MainController();
}

function MainController(){}

MainController.prototype.index = function(req,res){
	res.render('index');
}