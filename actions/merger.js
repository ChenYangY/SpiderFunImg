
var Image = require("../common/mergeImg");
var imageQueue = require("../common/queue").imageQueue;
var ActionModel = require("./ActionModel");
var spiderUtils = require("../spiderUtils");
var config = require("../config");
var path = require("path");


var process = require("process");
var fs = require("fs");


class Merger extends ActionModel{
    constructor() {
        super();
    }
    async thread() {
        var item = await imageQueue.pop();
        if(item.constructor === Error) {
            console.log(item);
            return ;
        }
        var ext = path.extname(item.url);
        console.log(item);
        var obj = {};
        
        obj.dst = config.output + item.type + "/" + item.number + "/";
        obj.src = obj.dst;
        obj.name = item.name;
        obj.comment = item.comment;
        obj.format = ext;

        
        
        
        var savePath = obj.dst + item.name + ext;
        
        // 创建目录
        spiderUtils.mkdir(obj.dst);
        var res = await spiderUtils.request.download(item.url,savePath);
        console.log(res);
        console.log("=========");
        console.log(obj);
        var image = new Image(obj);
        image.getSize().then(function(info){
            return image.genCommentImage();
        }).then(function(){
            return image.merge();
        }).then(function(){
            console.log("merge done");
            fs.unlinkSync(image.srcImgPath);
            fs.unlinkSync(image.commentImgPath);
            
        }).catch(function(err){
            console.log(err);
            imageQueue.push(item);
        })
    } 
}

module.exports = Merger;