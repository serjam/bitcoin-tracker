<template>
    <div id="container">
        <div class="upper-area">
            <Price v-bind:lastPrice="lastPrice"/>
            <Metadata v-bind:metaInfo="metaInfo"/>
        </div>
    </div>
</template>

<script>

import Price from "./components/Price";
import Metadata from "./components/Metadata";


export default {
    name: "App",
    components: {
        Price,
        Metadata,
    },
    data(){
        return{
            lastPrice: 0.0,
            metaInfo: {
                vol: 0.0, 
                daily: 0.0
            },
            recordedPrices: []
        }
    },
    methods: {
        connect () {
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
            const MAX_PRICE_MEMORY = 50;
            const feedURL = 'wss://ws-feed.pro.coinbase.com';
            
            this.socket = new WebSocket(feedURL);

            this.socket.onopen = () => {
                this.socket.send(JSON.stringify(subscribeMsg));
            }

            this.socket.onmessage = (msg) => {
                let parsedJSON = JSON.parse(msg.data);
                if(parsedJSON["type"] === "ticker"){
                    this.lastPrice = parseFloat(parsedJSON["price"]);
                    this.recordedPrices.push({time: new Date(), value: parsedJSON["price"]})
                    this.metaInfo['vol'] = parsedJSON['volume_24h']
                    this.metaInfo['daily'] = parsedJSON['high_24h']

                    //Keep the array size under MAX_PRICE_MEMORY
                    if(this.recordedPrices.length > MAX_PRICE_MEMORY)
                        this.recordedPrices.shift();

                    // console.log(this.lastPrice);
                    // console.log(this.recordedPrices);
                    this.renderGraph(this.recordedPrices);
                }
            }
        },
        renderGraph (data){
            //Recalculate new min/max for each of x,y and update scale
            let extentX = d3.extent(data, d => d.time);
            this.xScale.domain(extentX);
            //Pad Y Values by 1%
            let min = parseFloat(d3.min(data, d => d.value));
            let max = parseFloat(d3.max(data, d => d.value));
            this.yScale.domain([min - min*.0001, max + max*.0001]);

            //Update Y Axis
            this.axis.call(d3.axisLeft().scale(this.yScale).ticks(3));
            
            //Update path
            this.path.attr('d', this.line(data)).attr('class', 'smoothline');

            
        },
        getCleanValue(data) {
            return parseFloat(data)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    mounted () {
        //Start streaming data from websocket
        this.connect()

        //---GRAPH CODE---//

        //D3 Related letiables
        let width = 800;
        let height = 600;

        //Mapping functions for each of x,y
        this.xScale = d3.scaleTime()
            .range([0,width])
        this.yScale = d3.scaleLinear()
            .range([height,0])
            
        //Line function, maps time,value to x,y cords
        var that = this
        this.line = d3.line()
            .x(function(d){ return that.xScale(d.time); })
            .y(function(d){ return that.yScale(d.value); })
            .curve(d3.curveMonotoneX)

        //Append graph to placeholder
        let graph = d3.select("#container").append("svg")
            .attr("height", height)
            .attr("width", width)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 800 600")
            .attr("id", "graph")
            .append("g")
        this.path = graph.append('path').attr("stroke-linecap","round")

            
        //Y Axis
        this.axis = graph.append("g").attr('class', 'axis');
        
    }

};


</script>

<style lang="scss">
    @import './assets/styles.css';
</style>