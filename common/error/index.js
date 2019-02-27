
var process = require("process");


process.on("error",function(err) {
    console.log(err);
});





module.exports = {
    
    err : {
        push_failed :   "err.push.failed",
        get_failed  :   "err.get.failed"    
    },
    warn : {

    }
}