'use strict';

// Register `List` component, along with its associated controller and template
angular.
  module('activityList').
  component('list', {
    templateUrl: 'activity-list/activity-list.template.html',
    controller: function ListController($http) {
      var self = this;
      self.orderProp = '-pushed_at';
      self.listItems = [];
      self.text = 'adrotter'
      self.submit = function(){
        if (self.text){
          $http.get("https://api.github.com/users/"+self.text+"/repos").then(function(response) {
            var data = response.data;
            angular.forEach(data, function(item){
              self.listItems.push(item);  
            })
          });
          self.text = '';
        }
      }
      self.decideIfCreatedOrUpdate = function(item){
        if (item.created_at == item.pushed_at)
          return "Created a new repository named ";
        else
          return "Updated their repository ";
      }
      // $http.get('https://api.github.com/users/adrotter/repos').then(function(response) {
      //   var data = response.data;
      //   angular.forEach(data, function(item){
      //     self.listItems.push(item);  
      //   })
      // });
    }
  });
