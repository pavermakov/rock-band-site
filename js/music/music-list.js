$(function(){
	var BandStats = (function(){

		var _user = {};

		function init(){
			_initializeSC();
			_getBandInfo();
		}

		function _initializeSC(){
      SC.initialize({
        client_id: 'fc122dbf1cffa309cac72b7aa125bf34'
      })
    }

    function _getBandInfo(){
    	SC.get('/resolve', { 
    		url : "https://soundcloud.com/bobbybubonic"
    	}).then(function(user){
    		_user = user;
    		console.log(_user);
    		_addStats(_user);
    	});
    }

    function _addStats(user){
    	$('.followers').html("<i class='fa fa-users'></i> " + user.followers_count + " Followers");
    	$('.tracks_count').html("<i class='fa fa-music'></i> " + user.track_count + " Tracks");
    }

    return {
    	init: init
    }

	}());

	BandStats.init();
});


