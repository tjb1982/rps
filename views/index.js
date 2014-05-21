var h = require('hoquet');

exports.layout = function(title, body) {
  return h.doc('html5', [
    'html', [
      'head', [
        'title', title
      ], [
        'meta', {
          'name': 'viewport',
          'content': 'initial-scale=1.0 , minimum-scale=1.0 , maximum-scale=1.0'
        }
      ], h.styles(
        '/build/build.css'
      )
    ],[
      'body', body, h.scripts(
        '/build/build.js'
      )
    ]
  ]);
};

exports.form = function(options) {
  options = options || [];

  return [
    [
      'form', {
        'action':''
      }, [
        'label', {'for':'sign', 'class':'ada-hidden'}, 'Choose'
      ],[
        'select', {'name':'sign'}, [
          'option', {
            'disabled': null,
            'selected': null
          }, 'choose...'
        ], options.map(function(option) {
          return ['option', {'value': option.value}, option.value];
        })
      ],[
        'fieldset', [
          'label', {'for':'submit'}, 'Okay, on "Go."<br /> Rock... paper... scissors...'
        ],[
          'input', {
            'name':'submit',
            'type':'submit',
            'value':'GO!'
          }
        ],[
          'a', {
            'href': '/',
            'id':'go-again'
          }, 'Go again?'
        ]
      ]
    ], ['player','cpu'].map(entityImageContainer.bind(options)),
    [
      'p', {'id':'feedback'}, ''
    ]
  ];
};

function entityImageContainer(entity) {
  return [
    'div', {
      'id': entity + '-images',
    }, this.map(image)
  ];
}

function image(option){
  return ['img', {
    'id': option.value + '-img',
    'class':'sign-img',
    'src': option.img
  }];
}
