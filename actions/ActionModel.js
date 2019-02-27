
var process = require("process");

class ActionModel {
    constructor(timeout) {
        this.timeout = timeout || 2000;
        this.threadId = "";
    }
    run() {
        var self = this;
        process.nextTick(function(){
            self.threadId = setInterval(function(){
                self.thread();
            },self.timeout);
        })
    }

    thread() {

    }
}


module.exports = ActionModel;