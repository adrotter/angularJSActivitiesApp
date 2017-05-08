'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('activityList').
  component('list', {
    templateUrl: 'activity-list/activity-list.template.html',
    controller: function ListController($http) {
      var self = this;
      self.orderProp = 'id';
      self.listItems = [];
      self.text = 'https://api.github.com/users/adrotter/repos'
      self.submit = function(){
        if (self.text){
          $http.get(self.text).then(function(response) {
            var data = response.data;
            angular.forEach(data, function(item){
              self.listItems.push(item);  
            })
          });
          self.text = '';
        }
      }
      // $http.get('https://api.github.com/users/adrotter/repos').then(function(response) {
      //   var data = response.data;
      //   angular.forEach(data, function(item){
      //     self.listItems.push(item);  
      //   })
      // });
    }
  });
