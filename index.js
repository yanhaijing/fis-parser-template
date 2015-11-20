/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var template = require('template_js');

module.exports = function(content, file, conf){
    template.config(conf);
    var global = conf.global || 'template';
    // 获取编译源码，并压缩成一行
    content = template.__compile(content).toString();

    var code = '"use strict";var __r__ = [];' + content + ';return __r__.join("")';

    // __##1##__ 单引号 js语句中的单引号
    // __##2##__ 转义单引号 html语句中的双引号
    // __##3##__ 双引号 js语句中的双引号
    // __##4##__ 转义双引号 html语句中的双引号
    code = code
        .replace(/\\\'/g, "##2##")
        .replace(/\\\"/g, '##4##')
        .replace(/\'/g, '##1##')
        .replace(/\"/g, '##3##')
        .replace(/\n/g, '');

    var Render = function (data) {
        'use strict';
        var keyArr = [];
        var valArr = [];
        data.__encodeHTML__ = window['__global__'].__encodeHTML;
        for(var key in data) {
            keyArr.push('"' + key + '"');
            valArr.push(data[key]);
        }
        var source = 'new Function(' + keyArr.join(',') + ', "__placeholder__")';
        var fn = eval(source);
        return fn.apply(null, valArr);
    }

    var source = Render.toString().replace('__placeholder__', code).replace('__global__', global);
    
    // 将引号替换回来，不要问我为什么知道，试出来的
    source = source
        .replace(/##1##/g, "\\'")
        .replace(/##3##/g, '\\\\"')
        .replace(/##2##/g, "\\\\\\'")
        .replace(/##4##/g, '\\\\\\\\\\\\\\"');

    return source;
};
