export const pool = () => {
  if (window.Worker) {
    const poolWorker = new Worker("../scripts/poolWorker.js", { type: "module" });
    poolWorker.onmessage = (msg) => {
      console.log('msg from worker: ', msg)
    };
    setInterval(() => {
      poolWorker.terminate();
    }, 5000)
  } else {
    console.log('Your browser doesn\'t support web workers.');
  }
}
