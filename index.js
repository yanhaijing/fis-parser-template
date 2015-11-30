/*
 * fis-parser-template
 * https://github.com/yanhaijing/fis-parser-template
 */

'use strict';

var template = require('template_js');

module.exports = function(content, file, conf){
    template.config(conf);
    var global = conf.global || 'template';
    var compress = conf.compress || false;

    // 获取编译源码
    var code = template.__compile(content).toString();

    code = '"use strict";var __code__ = "";' + code + ';return __code__';

    // __##1##__ 单引号 js语句中的单引号
    // __##2##__ 转义单引号 html语句中的双引号
    // __##3##__ 双引号 js语句中的双引号
    // __##4##__ 转义双引号 html语句中的双引号
    code = code
        .replace(/\\\'/g, "##2##")
        .replace(/\\\"/g, '##4##')
        .replace(/\'/g, '##1##')
        .replace(/\"/g, '##3##')
        // \r 针对windows换行符(cr lf) \n 针对unix换行符(lf)
        .replace(/[\n\r]/g, '');  

    var render = function render(data) {
        'use strict';
        var keyArr = [], valArr = [];
        data = data || {};
        data.__encodeHTML__ = window['__global__'].__encodeHTML;
        for(var key in data) {
            keyArr.push('"' + key + '"');
            valArr.push(data[key]);
        }
        var source = 'new Function(' + keyArr.join(',') + ', "__placeholder__")';
        try {
            var fn = eval(source);
            var html = fn.apply(null, valArr);
        } catch (e) {
            e.name = 'RenderError';
            e.tpl = '__tpl__';
            window['__global__'].__handelError(e);
            return 'template.js error';
        }
        __compress__
        return html;
    }

    var source = render.toString();

    source = source.replace('__compress__', compress ? 'html = window["__global__"].__compress(html);' : '');
    source = source.replace('__placeholder__', code);
    source = source.replace('__tpl__', file.id);
    source = source.replace(/__global__/g, global);
    
    // 将引号替换回来，不要问我为什么知道，试出来的
    source = source
        .replace(/##1##/g, "\\'")
        .replace(/##3##/g, '\\\\"')
        .replace(/##2##/g, "\\\\\\'")
        .replace(/##4##/g, '\\\\\\\\\\\\\\"');

    return source;
};
