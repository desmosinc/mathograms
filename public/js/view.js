;

$(function() {

  var parseUrl = function() {
    var queryParams = {};
    var queryString = window.location.search.substr(1);
    var params = queryString.split('&');
    for (var i = 0; i < params.length; i++){
      var index = params[i].indexOf('=');
      var key = decodeURIComponent(params[i].slice(0, index).replace(/\+/g, ' '));
      var value = decodeURIComponent(params[i].slice(index + 1).replace(/\+/g, ' '));
      queryParams[key] = value;
    }
    return queryParams
  };
  //all the information needed to render a math-o-gram is stored
  //in the URL, so read off of the URL
  var queryParams = parseUrl();

  //instantiate a desmos graph
  var graphPaper = $('.graph-paper')[0];

  var options = {
    keypad: false,
    border: false,
    settingsMenu: false,
    zoomButtons: false
  };

  var desmosGraph = Desmos.Calculator(graphPaper, options);
  var state = {};
  if (queryParams.graph) {
    state = graphTemplates[queryParams.graph];
  } else if (queryParams.state) {
    state = JSON.parse(queryParams.state);
  } else if (window.location.hash) {
    state = JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
  }
  desmosGraph.setState(state);

  //write in the message. google url encoder is replacing spaces with pluses
  $('.message').val(queryParams.message);
  $('.from').val(queryParams.from);
  $('body').removeClass('is-loading');
})