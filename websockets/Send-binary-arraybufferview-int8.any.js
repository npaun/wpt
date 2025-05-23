// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wss
// META: variant=?wpt_flags=h2

const test = async_test("Send binary data on a WebSocket - ArrayBufferView - Int8Array - Connection should be closed");

let data = "";
let datasize = 8;
let int8View;
let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;
let isMessageCalled = false;

wsocket.addEventListener('open', test.step_func(function(evt) {
  wsocket.binaryType = "arraybuffer";
  data = new ArrayBuffer(datasize);
  int8View = new Int8Array(data);
  for (let i = 0; i < 8; i++) {
    int8View[i] = i;
  }
  wsocket.send(int8View);
  isOpenCalled = true;
}), true);

wsocket.addEventListener('message', test.step_func(function(evt) {
  isMessageCalled = true;
  let resultView = new Int8Array(evt.data);
  for (let i = 0; i < resultView.length; i++) {
    assert_equals(resultView[i], int8View[i], "ArrayBufferView returned is the same");
  }
  wsocket.close();
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_true(isMessageCalled, "message should be received")
  assert_equals(evt.wasClean, true, "wasClean should be true");
  test.done();
}), true);
