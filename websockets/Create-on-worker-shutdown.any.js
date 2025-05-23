async_test(t => {
  function workerCode() {
    close();
    let ws = new WebSocket(self.location.origin.replace('http', 'ws'));
    let data = {
      originalState: ws.readyState,
      afterCloseState: null
     };

    ws.close();

    data.afterCloseState = ws.readyState;
    postMessage(data);
  }

  let workerBlob = new Blob([workerCode.toString() + ";workerCode();"], {
    type: "application/javascript"
  });

  let w = new Worker(URL.createObjectURL(workerBlob));
  w.onmessage = t.step_func(function(e) {
    assert_equals(e.data.originalState, WebSocket.CONNECTING, "WebSocket created on worker shutdown is in connecting state.");
    assert_equals(e.data.afterCloseState, WebSocket.CLOSING, "Closed WebSocket created on worker shutdown is in closing state.");
    t.done();
  });
}, 'WebSocket created after a worker self.close()');
