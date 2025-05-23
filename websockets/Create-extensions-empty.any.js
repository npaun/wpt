// META: timeout=long
// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wpt_flags=h2
// META: variant=?wss

const test = async_test("Create WebSocket - wsocket.extensions should be set to '' after connection is established - Connection should be closed");

let wsocket = new WebSocket(SCHEME_DOMAIN_PORT + "/handshake_no_extensions");
let isOpenCalled = false;

wsocket.addEventListener('open', test.step_func_done(function(evt) {
  wsocket.close();
  isOpenCalled = true;
  assert_equals(wsocket.extensions, "", "extensions should be empty");
}), true);

wsocket.addEventListener('close', test.step_func_done(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be closed");
}), true);
