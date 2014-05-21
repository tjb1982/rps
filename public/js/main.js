var
to,
sa = require('superagent'),
options = ['rock','paper','scissors'],
form = document.getElementsByTagName('form')[0],
fieldset = form.getElementsByTagName('fieldset')[0],
select = form.getElementsByTagName('select')[0],
submit = fieldset.getElementsByTagName('input')[0],
feedback = document.getElementById('feedback'),
goAgain = document.getElementById('go-again'),
cpu_image_container = document.getElementById('cpu-images'),
cpu_images = cpu_image_container.getElementsByTagName('img'),
player_image_container = document.getElementById('player-images'),
player_images = player_image_container.getElementsByTagName('img');


select.onchange = function() {
  setImage(player_images, this.options[this.selectedIndex].value, -1);
  submit.disabled = false;
  fieldset.style.display = 'block';
  intimidatePlayer();
};

form.onsubmit = function(e) {
  e.preventDefault();
  var sign = select.options[select.selectedIndex].value;

  !~sign.indexOf('choose') && sa.post('/throw/' + sign, function(resp) {
    var outcome = resp.body.outcome === -1 ? { player: 2, cpu: 2 }
    : resp.body.outcome ? { player: 1, cpu: 0 }
    : { player: 0, cpu: 1 };

    var sentiment = [{
      text:'Ugh :( ' + capitalize(resp.body.cpu) + ' beats ' + resp.body.player + '.',
      value: false
    },{
      text:'Yes! ' + capitalize(resp.body.player) + ' beats ' + resp.body.cpu + '!',
      value: true
    },{
      text: 'Tie.',
      value: -1
    }];

    clearTimeout(to);
    select.disabled = true;
    submit.disabled = true;

    setImage(player_images, resp.body.player, sentiment[outcome.player].value);
    setImage(cpu_images, resp.body.cpu, sentiment[outcome.cpu].value);
    feedback.innerHTML = sentiment[outcome.player].text;
    goAgain.style.display = 'inline';

  });

};

clearImages(player_images);
submit.disabled = true;

function setImage(images, sign, sentiment) {
  Array.prototype.map.call(images, (function(img) {
    if (img.getAttribute('id') === sign + '-img') {
      img.style.display = 'inline';
      img.style.backgroundColor = sentiment === -1 ? 'gray'
      : sentiment ? 'green' : 'red';
    }
    else img.style.display = 'none';
  }));
}

function clearImages(images) {
  Array.prototype.map.call(images, (function(img) {
    return img.style.display = 'none';
  }));
};

function intimidatePlayer() {
  clearTimeout(to);
  to = setTimeout(function() {

    var selection = Math.floor(Math.random() * 3);

    clearImages(cpu_images);

    cpu_images[selection].style.display = 'inline';

    intimidatePlayer();

  }, 150);
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}
