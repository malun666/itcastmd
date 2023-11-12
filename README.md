itcastmd 
=========

itcastmd is an npm tool that converts Markdown files into an HTML website.

[中文文档](./CHINESE.md)

## Preview 

![](https://github.com/i5ting/i5ting_ztree_toc/blob/master/demo/3.png)

## Install 

	npm install -g itcastmd
	
## Usage

```shell
itcastmd -f sample.md -o
```

This version of the command is relatively simple, with only one -f parameter. If not specified, it defaults to using README.md.

```
  Options:
    -h, --help             output usage information
    -V, --version          output the version number
    -f, --file [filename]  default is README.md 
		-o, --open             open in browser
    -v, --verbose          print the logs
```


	
## Api Usages

Example:

```
var is_open = true;
var markd_config = {
	debug: false
}
var pwd = process.cwd()  

var source_file_name = pwd + '/' + source_file
var file_name = source_file_name.split('/').pop();;
var _file_name = file_name.split('.')[0];

var dest_file_path = pwd + '/preview/' + _file_name + '.html';

console.log('pwd=' + pwd);
console.log('source_file_name=' + source_file_name);
console.log('dest_file_path=' + dest_file_path);

require('../index')(pwd, source_file_name, dest_file_path, is_open, markd_config);

```

Parameter Descriptions:

- pwd: The location where the preview is stored.
- source_file: The Markdown file to be compiled.
- dest_file_path: The complete path and filename for the generated HTML.
- is_open: Indicates whether to open the HTML in a browser after compilation.
- markd_config: Compilation options for Markdown (refer to https://github.com/chjj/marked for specifics).

## Basic

current path

	var pwd = process.cwd()


file path 

	__dirname
	
	
use shelljs judge dir is

	if (test('-d', previewPath)) { 
		/* do something with dir */ 
		mkdir('-p', previewPath);
	};
	
http://documentup.com/arturadib/shelljs

- '-b', 'path': true if path is a block device
- '-c', 'path': true if path is a character device
- '-d', 'path': true if path is a directory
- '-e', 'path': true if path exists
- '-f', 'path': true if path is a regular file
- '-L', 'path': true if path is a symboilc link
- '-p', 'path': true if path is a pipe (FIFO)
- '-S', 'path': true if path is a socket

template for compile use [handlebars](http://handlebarsjs.com/)


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Recommend

- [mac-dev-setup](http://aaaaaashu.gitbooks.io/mac-dev-setup/content/index.html)
- [How To Build A CLI Tool With Node.js And PhantomJS](http://www.smashingmagazine.com/2014/02/12/build-cli-tool-nodejs-phantomjs/)

## Version History

- v0.1.0

## Welcome Fork and Comment

- write by  malun666@126.com

If you have suggestions or feedback, please raise an issue or send an email.

## License

this repo is released under the [MIT
License](./license).
