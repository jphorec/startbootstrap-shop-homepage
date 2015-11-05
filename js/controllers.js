/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp.controllers', []).controller('PollListController', function($scope, $state, $window, Poll) {
    $scope.polls = Poll.query(); //fetch all polls. Issues a GET to /collections/Polls

}).controller('PollCreateController',function($scope,$http, $state,$stateParams,Poll){

    $scope.poll = [new Poll()];
    $scope.poll[0].pollValues = [];
    $scope.poll[0].timeStamp = "22222222";
    $scope.poll[0].totalVotes = "0";
    $scope.poll[0].poll_id = "222";

    $scope.addPoll=function(){
        $scope.poll[0].$save(function(){
            $scope.uploadFile(poll[0].pollImage);
            $state.go('polls');
        });
    }

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);

        $http.post('/images/', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(' ...all right!... ').error(' ..damn!... ');

    }
});

