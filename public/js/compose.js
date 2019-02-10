;(function() {
  var lastSavedURL;

  //cache a bunch of selectors
  var $composeView = $('.compose-view');
  var $shareView = $('.share-view');
  var $shareLink = $('.share-link');
  var $twitterLink = $('.tweet-btn');
  var $facebookLink = $('.fb-post-btn');
  var $headerImages = $('.header .images');
  var $composeView = $('.compose-view');
  var $shareView = $('.share-view');
  var $shareLink = $('.share-link');
  var $composeFrom = $('.compose-view .from');
  var $composeMessage = $('.compose-view .message');
  var $body = $('body');
  var expressionKeys = Object.keys(graphTemplates);

  var graphName = '';

  //move on to step 2 (share)
  var showShare = function () {
    $composeView.hide();
    $shareView.show();
    $body.removeClass('is-loading');
  };

  //go back to step 1 (compose)
  var showCompose = function () {
    $shareView.hide();
    $composeView.show();
    desmosGraph.resize();
  };

  var getLongUrl = function () {
    var urlBase =  window.location.origin + '/view';
    var message = encodeURIComponent($composeMessage.val());
    var from = encodeURIComponent($composeFrom.val());
    return urlBase.concat('?message=',message,'&from=',from,'&graph=',graphName);
  };

  //this is called once we have a short url from the google url-shortener
  var shareCallback = function(resp){
    shareLink = resp.id || getLongUrl();
    $shareLink.val(shareLink);
    var tweetUrl = "https://twitter.com/intent/tweet?text="
                 + encodeURIComponent("For my math lovers: a Desmos Math-o-gram! " + shareLink)
                 + "&via=desmos";
    var fbUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareLink);
    $twitterLink.attr('href', tweetUrl);
    $facebookLink.attr('href', fbUrl);
    lastSavedURL = shareLink;
    showShare();
  };

  //this initiates a request to google to shorten the url
  var share = function(){
    $body.addClass('is-loading');
    var longUrl = getLongUrl();

    //use the google api to shorten, and call googleCallback
    var r = gapi.client.urlshortener.url.insert({'resource':{'longUrl': longUrl}})
    r.execute(shareCallback);
  };

  //this is the code that interacts with the graphpaper
  var clickToSetGraph = function() {
    $('.button.selected').removeClass('selected');
    $(this).addClass('selected');
    selectGraph($(this).attr('name'));
  };

  var selectGraph = function(name){
    desmosGraph.setState(graphTemplates[name]);
    graphName = name;
  };

  //Finally: let's execute some code!
  //First, instantiate a Desmos Graph
  var graphPaper = $('.graph-paper')[0];
  var options = {
    keypad: false,
    border: false,
    settingsMenu: false,
    zoomButtons: false
  };
  var desmosGraph = Desmos.GraphingCalculator(graphPaper, options);

  //Hook up our listeners
  $('.action-share').on('click', share);
  $('.action-create-another').on('click', showCompose)
  $shareLink.on('click', function() {this.select();});
  $('.button').on('click', clickToSetGraph);

  //set the state of the graph
  selectGraph('sierpinski');
  $body.removeClass('is-loading');
})()
