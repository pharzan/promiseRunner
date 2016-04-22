# Promise Runner:
##### A simple promisifying utility to make functions run in an asynchronous fashion.
Simply use the run() method start the promise chain and put the followed functions in order inside a .then() or add all the functions to a queue and when ever you want the queue to be executed run the .runQueue() method.

#### **Usage:** 
After installing the package either globally or locally, import or require in the javascript source you need to use in and create an instence.
to install locally:
 ```sh
npm install promiserunner # installs locally
 ```
Or to install  globally make sure you have the correct privilidges,
 ```sh
npm install -g promiserunner # installs globally
 ```

 ```js
   var PromiseRunner = require('promiserunner');
   var chain=new PromiseRunner();
 ``` 
 There are two ways to 
 By using the _add_ method queue up the functions to be run asynchronously followed by the parameters the function accepts in an array in the correct order. 
```js
chain.add(f1,[1]).add(f2,[2,3]).add(f3,[5,3,5,9]).add(f3).add(f2,[100,200]).add(f5);
```
**Keep in mind to add chain.resolve() or chain.reject() to the place you want the function to continue to the next one in line.**
The body of function f1 would look something like this:
```js
var f1=function(input){
    setTimeout(function(){
     	console.log(1,input);
 	    chain.resolve(); //this is where we go to the next function
    },100);
};

```
when ever there is need for the queue to run use the runQueue() method to start the asynchronouse run process.
```js
chain.runQueue();
```
Another method to run wrap the functions in a promise would be to use the .run() method directly:

```js
p.run(f2)
 .then(p.run(function({
		 f1('hello');}))
 .then(p.run(f2))
 .then(p.run(f1));
```

### Functions wrapped in a promise:
 - somewhere in the body of the function a resolve('someMessage') must be provided so that the chain doesn't break and the promise and resolves to the next function. You may also put a reject and if the function fails call .reject().
```js
var i=1;
var f1=function one(resolve,i){ //resolve as the first parameter
	if(i==1){
		console.log('one',i);
	    chain.resolve('done'); //resolve here
    }else
    {
	    chain.reject('fail'); //rejects here
    }
};
```

### Version
0.1.2

### Todos
 - create tests
 - add stop and pause functionalities to queue runner
 - Add Code Comments
 
### Links
- [GitHub repository](https://github.com/pharzan/promiseRunner/): Linke to PromiseRunners GitHub Repository
- [GitHub homepage](http://pharzan.github.io/promiseRunner/): Link to PromiseRunners GitHub Home
- [Promises on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): Link to the Promise Explanation page on MDN
- [Can I Use](http://caniuse.com/#search=Promise): Which browsers support promises 
