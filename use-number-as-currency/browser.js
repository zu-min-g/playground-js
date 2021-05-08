(function () {
    const from = 70368744100000n
    const to = 70368744200000n
    for (let i = from; i <= to; i += 1n) {
        for (let j = 0; j < 100; j++) {
            const strNum = i + '.' + (j < 10 ? '0' : '') + j
            const floatNum = parseFloat(strNum)
            const result = floatNum.toFixed(2)
            if (strNum !== result) {
                // 一致しない場合
                console.error(strNum + ' : ' + floatNum.toFixed(2))
                throw Error()
            }
        }
        if ((i % 10000n) === 0n) {
            console.log(i)
        }
    }
})()
