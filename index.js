/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var template = require('template_js');

module.exports = function(content, file, conf){
    template.config(conf);

    content = template.compile(content).toString().replace(/^function anonymous/, 'function');

    var code = [
        'function (data) {',
        template.__encodeHTML.toString(),
        'return (',
        content,
        '(data, encodeHTML));',
        '}'
    ].join('');
    
    return code;
};