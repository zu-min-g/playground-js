const {
  parentPort, workerData
} = require('worker_threads');

// const max = BigInt(Number.MAX_SAFE_INTEGER)
// メモ： 1000000000000000n は ok
// const from = 999999999000000n
// const to = 1000000000000000n
const from = BigInt(workerData.from)
const to = BigInt(workerData.to)
const threads = BigInt(workerData.threads)
const no = BigInt(workerData.no)
for (let i = from + no; i <= to; i += threads) {
  for (let j = 0; j < 100; j++) {
    const strFloatNum = i + '.' + (j < 10 ? '0' : '') + j
    const floatNum = parseFloat(strFloatNum)
    const result = floatNum.toFixed(2)
    if (strFloatNum !== result) {
      parentPort.postMessage(no + ': ' + strFloatNum + ' : ' + floatNum.toFixed(2));
    }
  }
  if (((i - no) % 100000n) === 0n) {
    parentPort.postMessage(no + ': ' + i);
  }
}
