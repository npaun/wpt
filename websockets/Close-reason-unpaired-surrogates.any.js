// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wss
// META: variant=?wpt_flags=h2

const test = async_test("Create WebSocket - Close the Connection - close(reason with unpaired surrogates) - connection should get closed");

let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;
let replacementChar = "\uFFFD";
let reason = "\uD807";

wsocket.addEventListener('open', test.step_func(function(evt) {
  wsocket.close(1000, reason);
  isOpenCalled = true;
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be opened");
  assert_equals(evt.reason, replacementChar, "reason replaced with replacement character");
  test.done();
}), true);
