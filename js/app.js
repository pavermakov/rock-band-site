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
    // REPLACING TEXT WITH IMAGES for mobile devices
    $('.container').ready(function(){
        if($('#main').width() <= '325'){
            $('#socialText').hide();
            $('#socialImages').show();
        } else {
            $('#socialText').show();
            $('#socialImages').hide();
        }
    });
    
});
