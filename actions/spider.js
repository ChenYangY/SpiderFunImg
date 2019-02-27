var request = require("request");
var phantom = require("phantom");

var spiderQueue = require("../common/queue").spiderQueue;
var spiderUtils = require("../spiderUtils");
var request = require("../spiderUtils").request;
var ActionModel = require("./ActionModel");
var imageQueue = require("../common/queue").imageQueue;
var ImageQueueItem = require("../common/queue").ImageQueueItem;


class Spider extends ActionModel {
    constructor(timeout) {
        super(timeout);
    }

    async thread() {
        var item = await spiderQueue.pop();
        if(item.constructor === Error || !item ){
            return ;
        }
        if(item.weight) {
            await spiderUtils.sleep(item.weight * 1000);
        }

        var url = "http://tu.duowan.com/index.php?r=show/getByGallery/&gid="+item.galleryId+"&_="+(new Date().getTime());
        
        var response = await request.get(url,{});
        
        var resObj ;
        try{
            resObj = JSON.parse(response);
        }catch(e){
            item.weight += 2;
            spiderQueue.push(item);
            return ;
        }

        var pic_infos = resObj.picInfo || [];
        var item_obj,item,push_res;
        pic_infos.forEach(async function(ele){
            item_obj = {
                url : ele.url || ele.sourcce,
                name : ele.pic_id,
                comment : ele.add_intro || "",
                weight : 0,
                number : item.number,
                galleryId : item.galleryId,
                type: item.type   
            }
            console.log(item_obj);
            imageQueue.push(item_obj);
        });
    }
    
}


module.exports = Spider;
