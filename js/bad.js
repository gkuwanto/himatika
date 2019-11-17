async function main() {
    let data = await d3.json('data.json');
    const divisi = unique(data.map(data=>data.divisi))
    const bulan = unique(data.map(data=>data.bulan))
    const tanggal = unique(data.map(data=>new Date(data.tanggal).getTime()));
    let sum
    const saldo = data.map(data=>data.net).map(elem => sum = (sum || 0) + elem);
    console.log(saldo)
    console.log(tanggal)
    console.log(bulan)
    console.log(divisi)
    var width = 200,
    height = 300,
    padding = 16;

    var svg = d3.select("#svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    data = saldo
    var xScale = d3.scaleBand()
        .domain(data)
        .range([padding * 2, width - padding])
        .padding(0.2);

    var yScale = d3.scaleLinear()
        .domain([tanggal[0], d3.max(tanggal, d => d)])
        .range([height - padding, padding]);

    var bars = svg.selectAll(".bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d))
        .attr("height", d => height - padding - yScale(d))
        .attr("fill", (d => d3.select("#slider").node().value == d ? "firebrick" : "teal"));

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var gX = svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    var gY = svg.append("g")
        .attr("transform", "translate(" + padding * 2 + ",0)")
        .call(yAxis);

    d3.select("#slider").on("input", function() {
        var currentValue = this.value;
        yScale.domain([0, currentValue * 2])
        bars.attr("y", d => yScale(d))
            .attr("height", d => height - padding - yScale(d))
            .attr("fill", (d => currentValue == d ? "firebrick" : "teal"));
        gY.call(yAxis);
    })
}
function unique(array) {
    return array.filter((v, i, self)=> self.indexOf(v)==i)
}

main();

