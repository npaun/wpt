// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wpt_flags=h2
// META: variant=?wss

const test = async_test("Send unicode data on a WebSocket - Connection should be closed");

let data = "¥¥¥¥¥¥";
let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;
let isMessageCalled = false;

wsocket.addEventListener('open', test.step_func(function(evt) {
  wsocket.send(data);
  assert_equals(data.length * 2, wsocket.bufferedAmount);
  isOpenCalled = true;
}), true);

wsocket.addEventListener('message', test.step_func(function(evt) {
  isMessageCalled = true;
  assert_equals(evt.data, data);
  wsocket.close();
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_true(isMessageCalled, "message should be received");
  assert_equals(evt.wasClean, true, "wasClean should be true");
  test.done();
}), true);
