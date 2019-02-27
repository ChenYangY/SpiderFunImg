
var Queue = require("./Queue").Queue;



class SpiderQueueItem {
    constructor(obj) {
        this.url = obj.url || "";
        this.name = obj.name || "";
        this.number = obj.number || "";
        this.type = obj.type || "";
        this.weight = parseInt(obj.weight) || 0;
        this.galleryId = obj.galleryId || "";

    }
    toObject() {
        var props = ["url","name","galleryId","type","number"];
        var obj = {};
        var self = this;
        props.forEach(function(ele){
            obj[ele] = self[ele];
        });
        return obj;
    }
}

class SpiderQueue extends Queue {
    
    constructor(size) {
        super("spider_queue",size);
        //for test
        // this.count = 7;
        // this.cur = 6;
    }

    async push(obj) {
        var item;
        if(obj.constructor === SpiderQueueItem) {
            item = obj;
        }else if(typeof obj === "object") {
            item = new SpiderQueueItem(obj);
        }else{
            throw new Error("param error");
        }
        var result = await super.push(item);
        return result;  
    }

    /**
     * @returns {SpiderQueueItem}
     */
    async pop() {
        var obj = await super.pop();
        if(obj.constructor === Error) {
            return obj;
        }
        var item = new SpiderQueueItem(obj);
        return item;
    }
}


var spiderQueue = new SpiderQueue(100);
module.exports = {
    spiderQueue : spiderQueue,
    SpiderQueueItem : SpiderQueueItem
}