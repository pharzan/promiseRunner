# Promise Runner:
##### A simple promisifying utility to make functions run in an asynchronous fashion.

#### usage: 
 First import or require in the javascript source you need to use in and create an instence.
 ```js
   var PromiseRunner = require('./PromiseRunner');
   var chain=new PrimiseRunner();
 ``` 
 By using the _add_ method queue up the functions to be run asynchronously followed by the parameters the function accepts in an array in the correct order. 
```js
chain.add(f1,[1]).add(f2,[2,3]).add(f3,[5,3,5,9]).add(f3).add(f2,[100,200]).add(f5);
```
 when ever the run() method is called the queue starts running
```js
chain.run();
```
### Functions added to the run queue:
 - in the functions you add to the queue the first argument must be resolve as the parameter the function accepts
 - somewhere in the body of the function a resolve('someMessage') must be provided so that the chain doesn't break and the promise and resolves to the next function.
 ```js
var f1=function one(resolve,i){ //resolve as the first parameter
    console.log('one',i);
    resolve('done'); //resolve here
};

var f2=function two(resolve,i,j){
// somethings are done
    console.log('two',i,j); //parameters the function accepts
    setTimeout(function(){
	    resolve('done'); //resolve here to go to the next function
    },500);
};
		 
var f3=function three(resolve){
    console.log('three');
    setTimeout(function(){
	    resolve('done');
    },1000);

```

### Version
0.0.1

### Todos
 - Make run method accept functions and run them in a continuous manner
 - Test
 - Add Code Comments
 
### Links
- [GitHub repository](https://github.com/pharzan/promiseRunner/): Linke to PromiseRunners GitHub Repository
- [GitHub homepage](http://pharzan.github.io/promiseRunner/): Link to PromiseRunners GitHub Home
- [Promises on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): Link to the Promise Explanation page on MDN
- [Can I Use](http://caniuse.com/#search=Promise): Which browsers support promises 
