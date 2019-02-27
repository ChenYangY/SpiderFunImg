

var log4js = require("log4js");
var config = require("../../config");

log4js.configure({
    appenders : {
        "out" : {
            type : "stdout"
        },
        "err": {
            type : "stderr"
        },
        "file": {
            type : "file",
            filename : "log-run.log",
            maxLogSize : 40960,
            backups:10
        }
    },
    categories : {
        default : {
            appenders : ["out","err"],
            level : "INFO" 
        },
        "product" : {
            appenders : ["file"],
            level : "INFO"
        }
    }
})


var logger;

if(config.workModel === "product") {
    logger = log4js.getLogger();
}else{
    logger = log4js.getLogger("product");
}

module.exports = logger;