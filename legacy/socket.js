
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
const feedURL = 'wss://ws-feed.pro.coinbase.com';
const socket = new WebSocket(feedURL);
const MAX_PRICE_MEMORY = 50;
let lastPrice = 0.0;
let recordedPrices = [];


window.onload = () => {
    
    
    socket.onopen = () => {
        socket.send(JSON.stringify(subscribeMsg));
    }
    
    socket.onmessage = (msg) => {
        let parsedJSON = JSON.parse(msg.data);
        if(parsedJSON["type"] === "ticker"){
            recordedPrices.push({time: new Date(), value: parsedJSON["price"]})

            if(recordedPrices.length > MAX_PRICE_MEMORY)
                recordedPrices.shift();

            console.log(recordedPrices);
            updateDOMData(parsedJSON);
            renderGraph(recordedPrices);
        }
    }
    
    const updateDOMData = function(data){
        let incomingPrice = parseFloat(data["price"]);
        
        if(incomingPrice > lastPrice){
            document.getElementById('price').textContent = getCleanValue('price', data);
            document.getElementById('price').style.animation = "greenFlash .8s";
        }
        else if(incomingPrice < lastPrice){
            document.getElementById('price').textContent = getCleanValue('price', data);
            document.getElementById('price').style.animation = "redFlash .8s";
        }

        lastPrice = incomingPrice;

        document.getElementById('volume').textContent = getCleanValue('volume_24h', data);
        document.getElementById('dailyhigh').textContent = getCleanValue('high_24h', data);
    }

    //Return with 2 decimal places and commas where necessary (regex)
    const getCleanValue = (key, data) => parseFloat(data[key])
                                                    .toFixed(2)
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    ////////////////////////////// GRAPH CODE /////////////////////////
    ////////////////////////////// GRAPH CODE /////////////////////////
    ////////////////////////////// GRAPH CODE /////////////////////////
    
    //D3 Related letiables
    let width = 1200;
    let height = 500;

    //Mapping functions for each of x,y
    let xScale = d3.scaleTime()
        .range([0,width])
    let yScale = d3.scaleLinear()
        .range([height,0])
        
    //Line function, maps time,value to x,y cords
    let line = d3.line()
        .x(function(d){ return xScale(d.time); })
        .y(function(d){ return yScale(d.value); })
        .curve(d3.curveMonotoneX)

    //Append SVG placeholder
    let graph = d3.select("#svgholder").append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("id", "graph")
        .append("g")

    let path = graph.append('path').attr("stroke-linecap","round")

        
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



