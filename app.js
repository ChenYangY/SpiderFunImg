// var mqueue = require("./common/queue");
// var SpiderQueue = mqueue.SpiderQueue;
// var QueueItem = mqueue.QueueItem;

// var item  =  new QueueItem({
//     id : "123"
// });

// var spiderQueue = new SpiderQueue(10);

// spiderQueue.push(item).then(function(replies){
//     spiderQueue.pop().then(function(item){
//         console.log(item);
//     }).catch(function(err){
//         console.log(err);
//     })
// }).catch(function(err){
//     console.log(err);
// });

var fs = require("fs");

var  mactions = require("./actions");
var request = require("./spiderUtils").request;

var urlQueue = require("./common/queue").urlQueue;
var UrlQueueItem = require("./common/queue").UrlQueueItem;
var spiderQueue = require("./common/queue").spiderQueue;
var SpiderQueueItem = require("./common/queue").SpiderQueueItem;

var spiderUtils = require("./spiderUtils");




var inventor = new mactions.Inventor(1000)
var spider = new mactions.Spider(2000);
var merger = new mactions.Merger(5000);


// request.get(config.url,{
//     headers : {
//         "DNT" : "1",
//         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
//     }
// }).then(function(body){
//     var $ = cheerio.load(body);
//     var aList = $("#subnav_pk a");
//     var text,item;
//     aList.each(function(i,ele){
//         text = $(this).text();
//         // console.log(text);
//         //TODO: add all link 
//         if(text.search(/今日囧图|吐槽囧图/) < 0) {
//             return ;
//         }
//         item = new UrlQueueItem({
//             url: ele.attribs.href,
//             origin:ele.attribs.href,
//             offset:0,
//             type:"page",
//             weight:0
//         }); 
//         urlQueue.push(item);
//     });
// }).catch(function(err){
//     console.log(err);
// });





// setTimeout(function(){
//     urlQueue.pop().then(function(res){
//         console.log(res); 
//         return urlQueue.pop();
//     }).then(function(res){
//         console.log(res);
//         return urlQueue.pop();
//     }).then(function(res){
//         console.log(res);
//     }).catch(function(err){
//         console.log(err)
//     })
// },5000);







var item = new SpiderQueueItem({
    galleryId : "138626",
    name : "",
    url : "http://tu.duowan.com/gallery/138626.html",
    type : "今日囧图",
    number : 2635
});

spiderQueue.push(item);



// inventor.run();

spider.run();
merger.run();



// spiderUtils.request.download("http://s1.dwstatic.com/group1/M00/2A/16/e0fbe04228294a26332a017aca4faac7.jpg","./imgs/test_download.jpg").then(function(){
//     console.log("done");
// })


// spiderUtils.page.getContent("http://www.runoob.com/mysql/mysql-index.html").then(function(content){
//     var res = fs.writeFileSync("./test/test.html",content);
//     console.log(res);
//     console.log("done");
// });








