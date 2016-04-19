/*
usage: promise runner
a promise wrapper for asynchronous running of functions
in javascript.
 */

function PromiseRunner() {
    if (!(this instanceof PromiseRunner)) {
        return new PromiseRunner();
    }
    this.queue = [];
};

PromiseRunner.prototype.run = function() {

    var args = arguments[1];
    var fn;
    var self = this;
    if (typeof arguments[0] == 'function') {
        fn = arguments[0];
    }

    if (typeof self.mainPromise === 'undefined') {
        return self.mainPromise = new Promise(function(resolve, reject) {
            self.resolve = resolve;
            return fn.apply(self, args);
        });
    } else {
        return self.mainPromise = self.mainPromise.then(
            function() {
                return new Promise(function(resolve, reject) {
                    self.resolve = resolve;
                    return fn.apply(self, args);
                });
            });
    }
};

PromiseRunner.prototype.add = function() {
    var self = this;
    var fn = arguments[0];
    var args = arguments[1];
    this.queue.push({
        fn: fn,
        args: args
    });
    return this;
};

PromiseRunner.prototype.runQueue = function() {
    var self = this;
    this.queue.map(function(Q) {
        self.run(Q.fn, Q.args);
    });
};

module.exports = PromiseRunner;
