'use strict';

// Register `List` component, along with its associated controller and template
angular.
  module('activityList').
  component('list', {
    templateUrl: 'activity-list/activity-list.template.html',
    controller: function ListController($http, $interval) {
      var self = this;
      var jsonobj = 
      {
        activity : {
          icon : "icon-comment-alt",
          actor: {
              id : "department identifier",
              objectType: "person",
              displayName: "Department Name",
              author : {
                  id : "kName",
                  displayName : "FirstName LastName"
              },
              image : {
                  color : "#f1c40f"
              }
          },
          verb: "post",
          title: "Test Event",
          object: {
              ucdSrcId : "content identifier",
              objectType: "notification",
              content: "This is a test notification",
              contentImage : {
                  source : "aggiefeed",
                  dimensions : {
                      normal : {
                          url: "/content/uploads-normal/someId.jpg",
                          width: 400,
                          height: 280
                      },
                      high : {
                          url: "/content/uploads-hight/someId.jpg",
                          width: 650,
                          height: 460
                      }
                  }
              },
              ucdEdusModel : {
                  url : "http://ucdavis.edu",
                  urlDisplayName : "UC Davis",
                  event : {
                      location: "Event Location",
                      hasStartTime : true,
                      startDate: "date string",
                      endDate: "date string",
                      isAllDay: false,
                      iCalendar : "iCal string",
                      addToGoogleCalendar: "string"
                  }
              },
              location : {
                  displayName: "Mount Everest",
                  geo : {
                      latitude: "27.9881",
                      longitude: "86.9253"
                  },
                  geometry : {
                      type: "Point",
                      coordinates: [86.9253, 27.9881]
                  }
              }
          },
          to : [
              {
                  id: "<kName>",
                  g: false,
                  i: false
              }
          ],
          ucdEdusMeta : {
              labels : ["~academic", "some-label"],
              startDate : "date string",
              endDate : "date string"
          }
        }
      };
      self.orderProp = '-activity.object.ucdEdusModel.event.endDate';
      self.listItems = [];
      self.listKeys = [];
      self.userList = [];
      self.text = 'adrotter'
      self.submit = function(){
        if (self.text){
          $http.get("https://api.github.com/users/"+self.text+"/repos").then(function(response) {
            var data = response.data;
            var json = jsonobj;
            angular.forEach(data, function(item){
              json.activity.actor.displayName = "Github";
              json.activity.actor.author.id = item.owner.id;
              json.activity.actor.author.displayName = item.owner.login;
              json.activity.title = item.name;
              json.activity.object.content = self.decideIfCreatedOrUpdate(item);
              json.activity.object.contentImage.source = "Github";
              json.activity.object.contentImage.dimensions.normal.url = item.owner.avatar_url;
              json.activity.object.contentImage.dimensions.normal.width = 30;
              json.activity.object.contentImage.dimensions.normal.height = 30;
              json.activity.object.contentImage.dimensions.high.url = item.owner.avatar_url;
              json.activity.object.contentImage.dimensions.high.width = 300;
              json.activity.object.contentImage.dimensions.high.height = 300;
              json.activity.object.ucdEdusModel.event.startDate = item.created_at;
              json.activity.object.ucdEdusModel.event.endDate = item.pushed_at;
              var key = item.id+item.owner.login+item.pushed_at;
              if (self.listKeys.indexOf(key) == -1) 
              {
                self.listKeys.push(key);
                self.listItems.push(angular.fromJson(angular.toJson(json,true)));
              }
              if (self.userList.indexOf(item.owner.login) == -1)
                self.userList.push(item.owner.login);
            })
          });
          self.text = '';
        }
      }
      function update(){
        for (var i = 0; i < self.userList.length; i++)
        {
          $http.get("https://api.github.com/users/"+self.userList[i]+"/repos").then(function(response) {
            var data = response.data;
            var json = jsonobj;
            angular.forEach(data, function(item){
              json.activity.actor.displayName = "Github";
              json.activity.actor.author.id = item.owner.id;
              json.activity.actor.author.displayName = item.owner.login;
              json.activity.title = item.name;
              json.activity.object.content = self.decideIfCreatedOrUpdate(item);
              json.activity.object.contentImage.source = "Github";
              json.activity.object.contentImage.dimensions.normal.url = item.owner.avatar_url;
              json.activity.object.contentImage.dimensions.normal.width = 30;
              json.activity.object.contentImage.dimensions.normal.height = 30;
              json.activity.object.contentImage.dimensions.high.url = item.owner.avatar_url;
              json.activity.object.contentImage.dimensions.high.width = 300;
              json.activity.object.contentImage.dimensions.high.height = 300;
              json.activity.object.ucdEdusModel.event.startDate = item.created_at;
              json.activity.object.ucdEdusModel.event.endDate = item.pushed_at;
              var key = item.id+item.owner.login+item.pushed_at;
              if (self.listKeys.indexOf(key) == -1) 
              {
                self.listKeys.push(key);
                self.listItems.push(angular.fromJson(angular.toJson(json,true)));
              }
            })
          });
        }
      }
      $interval(update, 60000);
      self.decideIfCreatedOrUpdate = function(item){
        if (item.created_at == item.pushed_at)
          return "Created a new repository named ";
        else
          return "Updated their repository ";
      }
    }
  }).
  directive('clock', function ($interval) {
  return {
      restrict:'E',
      scope: {
         date: '@'
      },
      template:'<div class="date">{{difference}}</div>',
      link: function(scope, element, attrs) {
        var updateTime = function(){
          scope.difference =  moment(scope.date).fromNow();
        }
        
        $interval(updateTime, 1000);
      }
   };
});