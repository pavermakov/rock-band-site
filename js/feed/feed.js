var Feed = (function(){

  var _FeedResponse = {
    data:[]
  };
  var _FeedRequest = {
    endpoint: "/bobbybubonicandplague/posts",
    fields: ['message', 'full_picture', 'created_time', 'link', 'source', 'type', 'caption'],
    token: '1169524993072771|gcmFc65JcoiTk9rsu0zYEP3q0gc'
  };

  function init(){
    _requestFeed();
    _addEventListeners();
  }

  function _addEventListeners(){
    $('.more').click(_loadMorePosts);
  }


  /* Calling Facebook Graph for data */
  function _requestFeed(request){
    /* using FB API to get the feed */
    if(request){
      FB.api(request, _getFeed());
    } else {
      FB.api(_FeedRequest.endpoint,{fields: _FeedRequest.fields,access_token: _FeedRequest.token},
        _getFeed());
    }
  }

  /* Reseiving Feedback from the server */
  function _getFeed(){
    return function(response){
      if (response && !response.error) {
        _FeedResponse.data = _FeedResponse.data.concat(response.data);
        _FeedResponse.paging = response.paging;
        _displayFeed(_FeedResponse.data);
        console.log(_FeedResponse);
      } else {
        console.log('Error: ', response.error);
      }
    }
  }

  /* transparency templating engine */
  /* DO NOT TOUCH THIS */
  function _displayFeed(posts){

    var directives = {

      created_time: {
        datetime: function(){
          return this.created_time;
        }
      },
      full_picture: {
        src: function(){
          return this.full_picture;
        }
      },
      link: {
        href: function(){
          return this.link;
        },
        html: function(){
          return "View on Facebook";
        }
      }
    };

    /* Render our template */
    $('.feed').render(posts, directives);
    /* Since some post may not have media attached, remove the empty element */
    $('.full_picture:not(.full_picture[src*="https"])').remove();
    /* relative timeline */
    $("time.timeago").timeago();

    _preloadAnimation('off');
  } // end of _displayFeed

  function _loadMorePosts(){
    _requestFeed(_FeedResponse.paging.next);
    _preloadAnimation('on');
    return false;
  }

  function _preloadAnimation(state){
    if(state === "on"){
      $('#loading').show();
    } else if(state === "off"){
      $('#loading').hide();
    }
  }

  return {
    init: init
  };

}());

Feed.init();
