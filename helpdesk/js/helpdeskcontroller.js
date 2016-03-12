var app = angular.module("helpdesk", ['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
        .when('/', {
            controller:     '',
            templateUrl:    'views/home.html'
    })
        .when('/question/:id', {
            controller:     '',
            templateUrl:    'views/question.html'
    }).when('/askquestion', {
            controller:     '',
            templateUrl:    'views/askquestion.html'
    })
    
});
app.run(function($rootScope) {
    $rootScope.constant={
             // SERVICE_URL:"http://www.zircon.com/zservice"
            // SERVICE_URL:"http://zircon.com/localservice"
            SERVICE_URL:"http://societyfocus.com/service"
        }
})
app.controller("helpdeskController", function($scope,$http,$rootScope) {
    $scope.getQuestions = function(){
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/helpdesk/get?page=0&size=10',
        }
        $http(req).then(function successCallback(response) {
           console.log(response.data.body);
           $scope.questions = response.data.body;
        });
    }
 });
app.controller("questionController", function($scope,$http,$rootScope,$routeParams) {
    var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/helpdesk/getbyid/'+$routeParams.id
        }
        $http(req).then(function successCallback(response) {
           $scope.fullQuestion = response.data.body;
        });
    $scope.addComment = function(){
        console.log($scope.comment);
        var reqComment = {
            method: 'POST',
            url:  $rootScope.constant.SERVICE_URL + '/helpdesk/addcomment/'+$routeParams.id,
            data: $scope.comment
        }
        $http(reqComment).then(function successCallback(response) {
            console.log(response);
            $scope.commentSuccess =true;

        });
    }
 });
app.controller('askquestionController', function($scope,$http,$rootScope){
    $scope.addQuestion = function(){
        var req = {
            method: 'POST',
            url:  $rootScope.constant.SERVICE_URL + '/helpdesk/addquery',
            data: $scope.askQ
        }
        $http(req).then(function successCallback(response) {
            console.log(response);
            $scope.addSuccess =true;
        });
    }
})