(function() {
  var dsv, fs;

  dsv = require('../lib/dsv');

  fs = require('fs');

  console.log(typeof dsv);

  console.log(dsv);

  console.time('read');

  fs.readFile('../testdata/cities1M.csv', {
    encoding: 'utf8'
  }, function(e1, data) {
    console.timeEnd('read');
    console.log('Read file', e1);
    data = "" + data;
    console.log('Length', data.length);
    console.time('parse');
    data = dsv({
      text: data,
      separator: ','
    });
    console.timeEnd('parse');
    return console.log('Rows', data.length);
  });

}).call(this);
