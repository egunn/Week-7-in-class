/*Start by setting up the canvas */
var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

var dataset1 = [
    {x:100, y:300, name:"red", r:50, color:"red"},
    {x:400, y:300, name:"blue", r:50, color:"blue"},
    {x:800, y:300, name:"green", r:50, color:"green"}
];

var dataset2 = [
    {x:150, y:300, name:"red", r:80, color:"red"},
    {x:450, y:300, name:"green", r:100, color:"green"}
];

var dataset3 = [
    {x:100, y:300, name:"yellow", r:20, color:"yellow"},
    {x:400, y:300, name:"blue", r:30, color:"blue"},
    {x:800, y:300, name:"green", r:20, color:"green"},
    {x:800, y:500, name:"purple", r:30, color:"purple"}
];


//TASK 1.1: represent dataset 1 using <circle>

//redo tasks as one block of code using enter() update() exit()


//set up buttons to respond on click. Each button has an id definition in HTML
d3.selectAll('.btn').on('click', function(){
    //when clicked, do something
    console.log("click event");

    //find id of button being clicked
    var id = d3.select(this).attr('id');  //d3.select(this) "This" refers to the button being clicked (in this case)
    //"this" is a reserved term that references the object of the user interaction.
    console.log(id);

    //check value of id, and draw applic dataset
    //need to ensure that there is always a 1:1 relation between DOM and data. Use enter exit update for this
    if (id =="btn-1"){
        //call a function to draw dataset1
        draw(dataset1);
    }

    else if (id == "btn-2"){
        //draw dataset2
        draw(dataset2);
    }

    else {
        //draw dataset3
        draw(dataset3);
    }
});

    function draw(dataArray) {
        var nodes = plot.selectAll('.node') //selects however many are there.
            .data(dataArray, function(d){return d.name;});  //elements in dataset will vary depending on user selection

        nodes.enter()  //unknown size (depends on history)
            .append('circle')
            .attr('class', 'node') //important so that selection finds "node" items second time that it's run - need to find old elements from prev runs
            .attr('r',0);

        nodes.exit()
            //if you implement a transition before removing, it will run before the remove command (fade out - set opacity to 0, then remove)
            .remove();
            //.style('stroke', 'black')
            //.style('stroke-weight',"3px");

        nodes//accesses update selection, also updates the enter set.
            .transition()//accepts callback with index i, so you can do transition one by one (new circles appearing, etc.
            .delay(function(d,i){
                return i*500;
            })
            .duration(1000)
            .attr('r',function(d) {return d.r})
            .attr('cx',function(d) {return d.x})
            .attr('cy',function(d) {return d.y})
            .style('fill', function(d) {return d.color});

    }






/*plot.selectAll('.node')  //node can be anything - look on canvas for class defn .node - retn empty selection
    .data(dataset1)  //create 3 empty placeholders
    .enter()
    .append('circle')
    .attr('class','node')
    .style('cx', function(d){return d.x;})
    .style('cy', function(d) {return d.y;})
    .attr('r', function (d) {return d.r;})
    .style('fill',function(d) {return d.color;});
*/


//TASK 1.2: represent dataset 2 using <g>, containing <rect> and <text>
/*var groups = plot.selectAll('.group')
    .data(dataset2)
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('transform', function(d) {return 'translate('+ d.x +',' + d.y +')'});

groups.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .style('fill',function(d) {return d.color;});

groups.append('text')
    .text(function(d){return d.name});

    */




//TASK 2: Use enter/exit/update to toggle between these three datasets

//TASK 3: Use enter/exit/udpate, and ensure object constancy
