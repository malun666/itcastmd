'use strict';

require('shelljs/global');

const assign = require('object-assign');
const fs = require('fs');
const BufferHelper = require('bufferhelper');
const Handlebars = require('handlebars');
const open = require("open");

function generator(pwdProcess, sourceFileName, destFileName, isOpen, options) {
	//拿到原始的文件名
	let fileName = sourceFileName.split('/').pop();;
	//拿到第一个文件
	let _fileName = fileName.split('.')[0];
	 
	let isDebug = options.debug || false;

	function log(str){
  //设置命令行软件的配置
		if(isDebug == true)
			console.log(str);
	}
  
	// 点号表示当前文件所在路径  
	let str = fs.realpathSync('.');  
	log(str);  
	
	//函数可以返回当前正在执行的项目路径
	let pwd = pwdProcess;
	//:属性返回的是  nodejs 的安装路径 
	// processor.execPath 
	
	let previewPath = pwd + '/preview';
	
	let sourceFilePath = sourceFileName;
	
	let _destFileName = destFileName ;
	
	if (test('-d', previewPath)) { 
		/* do something with dir */ 
		mkdir('-p', previewPath);
	};
	
	cpCurrentDir(__dirname, previewPath);
	_toc_config(__dirname, previewPath);
	
	/**
	 * 拷贝 模板文件夹到 目标文件夹
	 * @param  {string} curDir  当前路径
	 * @param  {string} destDir 目标路径
	 */
	function cpCurrentDir(curDir,destDir){
		let i = curDir;
		log(i);
	
		//将 模板拷贝到 目标文件夹
		cp('-R', curDir +'/vendor/toc', destDir+'/');
	}
	
  function _toc_config(curDir,destDir){
		if (test('-d', destDir + "/toc_conf.js")) { 
			log('toc_conf file exist')
		}else{
     cp('-R', curDir +'/vendor/toc_conf.js', destDir+'/');
		}
  }
	
	var template_path = __dirname + '/vendor/template.html';
	log('template_path = ' + template_path);
	
	fs.readFile(sourceFilePath, function (err, data) {
	  if (err) {
	  	log(err);
	  	throw err;
	  }
	  log(data);
		
    // var rs = fs.createReadStream(template_path, {encoding: 'utf-8', bufferSize: 11});
    let rs = fs.createReadStream(template_path, {bufferSize: 11}); 
		let bufferHelper = new BufferHelper();

		rs.on("data", function (trunk){
				bufferHelper.concat(trunk);
		});
	
		rs.on("end", function () {
			let source = bufferHelper.toBuffer().toString('utf8');
			let template = Handlebars.compile(source);
		
			log(template);
		
			let	marked = require('marked');	
			// marked = require('gulp-markdown-livereload');
			marked(data.toString(), options, function (err, data) {
				if (err) {
					log('err ' + err);
					return;
				}
				log(data);
			
				let css_link = "ddsds";
				let data1 = {
					"title":"itcastmd:" + _fileName,
					"parse_markdown": data
				};
		
				let final_html_content = new Buffer( template(data1) );
				fs.writeFile(_destFileName, final_html_content , function (err) {
				  if (err) throw err;
				  log('It\'s saved!');
					
					if(isOpen == true){
						open(_destFileName);
					}
				});
			});
		});
	});
};


// generator('sample.md')

module.exports = generator