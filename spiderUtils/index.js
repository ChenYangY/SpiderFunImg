var page = require("./page");
var request = require("./request");
var fs = require("fs");
var path = require("path");

function sleep(ms) {
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },ms)
    })
}

/**
 * 
 * @param {String} dstPath 
 */
function mkdir(dstPath) {
    var normalPath = path.normalize(dstPath);
    if(!normalPath){
        return false;
    }
    var final = "";
    var pathDetail = path.parse(normalPath);
    if(pathDetail.ext) {
        final = path.join(pathDetail.dir,"./");
    }else{
        final = path.join(pathDetail.dir,pathDetail.name,"./");
    }
    if(!path.isAbsolute(final)){
        final = path.join(__dirname,"..",final);
    }
    var parts = [];
    
    var item , existDir = tmpFinal = final;
    
    while(1) {
        if(fs.existsSync(existDir)) {
            break;
        }
        existDir = path.join(existDir,"..","./");
        item = "./" + tmpFinal.replace(existDir,"") ;
        tmpFinal = existDir;
        parts.unshift(item);
    }

    if(existDir === final) {
        return true;
    }
    var count = 0, len = parts.length;
    var tmpDir = existDir;
    while(count < len){
        tmpDir = path.join(tmpDir,parts[count]);
        fs.mkdirSync(tmpDir);
        count ++;
    }
    return true; 
}



module.exports = {
    sleep   : sleep,
    page    : page,
    request : request,
    mkdir   : mkdir
}