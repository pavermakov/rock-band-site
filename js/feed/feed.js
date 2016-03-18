$(function(){
  var Feed = (function(){

    var _FeedResponse = {
      data:[]
    };
    var _FeedRequest = {
      endpoint: "/bobbybubonicandplague/posts",
      fields: ['message', 'full_picture', 'created_time', 'link', 'source', 'type', 'caption', 'description'],
      token: '1169524993072771|gcmFc65JcoiTk9rsu0zYEP3q0gc'
    };

    function init(){
      _requestFeed();
      _addEventListeners();
    }

    function _addEventListeners(){
      // load more posts once div.load-more is in the viewport
      $('.load-more').on('inview', function(event, isInView){
        if(isInView){
          _loadMorePosts();
        }
      });

      // No jumping back to the previously scrolled position
      $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
      });

    }


    /* Calling Facebook Graph for data */
    function _requestFeed(request){
      /* using FB API to get the feed */
      if(request){
        FB.api(request, _getFeed());
      } else {
        FB.api(_FeedRequest.endpoint,{fields: _FeedRequest.fields,access_token: _FeedRequest.token, limit:10},
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
            } else if(this.description){
              if(this.description.length < 150){
                return this.description;
              } else {
                return "BB & the Plague Update";
              } 
            } else {
              return "BB & the Plague Update";
            }
          }
        },
        message: {
          html: function(){
            return _catchURI(this.message);
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
        link_to_fb: {
          href: function(){
            return "https://www.facebook.com/bobbybubonicandplague/posts/" + _extractPostId(this.id);
          }
        }
      };

      _renderTemplate(posts, directives);
    } // end of _displayFeed

    function _renderTemplate(posts, directives){
      /* Render our template */
      $('#blog-wrapper').render(posts, directives);

      /* Since some post may not have media attached, remove the empty element */
      _removeEmptyImg();
      _removeEmptyP();

      // once the template has been rendered, we can show the blog
      $('#blog-wrapper').removeClass('hidden');

      // relative timeline 
      $(".timeago").timeago();

      // hide the loading animation 
      _preloadAnimation('off');

      
    }

    function _catchURI(string){
      var result = URI.withinString(string, function(url) {
        return "<a class='link_to_external' href="+url+" target='_blank'>link&nbsp;<i class='fa fa-external-link'></i></a>";
      });
      return result;
    }

    function _removeEmptyP(){
      $('.article-text:empty').remove();
    }

    function _removeEmptyImg(){
      $('.full_picture:not(.full_picture[src*="https"])').closest('figure').remove();
    }

    function _loadMorePosts(){
      _requestFeed(_FeedResponse.paging.next);
      _preloadAnimation('on');

      return false;
    }

    function _extractPostId(string){
      var postId = string.split("_").pop();
      return postId;
    }

    function _preloadAnimation(state){
      if(state === "on"){
        $('.loading-box').removeClass('hidden');
      } else if(state === "off"){
        $('.loading-box').addClass('hidden');
      }
    }

    return {
      init: init
    };

  }());

  Feed.init();
});
