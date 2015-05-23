(function() {
  var d3, fs;

  fs = require('fs');

  d3 = require('d3');

  console.time('read');

  fs.readFile('../testdata/cities1M.csv', {
    encoding: 'utf8'
  }, function(e1, data) {
    console.timeEnd('read');
    console.log('Read file', e1);
    data = "" + data;
    console.log('Length', data.length);
    console.time('parse');
    data = d3.csv.parseRows("" + data);
    console.timeEnd('parse');
    return console.log('Rows', data.length);
  });

}).call(this);
