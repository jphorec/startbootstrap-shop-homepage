/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp', ['ui.router', 'ngResource', 'pollApp.controllers', 'pollApp.services']);

angular.module('pollApp').config(function($stateProvider) {
    $stateProvider.state('polls', { // state for showing all polls
        url: '/polls',
        templateUrl: 'partials/polls.html',
        controller: 'PollListController'
    });
}).run(function($state) {
    $state.go('polls'); //make a transition to polls state when app starts
});