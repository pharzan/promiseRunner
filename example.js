var PromiseRunner=require('./PromiseRunner.js');
// create two instances of PromiseRunner

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

p.run(f2)
    .then(p.run(function(){f1('hello');}))
    .then(p.run(f2))
    .then(p.run(f1));
p.add(f2)
    .add(f1,['farzan',3,1,1])
    .add(f2)
    .add(f1,['test',3,1]);
p.runQueue();

