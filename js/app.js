var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html'
    })
    .when('/members',{
        controller: 'MembersCtrl',
        templateUrl: 'views/members.html',
    })
    .when('/contacts',{
        controller: 'ContactsCtrl',
        templateUrl: 'views/contacts.html',
    })
    .otherwise({redirectTo: '/'});
});

myApp.controller('NavCtrl',['$scope','$location',function($scope,$location){
    isActive = function(tab,path){
       return tab.firstChild.getAttribute('href') === path;
   }
}]);

myApp.controller('HomeCtrl', ['$scope',function($scope){
    // WELCOME DESCRIPTION
    $scope.welcome = 'Welcome to the fan page of the punk rock band Bobby Bubonic and The Plague!'+
        'The founding members, Connor, Danny, and Mike, started the band in 2013 in'+
        'Akron, Ohio. The band was highly influeced by famous band such as Green Day, '+
        'The Black Keys, Foo Fighters, and so on.'+
        'In 2015 the band added Jenna. Bobby Bubonic and the Plague has been practicing' +
        'and perfecting their original work for two years, now they will share it with '+
        'the masses!';
}]);

myApp.controller('MembersCtrl', ['$scope',function($scope){
    
    $scope.members = [
        {
            name: 'Connor "Bobby Bubonic" Weber',
            image: '../media/members/connor.jpg',
            role: 'Lead Guitar / Vocals'
        },
        {
            name: 'Jenna "The Common Cold" Bulgrin',
            image: '../media/members/jenna.jpg',
            role: 'Lead / Backing Vocals'
        },
        {
            name: 'Mike "H1N1" Long',
            image: '../media/members/mike.jpg',
            role: 'Bassist / Backing Vocals'
        },
        {
            name: 'Danny "Polio" Paparella',
            image: '../media/members/danny.jpg',
            role: 'Drums'
        }
    ];

}]);

myApp.controller('ContactsCtrl', function($scope){
    
});
