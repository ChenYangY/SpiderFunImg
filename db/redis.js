var redis = require("redis");
var util = require("util");
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


class ReidsModel {
    constructor(config) {
        this.config = config;
    }

    connect() {
        var client = redis.createClient({
            host:this.config.host,
            port:this.config.port,
            retry_strategy: function (options) {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with
                    // a individual error
                    return new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    // with a individual error
                    return new Error('Retry time exhausted');
                }
                if (options.attempt > 10) {
                    // End reconnecting with built in error
                    return undefinred;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            }
        });
        
        client.on("ready",err => {
            console.log("link ready");
        })
        
        client.on("connect",() => {
            console.log("link connect");
        })
        
        client.on("error",err => {
            console.log("link error");
        })
        
        client.on("end",() => {
            console.log("link close");
        })
        
        client.on("warning",() => {
            console.log("link warning");
        })

        return client;
    }
}

// var client = redis.createClient({
//     host:config.host,
//     port:config.port,
//     retry_strategy: function (options) {
//         if (options.error && options.error.code === 'ECONNREFUSED') {
//             // End reconnecting on a specific error and flush all commands with
//             // a individual error
//             return new Error('The server refused the connection');
//         }
//         if (options.total_retry_time > 1000 * 60 * 60) {
//             // End reconnecting after a specific timeout and flush all commands
//             // with a individual error
//             return new Error('Retry time exhausted');
//         }
//         if (options.attempt > 10) {
//             // End reconnecting with built in error
//             return undefinred;
//         }
//         // reconnect after
//         return Math.min(options.attempt * 100, 3000);
//     }
// });



module.exports = ReidsModel;
