const {
  parentPort, workerData
} = require('worker_threads');

// const max = BigInt(Number.MAX_SAFE_INTEGER)
// メモ： 1000000000000000n は ok
// const from = 999999999000000n
// const to = 1000000000000000n
const from = BigInt(workerData.from)
const to = BigInt(workerData.to)
const no = BigInt(workerData.no)
const count = BigInt(workerData.count)
for (let i = 0n; i <= count; i++) {
  const num = from + BigInt((Number(to - from) * Math.random()).toFixed(0))
  for (let j = 0; j < 100; j++) {
    const strFloatNum = num + '.' + (j < 10 ? '0' : '') + j
    const floatNum = parseFloat(strFloatNum)
    const result = floatNum.toFixed(2)
    if (strFloatNum !== result) {
      parentPort.postMessage(no + ': ' + strFloatNum + ' : ' + floatNum.toFixed(2));
    }
  }
  if ((i % 10000n) === 0n) {
    parentPort.postMessage(no + ': ' + i);
  }
}
