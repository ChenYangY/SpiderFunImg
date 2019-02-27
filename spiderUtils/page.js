var phantom = require("phantom");
var config = require("../config");


async function getContent(url){
    var g_inst,g_page;
    var content = await phantom.create([],{logLevel:"error"}).then(function(inst){
        g_inst = inst;
        return inst.createPage();
    }).then(function(pageInst){
        g_page = pageInst;
        return pageInst.setting("javascriptEnabled");
    }).then(function(){
        return g_page.setting("userAgent","Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36");
    }).then(function(){
        return g_page.property('viewportSize', { width: 1024, height: 600 });
    }).then(function(val){
        return g_page.open(url);
    }).then(function(status){
        // console.log(html);
        var content = "";
        if(status !== "success") {
            throw new Error(status);
        }
        return g_page.property("content");
    });
    await g_inst.exit();
    return content;
}


module.exports = {
    getContent  :   getContent
};


