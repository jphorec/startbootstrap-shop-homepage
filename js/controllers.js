/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp.controllers', []).controller('PollListController', function($scope, $state, $window, Poll) {
    $scope.polls = Poll.query(); //fetch all movies. Issues a GET to /api/movies

});