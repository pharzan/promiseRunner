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

