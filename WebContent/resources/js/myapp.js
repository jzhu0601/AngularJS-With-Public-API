
var myapp = angular.module('myapp',['ngRoute','ngAnimate','ngMap']);

myapp.config(function($routeProvider){
	
	$routeProvider
	.when('/',{templateUrl:'frags/search.html',controller:'searchCtrl'})
	.when('/weather',{templateUrl:'frags/weather.html', controller:'weatherCtrl'})
	.when('/appstore',{templateUrl:'frags/appstore.html', controller:'appleCtrl'})
	.when('/contact',{templateUrl:'frags/contact.html', controller:'contactCtrl'})
	.when('/error',{templateUrl:'frags/error.html', controller:'errorCtrl'})
	
	.otherwise({
		redirectTo:'/error'
	})
	 
});

myapp.controller('searchCtrl',function($scope,$http){
	$scope.zip= '';
	$scope.searchquery= '';
	$scope.details= [];
	
	
	$scope.searchresult = function(){
		var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip=%27"+$scope.zip+"%27and%20query=%27"+$scope.searchquery+"%27&format=json&diagnostics=false&callback=JSON_CALLBACK";
		
		if($scope.zip.length!=5){
			alert("Please Enter Valid ZIP CODE");
		}
		
		$http({
			method: 'JSONP',
			url:url
		}).success(function(data,status,header,config){
			$scope.details.push(data);
			
		})
		.error(function(data,status,header,config){
			alert('error');
		});
		
		
		$scope.zip='';
		$scope.searchquery='';
	}
});

myapp.controller('weatherCtrl',function($scope,$http){
	$scope.location= '';
	$scope.details= [];
	
	
	$scope.searchresult = function(){
		var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location="+$scope.location+"&format=json&diagnostics=true&callback=JSON_CALLBACK";
		
		if($scope.location.length!=5){
			alert("No city Found with given ZIP code - INVALID");
		}
		$http({
			method: 'JSONP',
			url:url
		}).success(function(data,status,header,config){
			$scope.details= [];
			$scope.details.push(data.query.results.channel);
			
			
		})
		.error(function(data,status,header,config){
		});
		
		
		$scope.location='';
		
	}
});

myapp.controller('appleCtrl',function($scope,$http){
	$scope.app='';
	$scope.appstore=[];
	
	
	$scope.storesearch = function(){
		//var url = "https://itunes.apple.com/search?term="+$scope.myalbum+"&r=json&callback=JSON_CALLBACK";
		var url="https://itunes.apple.com/search?term="+$scope.app+"&country=us&entity=software&r=json&callback=JSON_CALLBACK"
		$http({
			method: 'JSONP',
			url:url
		}).success(function(data,status,header,config){
			$scope.appstore=[];
			$scope.appstore.push(data);
			
		})
		.error(function(data,status,header,config){
			alert('Check your Internet Connection');
		});

		$scope.app='';
		
	}
});

myapp.controller('contactCtrl',function($scope,$http){
	$scope.message="Jason Zhu";
	$scope.pageClass="page-contact";
});

myapp.controller('errorCtrl',function($scope,$http){
	$scope.message="Oops, No Page Found !!!";
	$scope.pageClass="page-error";
});


myapp.controller('navCtrl',function($scope,$location){
	$scope.isActive=function(viewLocation){
		return viewLocation === $location.path();
	}
});