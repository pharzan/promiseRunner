/*
usage: 
 first import or require in javascript source you need to use in:
   var PromiseRunner = require('./PromiseRunner');
 next create an instance:
   var chain=new PrimiseRunner();
 now using the add method queue up the functions to be run asynchronously and the parameters the function accepts as an array:
   chain.add(f1,[1]).add(f2,[2,3]).add(f3,[5,3,5,9]).add(f3).add(f2,[100,200]).add(f5);
 when ever the run() method is called the queue starts running

 *** in the functions you add to the queue the first argument must be resolve and in the function
 *** body you should call resolve('someMessage') so that the chain doesn't break and the promise
 *** resolves to the next function.

 */

function PromiseRunner(){
    if (!(this instanceof PromiseRunner)) {
    return new PromiseRunner();
  }
    this.queue=[];
};

PromiseRunner.prototype.run=function(){
    
    var args=arguments[1];
    var fn;
    var self=this;
    if(typeof arguments[0]=='function'){
	fn=arguments[0];
    }
	
    if (typeof self.mainPromise === 'undefined'){    
	return self.mainPromise =  new Promise(function(resolve,reject){
	    self.resolve=resolve;
	    return fn.apply(self,args);
	});
    }
    else
    {
	return self.mainPromise = self.mainPromise.then(
	    function(){return new Promise(function(resolve,reject){
			self.resolve=resolve;
		return fn.apply(self,args);
	    });	    
	});
    }
};

PromiseRunner.prototype.add=function(){
    var self=this;
    var fn=arguments[0];
    var args=arguments[1];
    this.queue.push({fn:fn,
		     args:args});
    return this;
};

PromiseRunner.prototype.runQueue=function(){
    var self=this;
    this.queue.map(function(Q){
	self.run(Q.fn,Q.args);
    });
};

var p=new PromiseRunner();

var f1=function(input){
    setTimeout(function(){
	console.log(1,input);
	p.resolve();
    },100);
};

var f2=function(){
    setTimeout(function(){
	console.log(2);
	p.resolve();
    },500);
};

p.run(f2).then(p.run(function(){f1('hello');})).then(p.run(f2)).then(p.run(f1));
p.add(f2).add(f1,['farzan',3,1,1]).add(f2).add(f1,['test',3,1]);
p.runQueue();
//console.log(p.queue);
module.exports = PromiseRunner;

