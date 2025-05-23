// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wss
// META: variant=?wpt_flags=h2

test(function() {
  let asciiWithSep = "/echo";
  let wsocket;
  assert_throws_dom("SYNTAX_ERR", function() {
    wsocket = CreateWebSocketWithAsciiSep(asciiWithSep)
  });
}, "Create WebSocket - Pass a valid URL and a protocol string with an ascii separator character - SYNTAX_ERR is thrown")
