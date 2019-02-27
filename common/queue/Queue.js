
var EventEmitter = require("events");

var redisModel  = require("../../db/redis");

var config = require("../../config");

var spiderUtils = require("../../spiderUtils");

var E_QueueStatus = {
    FREE:1,
    PUSH:2,
    POP:3
}

class Queue extends EventEmitter {
    constructor(queueKey,maxSize) {
        super();
        this.count = 0;
        this.cur = 0;
        this.maxSize = maxSize || 0; 
        this.queueKey =  queueKey   || this.randKey();
        this.status = E_QueueStatus.FREE;
        // 尝试次数
        this.popCount = 0;
        this.pushCount = 0;
        console.log(this.queueKey);
        this.redisDB = new redisModel(config.redis).connect();
    }

    randKey() {
        var count = 16;
        var key = "",temp, ch;
        while(count--) {
            temp = Math.round(Math.random()*1000)%36;
            if(temp < 10) {
                temp += 48;
            }else{
                temp += 87  ;
            }
            ch = String.fromCharCode(temp);
            key += ch;
        }

        return key;
    }

    async push ( obj ) {
        var self = this;
        var execFlag = false;
        while(this.status !== E_QueueStatus.FREE) {
            this.pushCount ++;
            await spiderUtils.sleep(500*this.pushCount);
        }
        if(this.pushCount > 0){
            this.pushCount --;
        }
        if((self.maxSize - 1) < self.count) {
            return execFlag;
        }
        this.status = E_QueueStatus.PUSH;
        let item_obj = obj.toObject();
        var key = self.queueKey+"_"+self.count;
        var res = await this.redisDB.multi()
            .hmset(key,item_obj)
            .execAsync();
        if(res.constructor !== Array) {
            return execFlag;
        }
        
        if(res[0].toString() === "OK") {
            execFlag = true;
        }
        this.count ++;
        this.status = E_QueueStatus.FREE;  
        console.log("======push free====="); 
        return execFlag;
    }

    async pop() {
        var self = this;

        while(this.status !== E_QueueStatus.FREE) {
            this.popCount ++;
            await spiderUtils.sleep(500*this.popCount);
        }
        if(this.popCount>0){
            this.popCount --;
        }
        

        if(self.cur === self.count) {
            // this.emit("error",new Error("queue empty"));
            return new Error("queue empty");
        }
        this.status = E_QueueStatus.POP;
        let key = self.queueKey+"_"+self.cur;

        var res = await self.redisDB
        .multi()
        .hgetall(key)
        .del(key)
        .execAsync();
        this.cur ++;
        this.status = E_QueueStatus.FREE;
        console.log("========pop free ==============");
        if(res.constructor !== Array) {
            return new Error("error");
        }
        if(res[0] === null) {
            return new Error("noExist");
        }
        return res[0];
    }

    getSize() {
        return this.count - this.cur;
    }
}

module.exports = {
    Queue     :   Queue
}