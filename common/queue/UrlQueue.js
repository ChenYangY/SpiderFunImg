var Queue = require("./Queue").Queue;
var config = require("../../config");
var spiderUtils = require("../../spiderUtils");



class UrlQueueItem {
    constructor(obj) {
        if(!obj.url) throw new Error("param error")
        this.url  = obj.url || "";
        this.origin = obj.origin || "";
        this.offset = parseInt(obj.offset) || 0;
        this.weight = parseInt(obj.weight) || 0;
        this.type = obj.type || "page";
    }

    toObject() {
        let obj = {};
        var field_name = ["url","weight","offset","origin","type"];
        var self = this;
        field_name.forEach(function(ele){
            obj[ele] = self[ele];
        });
        return obj;
    }
}

class UrlQueue extends Queue {
    constructor(queueKey,size) {
        super(queueKey,size);
    }

    /**
     * 
     * @param {UrlQueueItem}  obj 
     * @returns {Boolean}
     */
    async push(obj) {
        var item;
        if(obj.constructor !== UrlQueueItem) {
            item = new UrlQueueItem(obj);
        }else{
            item = obj;
        }
        var result = await super.push(item);
        return result;
    }
    /**
     * @returns {UrlQueueItem} 
     */
    async pop() {
        var obj = await super.pop();
        if(obj.constructor === Error) {
            return obj;
        }
        var item = new UrlQueueItem(obj);
        return item;
    }
}

var queueInst = new UrlQueue("url_queue",config.queueSize);


module.exports = {
    queueInst       : queueInst,
    UrlQueueItem    : UrlQueueItem
}