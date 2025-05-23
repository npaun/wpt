// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wpt_flags=h2
// META: variant=?wss

const test = async_test("Send binary data on a WebSocket - ArrayBufferView - Float16Array - Connection should be closed");

let data = "";
let datasize = 4;
let view;
let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;
let isMessageCalled = false;

wsocket.addEventListener('open', test.step_func(function(evt) {
  wsocket.binaryType = "arraybuffer";
  data = new ArrayBuffer(datasize);
  view = new Float16Array(data);
  for (let i = 0; i < 2; i++) {
    view[i] = i;
  }
  wsocket.send(view);
  isOpenCalled = true;
}), true);

wsocket.addEventListener('message', test.step_func(function(evt) {
  isMessageCalled = true;
  let resultView = new Float16Array(evt.data);
  for (let i = 0; i < resultView.length; i++) {
    assert_equals(resultView[i], view[i], "ArrayBufferView returned is the same");
  }
  wsocket.close();
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_true(isMessageCalled, "message should be received")
  assert_equals(evt.wasClean, true, "wasClean should be true");
  test.done();
}), true);
