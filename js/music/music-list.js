var MusicList = (function(){
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
      console.log(tracks);
    });
  }

  return {
    init: init
  }
}());

MusicList.init();
