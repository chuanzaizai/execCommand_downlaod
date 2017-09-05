var app = angular.module('myApp', []);
	app.service('downloadService', function() {
	    /*
		 判断是否是IE浏览器
		*/
		this.detectIE = function() {
			// 获取浏览器类型和版本
		    var ua = window.navigator.userAgent;
		    var msie = ua.indexOf('MSIE ');
		    if (msie > 0) {
		      // IE 10- => return 版本号
		      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		    }
		    var trident = ua.indexOf('Trident/');
		    if (trident > 0) {
		      // IE 11 => return v版本号
		      var rv = ua.indexOf('rv:');
		      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		    }
		    var edge = ua.indexOf('Edge/');
		    if (edge > 0) {
		      // IE 12 => return 版本号
		      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		    }
		    // 除IE外的其余浏览器
		    return false;
	  	},
	    /*
	     下载json方法(IE)
		 @content:jsonn内容
		 @filename:下载后的文件名称
		 @extension:下载后的文件后缀名 
	    */
	    this.jsonDownload = function(content, filename, extension){
		  	  var BOM = '\uFEFF';
		      angular.element('body').append('<iframe id="SaveAsId" style="display: none"></iframe>');
		      var frameSaveAs = angular.element('body > iframe#SaveAsId')[0].contentWindow;
		      content = BOM + content;
		      frameSaveAs.document.open('text/json', 'replace');
		      frameSaveAs.document.write(content);
		      frameSaveAs.document.close();
		      frameSaveAs.focus();
		      var t1 = Date.now();
		      // 其他浏览器，调用windows的鼠标右键‘另存为’功能
		      frameSaveAs.document.execCommand('saveAs', false, filename + '.' + extension);
		      var t2 = Date.now();
		      // IE浏览器,则下载.txt文本文档
		      if (t1 === t2) {
		        frameSaveAs.document.execCommand('saveAs', true, filename + '.txt');
		      }
		      // 下载完成后删除dom节点
		      angular.element('body > iframe#SaveAsId').remove();
	  	},
	  	/*
	     下载json方法(除 IE浏览器)
		 @content:jsonn内容
		 @filename:下载后的文件名称
		 @extension:下载后的文件后缀名 
	    */
	  	this.jsonDownloadChrome = function(content, filename, extension){
		  	  var BOM = '\uFEFF';
		      content = 'data:image/svg;charset=utf-8,' + BOM + encodeURIComponent(content);
		      angular.element('body').append('<a id="SaveAsId"></a>');
		      var saveAsElement = angular.element('body > a#SaveAsId');
		      saveAsElement.attr('href', content);
		      saveAsElement.attr('download', filename + '.' + extension);
		      saveAsElement.attr('target', '_blank');
		      saveAsElement[0].click();
		      saveAsElement.remove();
	  	},
	  	/*
	     下载image方法
		 @content:图片base64内容
		 @filename:下载后的文件名称
		 @extension:下载后的文件后缀名 
	    */
	  	this.imageDownload = function(content, filename, extension) {
	  		var BOM = '\uFEFF';
	  		content = 'data:image/png;base64,' + content;
	      	angular.element('body').append('<a id="SaveAsId"></a>');
	      	var saveAsElement = angular.element('body > a#SaveAsId');
	      	saveAsElement.attr('href', content);
	      	saveAsElement.attr('download', filename + '.' + extension);
	      	saveAsElement.attr('target', '_blank');
	      	saveAsElement[0].click();
	      	saveAsElement.remove();
	  	}
	});   