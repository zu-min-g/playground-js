const {
  Worker
} = require('worker_threads');

// メモ：
// 70368744177663n (OK)
// 10000000000000n (OK)
// 0 ～ 100000000n (OK)
// 70368738000000n ～ 70368744177663n (OK)
// 70368744177664n (NG)
// 70368744177664.01 が 70368744177664.02 になる
const threads = 8;
const from = -70368744177663n;
const to = -100000000n;
const count = 1000000n;

(function () {
  return new Promise((resolve, reject) => {
    for (let no = 0;no < threads;no++) {
      // const worker = new Worker('./worker.js', {
      //   workerData: {
      //     threads,
      //     from,
      //     to,
      //     no,
      //   }
      // });
      const worker = new Worker('./worker2.js', {
        workerData: {
          threads,
          from,
          to,
          no,
          count,
        }
      });
      worker.on('message', (msg) => {
        console.log(msg)
      });
      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0)
          reject()
        else resolve()
      });
    }
  });
})()