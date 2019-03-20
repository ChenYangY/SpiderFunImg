var config = require("../config");

var spiderUtils = require("../spiderUtils");
var page = spiderUtils.page;
var request = spiderUtils.request;


var ActionModel = require("./ActionModel");

var urlQueue = require("../common/queue").urlQueue;
var spiderQueue = require("../common/queue").spiderQueue;

var path = require("path");

var cheerio = require("cheerio");
var fs = require("fs");


class Invertor extends ActionModel {
    constructor(timeout) {
        super(timeout);
    }

    async thread() {
        var  item = await urlQueue.pop();
        if(item === null || item.constructor === Error || !item) {
            return;
        }

        if(item.weight) {
            await spiderUtils.sleep(item.weight * 1000);
        }
        
        var content, $ ,link_dom, list ;
        console.log(item.url);        
        if(item.type === "page") {
            content = await page.getContent(item.url);
            // var ms = new Date().getTime();
            // fs.writeFileSync("./test/a_"+ms+".txt",content);
            if(content.constructor === Error || content.length<= 0){
                item.weight += 2;
                urlQueue.push(item);
                return ;
            }
            $ = cheerio.load(content);
            list = $("#pic-list li");
        }else if(item.type === "request") {
            content = await request.get(item.url,{});
            try{
                var resObj = JSON.parse(content);
            }catch(e){
                return ;
            }
            console.log("more:"+ resObj.more);
            if(!resObj.html || !resObj.more || !resObj.enabled) return ;
            $ = cheerio.load(resObj.html);
            list = $("li");
        }
        list.each(function(ele){
            link_dom = $(this).children("em").children("a");
            if(link_dom.length <= 0) return ;
            let desc = link_dom.text();
            let regNum = /(?<=第)\d+(?=[期|弹])/;
            let regType = /.*(?=第)/;
            let match_res = desc.match(regNum);
            let number = "",type = "";
            // console.log(desc);
            if(match_res) {
                number = match_res[0];
            }
            let match_type_res = desc.match(regType);
            if(match_type_res) {
                type = match_type_res[0];
            }
            // console.log(type);
            let url = link_dom.attr("href");
            // console.log(url);

            let urlInfo = path.parse(url);
            let newItem = {
                galleryId : urlInfo.name,
                name : desc,
                url :  url,
                type : type,
                number :  number
            }
            spiderQueue.push(newItem);
        })
        // console.log(item.url);
        // console.log(count);
        
        let nextItem = {
            url :  item.origin + "?offset=" + (item.offset + 30)+"&order=created&math="+Math.random(),
            type : "request",
            origin : item.origin,
            weight : item.weight + 2,
            offset : item.offset + 30
        }
        urlQueue.push(nextItem);
    }
}


module.exports = Invertor;



