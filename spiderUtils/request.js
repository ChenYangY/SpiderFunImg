var request = require("request");
var fs = require("fs");


class RequestOpt {
    constructor() {
        this.headers = {};
    }
}



/**
 *  @param {String} url 
 *  @param {RequestOpt} options
 * 
 *  */
function get(url,options) {
    return new Promise(function(resolve,reject){
        request({
            url: url,
            method:"get",
            headers : options.headers || {}
        },function(err,res,body){
            if(err) throw err;
            resolve(body);
        })
    })
}

/**
 * 
 * @param {String} url 
 * @param {Object} data 
 * @param {RequestOpt} options 
 */
function post(url,data,options) {
    return new Promise(function(resolve,reject){
        request({
            url:url,
            method:"post",
            headers: options.headers || {},
            formData: data || {}
        },function(err,res,body){
            if(err) throw err;
            resolve(body);
        })
    })
}

function download(url,savePath) {
    return new Promise(function(resolve,reject){
        var writer = fs.createWriteStream(savePath);
        writer.on("finish",function(err){
            resolve();
        });
        writer.on("error",function(err){
            reject(err);
        })
        request.get(url).pipe(writer);
    })
}


module.exports = {
    get     :   get,
    post    :   post,
    download:   download
}


