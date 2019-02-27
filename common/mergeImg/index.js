var gm = require("gm");
var EventEmitter = require("events");
// var srcImgPath = "./imgs/test.jpg";

var path = require("path");


// var commentImgPaht = "./imgs/commnet.jpg";
// var targetImgPath = "./imgs/target.jpg";


// var emitter = new EventEmitter();
// var image = gm(srcImgPath);


class Image extends EventEmitter  {
    constructor(obj) {
        super();
        if(!obj.src || !obj.dst || !obj.name) {
            throw new Error("param error");
        }
        this.format = obj.format || ".jpg";
        this.src = path.join(__dirname,"../../",obj.src);
        this.name = obj.name ;
        this.comment = obj.comment || "";
        this.dst = path.join(__dirname,"../../",obj.dst);
        this.fontSize = obj.fontSize || 32;
        this.srcImgPath = path.join(this.src,this.name + this.format);
        this.commentImgPath = path.join(this.dst,obj.name + "_comment"+this.format);
        this.targetImgPath = path.join(this.dst,obj.name + "_target"+this.format);
    
        this.image = gm(this.srcImgPath);
        this.cImg = null;
    }

    merge() {
        var self = this;
        return new Promise(function(resolve,reject){
            self.image.append(self.commentImgPath)
            .density(400,400)
            .write(self.targetImgPath,function(err){
                if(err){
                    return reject(err);
                }
                resolve();
            })
        });
    }

    // 获取图片的像素size
    getSize() {
        var self = this;
        return new Promise(function(resolve,reject){
            self.image.size(function(err,result){
                if(err) return reject(err);
                self.width = result.width;
                self.height = result.height;
                resolve(result);
            });
        }).catch(function(err){
            throw err;
        });
    }

    genCommentImage() {
        var self = this;
        return new Promise(function(resolve,reject){
            var cImg = gm(self.width, 100, "#fff");
            var pos_x = self.width/2 - self.comment.length*(self.fontSize/2);
            pos_x = pos_x>0?pos_x:0;
            cImg.font("/Library/Fonts/Songti.ttc", 10)
            .fill("#000")
            .drawText(pos_x, 70, self.comment)
            .quality(0)
            .density(400,400)
            .write(self.commentImgPath,function(err){
                if(err) {
                    return reject(err);
                };
                return resolve();
            });
        }).catch(function(err){
            throw err;
        })
    }
}

// gm('./imgs/test.jpg')
// .resize(240, 240)
// .noProfile()
// .write('./imgs/resize.png', function (err) {
//   if (!err) console.log('done');
// });

// 获取照片的类型
// gm(srcImgPath).format(function (err, format) {
//     console.log(format);
// })




// 给图片加标签？？
// gm(srcImgPath)
//   .label("%m:%f %wx%h")
//   .write(targetImgPath, function(err){
//     if (err) return console.dir(arguments)
//     console.log(this.outname + ' created  :: ' + arguments[3])
//   }
// ) 




// // 获取图片的像素size
// image.size(function(err,result){
//     console.log(result);
// });
// var text = "身份证";
// var fontSize = 32;









// image.resample(3000, 2000)
// .write(targetImgPath, function(err){
//     if (err) return console.dir(arguments)
//     console.log(this.outname + " created  ::  " + arguments[3])
// })




// emitter.emit("getSize");

/**
 *  gm convert: Unable to read font（path）
 *  * 安装 ghostscript
 *  * 调用font 方法引用 系统字体
 * 
 * */
// var tmpImg = gm(200,200,"#fff")
// // .fontSize(68)
// .font("/Library/Fonts/Songti.ttc", 12)
//   .fill("#000")
//   .drawText(20, 72, "你好")
//   .quality(0)
//   .density(400,400)
//   .write(targetImgPath, function(err){
//     if (err) return console.dir(arguments)
//     console.log(this.outname + ' created  :: ' + arguments[3])
//   }
// ) 






module.exports = Image;