/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp.controllers', []).controller('PollListController', function($scope, $state, $window, Poll) {
    $scope.polls = Poll.query(); //fetch all polls. Issues a GET to /collections/Polls



}).controller('PollCreateController',function($scope,$http, $state,$stateParams,Poll){

    $scope.poll = new Poll();
    $scope.poll.pollValues = [];
    $scope.poll.timeStamp = "22222222";
    $scope.poll.totalVotes = "0";
    $scope.poll.poll_id = "222";
    $scope.poll.pollImage = "images/images.jpeg";

    $scope.addPoll=function(){
        $scope.poll.$save(function(){
          // $scope.uploadFile($scope.poll.pollImage);
            $state.go('polls');
        });
    }

    $scope.uploadFile = function(files) {å
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);

        $http.post('/images/', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(' ...all right!... ').error(' ..damn!... ');

    }
}).controller('PollVoterController',function($scope,$state,$stateParams,Poll){

    $scope.updatePoll=function(){
        $scope.poll.$update(function(){
            $state.go('polls');
        });
    }
}).controller('PollVoteController', function($scope, $state, $window, Poll) {
    $scope.submitVote=function(){
        alert($scope.polls.getAttribute("pollName"));
        $state.go('polls');
    }


});

