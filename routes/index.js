var
h = require('hoquet'),
views = require('../views'),
options = [{
  value: 'rock',
  img: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/100px-Rock-paper-scissors_%28rock%29.png'
},{
  value: 'paper',
  img: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/100px-Rock-paper-scissors_%28paper%29.png'
},{
  value: 'scissors',
  img: 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/100px-Rock-paper-scissors_%28scissors%29.png'
}],
rules = {
  'scissors': options[1].value,
  'paper': options[0].value,
  'rock':options[2].value
};


exports.index = function(req, res){
  res.send(views.layout('Rock, Paper, Scissors', views.form(options)));
};

exports.throw = function(req, res) {

  var cpu = options[
    Math.floor(Math.random() * 3)
  ].value;

  res.json({
    'cpu': cpu,
    'player': req.params.sign,
    'outcome': outcome(req.params.sign, cpu)
  });
};

function outcome(player, cpu) {
  return player === cpu ? -1
  : rules[player] === cpu ? true
  : false;
}
