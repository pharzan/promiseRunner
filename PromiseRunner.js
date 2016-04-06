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
    this.nextQueue=[];
    this.mainPromise;
    this.status='ready';
    this.runNext=false;
};

PromiseRunner.prototype.add=function(fn,args){
    if(this.status=='ready')
	this.queue.push(
	    {fn:fn,
	     args:args
	    });
    else
    {
	this.nextQueue.push(
	    {fn:fn,
	     args:args
	    });
	this.status='pending';
    }
    
    return this;
};

PromiseRunner.prototype.shift=function(fn,args){
    
    this.queue.shift();
    
    if(this.queue.length==1){
	
	this.queue=[];
	this.status='ready';
	if(this.nextQueue.length!==0){
	    this.queue=this.nextQueue;
	    this.nextQueue=[];
	    if(this.runNext){
		this.mainPromise=undefined;
		this.run();
		
	    }
	}else
	    this.status='ready';
    }
    
    return this;
};

PromiseRunner.prototype.run=function(){
    var self=this;
    if(arguments.length==0){
	if(this.status=='pending')
	    this.runNext=true;
	else{
	    this.status='pending';
	    this.queue.map(function(Q,i){
		
		if (typeof this.mainPromise === 'undefined'){    
		    this.mainPromise =  new Promise(function(resolve){
			
			if(typeof Q.args!=='undefined')
			    Q.args.unshift(resolve);
			else
			    Q.args=[resolve];
			
			var p=Q.fn.apply(this,Q.args);
			
			return p;
		    });
		}
		else
		{
		    this.mainPromise = this.mainPromise.then(function(){
			return new Promise(function(resolve){
			    
			    if(typeof Q.args!=='undefined')
				Q.args.unshift(resolve);
			    else
				Q.args=[resolve];
			    
	 		    var p= Q.fn.apply(this,Q.args);
			    
			    self.shift();
			    
			    return p;
			});
			
		    })
		}
		
	    });
	}
    }
}
module.exports = PromiseRunner;

