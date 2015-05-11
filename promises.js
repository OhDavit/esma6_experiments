var http = require('http');

http.createServer(function (req, res) {
  console.log(req.url);
  
  if(req.url == '/promise'){
  	console.log('promise');
  	testPromise1();
  }
    res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Hello World\n');
}).listen(8000, '127.0.0.1');


var promiseCount = 0;
function testPromise1() {
  var thisPromiseCount = ++promiseCount;

  // We make a new promise: we promise the string 'result' (after waiting 3s)
  var p1 = new Promise(
    // The resolver function is called with the ability to resolve or 
    // reject the promise
    function(resolve, reject) {     
      console.log('Started');  
      // This only is an example to create asynchronism
      setTimeout(
        function() {
          // We fulfill the promise !
          resolve(thisPromiseCount);
        }, Math.random() * 2000 + 1000);
    });

  // We define what to do when the promise is fulfilled
  p1.then(
    // Just log the message and a value
    function(val) {
      console.log("Promise fulfilled. Async code terminated");
    });

}