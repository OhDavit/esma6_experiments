var http = require('http');

http.createServer(function (req, res) {
  console.log(req.url);
  
  if(req.url == '/promise'){
  	console.log('promise');
  	testPromise1();
  }else if(req.url == '/combinedpromise') {
  	combinedPromises();
  } else if(req.url == '/severalPromises') {
  	severalPromises();
  }

    res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Hello World\n');
}).listen(8000, '127.0.0.1');


var promiseCount = 0;
function testPromise1() {
  var thisPromiseCount;
  var timeout = Math.random() * 2000 + 1000;
  var func = function(resolve, reject) {
  	setTimeout(function() {
  	   thisPromiseCount = ++promiseCount;
       resolve(thisPromiseCount);
   }, timeout);

  	setTimeout(function() {
  	   thisPromiseCount = ++promiseCount;
       reject(thisPromiseCount);
   }, timeout + 2000);
  }
  // We make a new promise: we promise the string 'result' (after waiting 3s)
  var p1 = new Promise(func).then(
    // Just log the message and a value
    function(val) {
      console.log(val);
    });
}


// With this example checking how it works
function severalPromises() {
	var promise1 = new Promise(function(resolve, reject) {
		console.log('promise 1');
		setTimeout(function(){
			setTimeout(function(){
				console.log('third timeout');
				resolve(32);
			},2000)
			console.log('first timeout');
		}, 2000)
	});

	var promise2 = new Promise(function(resolve, reject) {
		console.log('promise 2');
		setTimeout(function(){
				console.log('second timeout');
				resolve(3);
			},2001)
		
	});

	Promise.all([promise1, promise2]).then(function(value) {
    	console.log(value);
    });
}

function combinedPromises() {
	var promise1, promise2;

	promise1 = new Promise(function(resolve, reject) {
    	setTimeout(resolve.bind(this, 'Value 1'), 50);
    });

	promise2 = new Promise(function(resolve, reject) {
    	setTimeout(reject.bind(this, 'Value 2'), 3000);
    });
    // .then is called only when all promises complete with success. If one of existing promises
    // fails then only catch is  called
    Promise.all([promise1, promise2])
    .then(function(value) {
        // This is really cool, that it keeps the order!
        var value1 = value[0], value2 = value[1];
        console.log('Success', value1, value2);
    })
    .catch(function(reason) {
        // Either of both promises has failed!
        console.log('Fail', reason);
    });

}