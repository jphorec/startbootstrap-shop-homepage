/**
 * Created by josh.horecny on 11/2/15.
 */
angular.module('pollApp.services', []).factory('Poll', function($resource) {
    return $resource('https://bench-project.herokuapp.com/collections/Polls/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
});