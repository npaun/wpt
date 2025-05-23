// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wpt_flags=h2
// META: variant=?wss

const test = async_test("Send null data on a WebSocket - Connection should be closed");

let data = null;
let nullReturned = false;
let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;
let isMessageCalled = false;

wsocket.addEventListener('open', test.step_func(function(evt) {
  wsocket.send(data);
  isOpenCalled = true;
}), true);

wsocket.addEventListener('message', test.step_func(function(evt) {
  isMessageCalled = true;
  if ("null" == evt.data || "" == evt.data)
    nullReturned = true;
  assert_true(nullReturned);
  wsocket.close();
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_true(isMessageCalled, "message should be received");
  assert_equals(evt.wasClean, true, "wasClean should be true");
  test.done();
}), true);
