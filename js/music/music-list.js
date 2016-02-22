var MusicList = (function(){

  var _myTracks = [], _myFrames;

  function init(){
    _initializeSC();
    _getTracks();
  }

  function _initializeSC(){
    SC.initialize({
      client_id: 'fc122dbf1cffa309cac72b7aa125bf34'
    })
  }

  function _getTracks(){
    SC.get('/tracks',{
      user_id: '141154844'
    }).then(function(tracks){
      _myTracks = tracks;
      _displayTracks();
      console.log(_myTracks);
      console.log(_myTracks[0].permalink_url);
    });
  }


  function _displayTracks(){
    for(var i = 0; i < _myTracks.length; i++){
      // create new element so that we can embed player in it
      SC.oEmbed(_myTracks[i].permalink_url,{sharing: false}).then(function(embed){
        $('<article class="song">').html(embed.html).appendTo('.songs');
      });

    }
  }


  return {
    init: init
  }
}());

MusicList.init();
