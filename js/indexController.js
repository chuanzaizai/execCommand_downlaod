var app = angular.module('myApp', []);
	app.controller('personCtrl', ['$scope', function($scope, downloadService){
		// 模拟json数组
		var jsonData = {
			id: 1,
			name: '成都',
			areas: [
				{id: 11, name:'武侯区'},
				{id: 12, name:'高新区'},
				{id: 13, name:'青羊区'},
				{id: 14, name:'金牛区'}
			]
		}
		// 下载json方法
		$scope.downloadJson = function() {
			var jsonContent = JSON.stringify(jsonData);
			// 非IE浏览器
			if(!downloadService.detectIE()){
				downloadService.jsonDownloadChrome(jsonContent, '测试json', 'json');
			}else{
				downloadService.jsonDownload(jsonContent, '测试json', 'json');
			}
		}
		var base64 = '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';
		// 下载图片方法
		$scope.downloadImage = function(){
			downloadService.imageDownload(base64, '图片下载测试', 'png');
		}
	}])