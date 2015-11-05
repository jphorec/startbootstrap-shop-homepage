/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp.controllers', []).controller('PollListController', function($scope, $state, $window, Poll) {
    $scope.polls = Poll.query(); //fetch all polls. Issues a GET to /collections/Polls

}).controller('PollCreateController',function($scope,$http, $state,$stateParams,Poll){

    $scope.poll=new Poll();

    $scope.addPoll=function(){
        $scope.poll.$save(function(){
            $scope.uploadFile(poll.pollImage);
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

