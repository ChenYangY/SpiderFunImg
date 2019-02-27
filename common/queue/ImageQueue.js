
var Queue = require("./Queue").Queue;



class ImageQueueItem {
    constructor(obj) {
        this.name = obj.name || "";
        this.url = obj.url || "";
        this.comment = obj.comment || "";
        this.weight = obj.weight || 0;
        this.type = obj.type || "";
        this.galleryId = obj.galleryId || "";
        this.number = parseInt(obj.number) || 0;
    }

    toObject() {
        let obj = {};
        var field_name = ["name","url","comment","weight","type","galleryId","number"];
        var self = this;
        field_name.forEach(function(ele){
            obj[ele] = self[ele];
        });
        return obj;
    }
}

class ImageQueue extends Queue {
    constructor(size) {
        super("image_queue",size);
        // for test
        // this.count =  23;
        // this.cur = 22;
    }
    
    /**
     * 
     * @param {ImageQueueItem}  obj 
     * @returns {Boolean}
     */
    async push(obj) {
        var item;
        if(obj.constructor !== ImageQueueItem) {
            item = new ImageQueueItem(obj);
        }else{
            item = obj;
        }
        var result = await super.push(item);
        return result;
    }
    /**
     * @returns {ImageQueueItem} 
     */
    async pop() {
        var obj = await super.pop();
        if(obj.constructor === Error) {
            return obj;
        }
        var item = new ImageQueueItem(obj);
        return item;
    }
}
var queueInst = new ImageQueue("image_queue",1000);

module.exports = {
    queueInst       : queueInst,
    ImageQueueItem  : ImageQueueItem
} 

