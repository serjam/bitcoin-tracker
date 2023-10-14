function convertToArr(src){
    // Parse the time using D3
    let parsedDate = d3.timeParse("%Y-%m-%d");
    // bpi key into bje
    let obj = src.bpi
    let keys = Object.keys(obj)
    // create object of each key
    let resArr = keys.map(k=> {
        let o = {}
        o['date'] = parsedDate(k)
        o['value'] = obj[k]
        return o
    })
    src.bpi = resArr
    return src
}

function prepData(srcString){
    return new Promise((resolve,reject) => {
        return d3.json(srcString).then(data => {
            let arrayData = convertToArr(data)
            console.log('data')
            console.log(data)
            // console.log("Hellow")
            resolve(arrayData)
            // Mouse over need to use global variable 
        })
    })
}