function prepLineChart(parentID,sourceData){
    let chartData = sourceData.bpi
    let xFromData = d => d.date
    let yFromData = d => d.value

    return new Promise ((res,rej) => {
        const div = d3.select(parentID);
        const margin = {
            top:20,
            right:20,
            bottom:30,
            left:50
        };
        const {width, height} = getWidthandHeight(div,margin)

        div.attr('width',width)
            .attr('height',height);
            
        let svg = appendToParent(div,'svg','svgWrapper',`translate(${margin.left},${margin.top})`)
            .attr('height',height)
            .attr('width',width);
    
        // .attrs({
            //     height :height,
            //     width: width
            // })
            // group element
        let g = appendToParent(svg,'g','gWrapper',`translate(${margin.left},${margin.top})`)
        

        xScale = d3.scaleTime()
            .domain(d3.extent(chartData,xFromData))
            .range([0,width-margin.right]);
        yScale = d3.scaleLinear()
            .domain(d3.extent(chartData, yFromData))
            .range([height - margin.bottom - margin.top, margin.top]);
        let xAxis = appendToParent(g,'g','xAxis',`translate(0,${height-margin.bottom - margin.top})`)
              .style("font-size", "18px")

            .call(d3.axisBottom(xScale));
        let yAxis = appendToParent(g,'g','yAxis',null)
            .style("font-size", "16px")
            .call(d3.axisLeft(yScale));
        
        //     var bisect = d3.bisector(function(d) { return xFromData; }).left;

        // var focus = svg
        //     .append('g')
        //     .append('circle')
        //       .style("fill", "none")
        //       .attr("stroke", "Blue")
        //       .attr('r', 5)
        //       .style("opacity", 0)
        
        // var focusText = svg
        //     .append('g')
        //     .append('text')
        //       .style("opacity", 0)
        //       .attr("text-anchor", "left")
        //       .attr("alignment-baseline", "middle")
        // svg
        //       .append('rect')
        //       .style("fill", "none")
        //       .style("pointer-events", "all")
        //       .attr('width', width)
        //       .attr('height', height)
        //       .on('mouseover', mouseover)
        //       .on('mousemove', mousemove)
        //       .on('mouseout', mouseout);
          
            // Add the line
        //   Mouse over
            // What happens when the mouse move -> show the annotations at the right positions.
            // function mouseover() {
            //   focus.style("opacity", 1)
            //   focusText.style("opacity",1)
            // }
            // xScale.invert(d3.mouse(this)[0])
            // function mousemove() {
           
            //     let m = {x: d3.mouse(this)[0],y :d3.mouse(this)[1] };   
            //     // recover coordinate we need
            //   var x0 = xFromData.invert(d3.mouse(this)[0]);
            //   var i = bisect(d, x0, 1);
            //   selectedData = d[i]
            //   focus
            //     .attr("cx", xFromData(selectedData.xFromData))
            //     .attr("cy", yFromData(selectedData.yFromData))
            //   focusText
            //     .html("x:" + selectedData.xFromData+ "  -  " + "y:" + selectedData.y)
            //     .attr("x", xFromData(selectedData.xFromData)+15)
            //     .attr("y", yFromData(selectedData.yFromData))
            //   }
            // function mouseout() {
            //   focus.style("opacity", 0)
            //   focusText.style("opacity", 0)
            // }
                  
    
        res(sourceData);
    })
}