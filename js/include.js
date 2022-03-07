(function() {
  function getQueryParam(name) {
      var regex = RegExp('[?&]' + name + '=([^&]*)');

      var match = regex.exec(location.search) || regex.exec(path);
      return match && decodeURIComponent(match[1]);
  }

  var scriptEls = document.getElementsByTagName('script'),
      path = scriptEls[scriptEls.length - 1].src,
      suffix = `${getQueryParam('theme') || 'neptune'}`

  document.write('<link rel="stylesheet" type="text/css" href="resources/css/ext-all-' + suffix + '.css"/>');
})();