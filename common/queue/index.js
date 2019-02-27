var urlQueue = require("./UrlQueue").queueInst;
var imageQueue = require("./ImageQueue").queueInst;
var ImageQueueItem = require("./ImageQueue").ImageQueueItem;
var UrlQueueItem = require("./UrlQueue").UrlQueueItem;
var QueueItem = require("./Queue").QueueItem;
var spiderQueue = require("./SpiderQueue").spiderQueue;
var SpiderQueueItem = require("./SpiderQueue").SpiderQueueItem;


module.exports = {
    QueueItem       : QueueItem,  
    urlQueue        : urlQueue,
    UrlQueueItem    : UrlQueueItem, 
    imageQueue      : imageQueue,
    ImageQueueItem  : ImageQueueItem,
    SpiderQueueItem : SpiderQueueItem,
    spiderQueue     : spiderQueue
}