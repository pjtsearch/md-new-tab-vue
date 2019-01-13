var watch = require('node-watch');
 
watch('./src', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
  var exec = require('child_process').exec

  var child = exec('yarn build:dev',
  function(err, stdout, stderr) {
      if (err) console.log(err,stderr,stdout);
      else console.log(stdout);
  });
}); 
