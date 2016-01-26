'use strict';

var gulp = require('gulp');
var fs = require('fs');

var paths = gulp.paths;
var del = require('del');
var concat = require('gulp-concat');

gulp.task('injectBase', function(){
    var fileList = fs.readdirSync(paths.src + '/libs/base');
    var content = '';
    for(var i=0; i<fileList.length;i++){
        var temp = fs.readFileSync(paths.src + '/libs/base/' + fileList[i]).toString();
        content +=  temp;
    }

    var template = fs.readFileSync(paths.dist + '/Kii-PortalExt-SDK.js').toString();

    var result = replaceTemplate("//<!-- base:js --><!-- injection:end -->", content, template).produce();
    var fd = fs.openSync(paths.dist + '/Kii-PortalExt-SDK.js', 'w');

    fs.writeSync(fd, result, 0, result.length);
    fs.closeSync(fd);
    console.log('Inject Base');
});

gulp.task('injectHelper', function(){
    var fileList = fs.readdirSync(paths.src + '/libs/helper');
    var content = '';
    for(var i=0; i<fileList.length;i++){
        var temp = fs.readFileSync(paths.src + '/libs/helper/' + fileList[i]).toString();
        content +=  temp;
    }

    var template = fs.readFileSync(paths.src + '/Kii-PortalExt-SDK.js').toString();

    var result = replaceTemplate("//<!-- helper:js --><!-- injection:end -->", content, template).produce();
    var fd = fs.openSync(paths.dist + '/Kii-PortalExt-SDK.js', 'w');

    fs.writeSync(fd, result, 0, result.length);
    fs.closeSync(fd);
    console.log('Inject Helper');
});

gulp.task('injectComponents', function(){
    console.log('Inject Components');
    var fileList = fs.readdirSync(paths.src + '/libs');
    var content = '';
    for(var i=0; i<fileList.length;i++){
        if(fileList[i].indexOf('.js')<0)continue;
        var temp = fs.readFileSync(paths.src + '/libs/' + fileList[i]).toString();
        content +=  temp;
    }

    console.log('read temp file succeeded!');
    var template = fs.readFileSync(paths.dist + '/Kii-PortalExt-SDK.js').toString();

    var result = replaceTemplate("//<!-- components:js --><!-- injection:end -->", content, template).produce();
    var fd = fs.openSync(paths.dist + '/Kii-PortalExt-SDK.js', 'w');

    fs.writeSync(fd, result, 0, result.length);
    fs.closeSync(fd);
});

gulp.task('clean', function (done) {
    del([paths.dist + '/*'], done);
});

gulp.task('libs:watch', function(){
    gulp.watch('dev/**/*', ['injectHelper', 'injectBase', 'injectComponents']);
});

gulp.task('build', ['injectHelper', 'injectBase','injectComponents', 'libs:watch'], function(){

});

function replaceTemplate(placeHolder, replaceWithStr, str){
    var find = placeHolder;
    //find = placeHolder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var result = str.replace(new RegExp(find, 'g'), replaceWithStr);

    return {
        replace: function(placeHolder, replaceWithStr){
            return replaceTemplate(placeHolder,replaceWithStr,result);
        },
        produce: function(){
            return result;
        }
    }
}