prepData('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(resData =>{
        prepLineChart('#chartWrapper',resData).then(handleLineUpdate)
    })