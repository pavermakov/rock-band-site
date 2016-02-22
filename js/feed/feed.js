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
    $('#blog').on('click', '.more', _loadMorePosts);
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
        console.log(_FeedResponse);
        _displayFeed(_FeedResponse.data);
      } else {
        console.log('Error: ', response.error);
      }
    }
  }

  /* transparency templating engine */
  function _displayFeed(posts){

    var directives = {

      type: {
        text: function(){
          if(this.type === "event"){
            return this.caption;
          } else if(this.type === "video"){
            return "Video Update"
          }
        }
      },
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
    $('#blog-wrapper').render(posts, directives);
    /* Since some post may not have media attached, remove the empty element */
    removeEmptyImg();
    /* relative timeline */
    $(".timeago").timeago();
    /* hide the loading animation */
    _preloadAnimation('off');
  } // end of _displayFeed

  function removeEmptyImg(){
    $('.full_picture:not(.full_picture[src*="https"])').closest('figure').remove();
  }

  function _loadMorePosts(){
    _requestFeed(_FeedResponse.paging.next);
    _preloadAnimation('on');

    return false;
  }

  function _preloadAnimation(state){
    if(state === "on"){
      $('.more').html('Loading ...');
    } else if(state === "off"){
      $('.more').html('Load More Posts');
    }
  }

  return {
    init: init
  };

}());

Feed.init();
