# fis-parser-template [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/fis-parser-template/blob/master/MIT-LICENSE.txt)

[template.js](https://github.com/yanhaijing/template.js)的fis编译插件——一款javascript模板引擎。

## 安装

	$ npm install -g fis-parser-template

## 配置
配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中global参数代表template.js的全局名称。

fis2

    //设置编译器
    fis.config.merge({
        modules: {
            parser: {
                tmpl: 'template' // tmpl后缀的使用fis-parser-template处理
            }
        }
    });
	
	//自定义参数
    fis.config.merge({
        settings: {
            parser: {
                template: {
                    sTag: '<%',
                    eTag: '%>',
                    global: 'template'
                }
            }
        }
    });

fis3

	fis.match('**.tmpl', {
	    parser: fis.plugin('template', {
	        sTag: '<#',
	        eTag: '#>',
	        global: 'template'
	    }),
	    isJsLike: true,
	    release : false
	});
## 报告问题

- [Issues](https://github.com/yanhaijing/fis-parser-template/issues "report question")

## 作者

**yanhaijing**

- [Weibo](http://weibo.com/yanhaijing1234 "yanhaijing's Weibo")
- [Email](mailto:yanhaijing@yeah.net "yanhaijing's Email")
- [Blog](http://yanhaijing.com "yanhaijing's Blog")

## 更新日志

[更新日志](CHANGELOG.md)

## 相关链接

- [fis](http://fis.baidu.com/)
