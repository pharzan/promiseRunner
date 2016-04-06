var PromiseRunner=require('./PromiseRunner.js');
// create two instances of PromiseRunner

var chain=new PromiseRunner();
var secondChain=new PromiseRunner();

var f1=function one(resolve,i){
    console.log('one',i);
    resolve('done');
};

var f2=function two(resolve,i,j){
    
    console.log('two',i,j);
    setTimeout(function(){
	resolve('done');
    },500);
};
		 
var f3=function three(resolve){
    console.log('three');
    setTimeout(function(){
	resolve('done');
    },1000);
    
};

var f5=function five(resolve){
    console.log('------------');
    resolve('done');
};

var f6=function six(resolve){
    console.log('************');
    resolve('done');
};

var f7=function seven(resolve,i,j){
    
    console.log('############',i,j);
    setTimeout(function(){
	resolve('done');
    },500);
};
		 
//add the functions to the queue

chain.add(f1,[1]).add(f2,[2,3]).add(f3,[5,3,5,9]).add(f3).add(f2,[100,200]).add(f5);
secondChain.add(f5).add(f1).add(f2).add(f5);
chain.run();




secondChain.run();
chain.add(f1,[0]).add(f2).add(f1,['hello']).add(f5);
chain.run();
chain.add(f1,['bye']).add(f5);
chain.run();

//Todo: add the functionality so I can add functions using run command and run them in the added order

// chain.run(f7);
// chain.run(f6);
// chain.run(f7);
// chain.run(f6);
