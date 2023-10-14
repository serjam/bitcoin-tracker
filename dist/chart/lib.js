let xScale = null,yScale = null;

function getWidthandHeight(obj,m){
    let width = +obj.attr("width");
    let height = +obj.attr("height");
    return {width,height}
}
function appendToParent(parent,type,className,transformation){
    return parent.append(type)
        .attr('class',className)
        .attr('transform',transformation);
}
function handleLineUpdate(data){

    let lineObj = d3.line()
        .x(d=> xScale(d.date))
        .y(d=> yScale(d.value))
// Using curve we can change this aswell
        .curve(d3.curveBasis)
    d3.select('.gWrapper')
        .append('path')
        // .attr('fill',"none")
        .attr('fill', 'none')
        .attr('stroke','#173fad')
        .attr('stroke-width',4)
        .attr('class','path')
        .attr('d',lineObj(data.bpi));

                // })
}