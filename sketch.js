//Author: Anshika Kaythwas
//Image reference : https://d33wubrfki0l68.cloudfront.net/d64fc7cbb4053fd09e8af797fdd123c58e709d23/f561b/img/blog/2013/heatmap-in-d3/hexagon_dimensions.png
//Vertices calculator :https://www.mathopenref.com/coordpolycalc.html
var grid=[];
var temp=[];
var rows=35;
var cols=33;
//var rows=17;
//var cols=15;
var w;
var h;
var r=25;
//var r=50;
var d=r*2;
var startX=70;
var startY=70;
var f1=0.76;
var f2=0.422;
var curr;

var neighbours = [-1,16,17,1,-16,-17]; //35x33
//var neighbours = [-1,7,8,1,-7,-8]; //17x15
//var neighbours = [-1,19,20,1,-20,-19]; // for 41x45
var nc=  [
	{x:0			,   y:f2*d*2	},
	{x:-f1*d	,  	y:f2*d		},
	{x:-(f1*d),  	y:-f2*d		},
	{x:0			,  	y:-f2*d*2	},
	{x:f1*d		, 	y:-f2*d		},
	{x:f1*d		, 	y:f2*d		}
];
var current;
var stack=[];
var isStart=true;

function removeWalls(a,b){


	for(var j=0;j<neighbours.length;j++){
		if(neighbours[j]==(a-b))
			{
				grid[b].walls[j]=false;
				if((j-3)>=0)
					{
						grid[a].walls[(j-3)]=false;
					}
				else {
					grid[a].walls[(j+3)%6 ]=false;
				}
				break;
			}
	}

}
function setup() {
	r=r*sqrt(3)/2;

	createCanvas(windowWidth, windowHeight);
	w=windowWidth;
	h=windowHeight;
	background(0);

	var count=0;
	for(var i=0;i<rows;i++){
		var c;
		for(var j=0;j<cols;j++){
			c=null;
			if(i%2==0 && j%2==1)
			c= new Cell(floor(startX+(f1*d)*i),floor(startY+(f2*d)*j));
			else if(i%2==1 && j%2==0)
			c= new Cell(floor(startX+(f1*d)*i),floor(startY+(f2*d)*j));

			if(c!=null){
				count++;
				grid.push(c);
			}


		}
	}

//	populating neighbours
	for(var i=0;i<grid.length;i++){

		for(var j=0;j< neighbours.length;j++){
			var n=grid[i+neighbours[j]];
			if(n!=undefined )
			{
				var distance=dist(grid[i].x,grid[i].y,n.x,n.y);
				var diff=abs(floor(distance-(r*2)));
				if(diff<=3)
				grid[i].neighbours.push(i+neighbours[j]);
				else {
					grid[i].neighbours.push(null);
				}
			}
			else
				grid[i].neighbours.push(null);
		}

		for(var k=0;k<6;k++){
			grid[i].walls.push(true);
		}
	}

	current=0;
	grid[current].visited=true;

	start= grid[0];
  end=grid[count-1];
  openSet.push(start);

	isStart=true;

}

function draw() {


	background(0);

	for(var i=0;i<grid.length;i++){
		grid[i].fill(i,color(0));
		grid[i].show(i, color(255,255,255));
	}
	// for(var i=0;i<openSet.length;i++){
	// 	openSet[i].fill(i,color(234,200,32));
	// //	grid[i].show(i, color(255,255,255));
	// }
	// for(var i=0;i<closedSet.length;i++){
	// 	closedSet[i].fill(i,color(20,200,32));
	// //	grid[i].show(i, color(255,255,255));
	// }
	path = [];
	var temp = curr;
	if(temp!=null){
		path.push(temp);
		temp.fill(i,color(50,70,255));
		while (temp.previous) {
			stroke(255);
			strokeWeight(2);
			temp.previous.fill(i,color(50,70,255));
			line(temp.x,temp.y,temp.previous.x,temp.previous.y);
			path.push(temp.previous);
			temp = temp.previous;
		}
	}
	if(curr==end){
		noLoop();
	}


if(stack.length>0 || isStart==true){
	var next = grid[current].checkNeighbours();
  if (next) {

		// STEP 1
    grid[next].visited = true;

    // STEP 2
    stack.push(current);
		isStart =false;

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }


}else if(stack.length==0){

	solve();


}


}
