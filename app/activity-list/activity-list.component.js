'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('activityList').
  component('list', {
    templateUrl: 'activity-list/activity-list.template.html',
    controller: function ListController($http) {
      var self = this;
      self.orderProp = 'id';

      $http.get('https://api.github.com/users/adrotter/repos').then(function(response) {
        self.listItems = response.data;
      });
    }
  });
