// META: script=constants.sub.js
// META: variant=?default
// META: variant=?wpt_flags=h2
// META: variant=?wss

const test = async_test();

let wsocket = CreateWebSocket(false, false);
let isOpenCalled = false;

wsocket.addEventListener('open', test.step_func(function(evt) {
  isOpenCalled = true;
  wsocket.close(undefined);
}), true);

wsocket.addEventListener('close', test.step_func(function(evt) {
  assert_true(isOpenCalled, 'open event must fire');
  test.done();
}), true);
