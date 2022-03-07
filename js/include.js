(function() {
  // url parameter에서 theme 값 가져오기
  function getQueryParam(name) {
      const regex = RegExp('[?&]' + name + '=([^&]*)');
      const match = regex.exec(location.search) || regex.exec(path);

      return match && decodeURIComponent(match[1]);
  }

  const scriptEls = document.getElementsByTagName('script'),
      path = scriptEls[scriptEls.length - 1].src,
      suffix = `${getQueryParam('theme') || 'neptune'}`

  // dom에 css 태그 추가
  document.write('<link rel="stylesheet" type="text/css" href="resources/css/ext-all-' + suffix + '.css"/>');
})();