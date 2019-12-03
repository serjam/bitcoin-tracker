// Subscribe to WebSocket for Price
// The javascript has constants in the beginning to define the web socket for real time price grab
// My aim is to expand this to all other cryptocoins such as ETH,XRP,...
const feedURL = 'wss://ws-feed.pro.coinbase.com';
// The websocket feed provides real-time market data updates for orders and trades.
const websiteSocket = new WebSocket(feedURL);
// Since the data can be shown in a limited fashion, we define a time window
const timeWindow = 32;
// Current price varaible
let currentPrice = 0.0;
// Array of prices for chart view
let priceArray = [];
// The ticker channel provides real-time price updates every time a match happens. It batches updates in case of cascading matches,
//  greatly reducing bandwidth requirements.
// Please take a look at Coinbase.com API documentaion for further information
const subscribeMsg = {
    "type": "subscribe",
    "product_ids": [
        "BTC-USD"
    ],
    "channels": [
        {
            "name": "ticker",
            "product_ids": [
                "BTC-USD"
            ]
        }
    ]
}

window.onload = () => {
    
    // Lets use JSON to intrepret the subscription data
    websiteSocket.onopen = () => {
        websiteSocket.send(JSON.stringify(subscribeMsg));
    }
    // Parsing the message and updating the price array 
    websiteSocket.onmessage = (msg) => {
        let parsedJSON = JSON.parse(msg.data);
        if(parsedJSON["type"] === "ticker"){
            priceArray.push({time: new Date(), value: parsedJSON["price"]})
            if(priceArray.length > timeWindow)
                priceArray.shift();
// to check the price manually
            console.log(priceArray);
            updateDOMData(parsedJSON);
            renderGraph(priceArray);
        }
    }
    
    const updateDOMData = function(data){
        let incomingPrice = parseFloat(data["price"]);
        // Lets flash green if the price goes up and red if it goes down 
        if(incomingPrice > currentPrice){
            document.getElementById('price').textContent = getValue('price', data);
            document.getElementById('price').style.animation = "greenFlash .9s";
        }
        else if(incomingPrice < currentPrice){
            document.getElementById('price').textContent = getValue('price', data);
            document.getElementById('price').style.animation = "redFlash .9s";
        }

        currentPrice = incomingPrice;

        document.getElementById('volume').textContent = getValue('volume_24h', data);
        document.getElementById('dailyhigh').textContent = getValue('high_24h', data);
    }

    //removing unnecesary prices
    const getValue = (key, data) => parseFloat(data[key])
                                                    .toFixed(2)
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //Using standard 
    let width = 400;
    let height = 300;

    //Mapping functions for each of x,y
    let xScale = d3.scaleTime()
        .range([0,width]);
    let yScale = d3.scaleLinear()
        .range([height,0]);
        
    //Line function, maps time,value to x,y cords
    let line = d3.line()
        .x(function(d){ return xScale(d.time); })
        .y(function(d){ return yScale(d.value); })
        .curve(d3.curveMonotoneX);

    //Append SVG placeholder
    let graph = d3.select("#svgholder").append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 400 300")
        .attr("id", "graph")
        .append("g");

    let path = graph.append('path').attr("stroke-linecap","round");

        
    // //Y Axis
    let axis = graph.append("g").attr('class', 'axis');

    const renderGraph = function updateD3GraphData(data){
        //Recalculate new min/max for each of x,y and update scale
        let extentX = d3.extent(data, d => d.time);
        xScale.domain(extentX);
        //Pad Y Values by 1%
        let min = parseFloat(d3.min(data, d => d.value));
        let max = parseFloat(d3.max(data, d => d.value));
        yScale.domain([min - min*.0001, max + max*.0001]);

        //Update Y Axis
        axis.call(d3.axisLeft().scale(yScale).ticks(3));
        //Update path
        path.attr('d', line(data)).attr('class', 'smoothline');
    }
}