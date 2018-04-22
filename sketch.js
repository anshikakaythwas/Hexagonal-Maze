//Author: Anshika Kaythwas
//Image reference : https://d33wubrfki0l68.cloudfront.net/d64fc7cbb4053fd09e8af797fdd123c58e709d23/f561b/img/blog/2013/heatmap-in-d3/hexagon_dimensions.png
//Vertices calculator :https://www.mathopenref.com/coordpolycalc.html
var grid=[];
var rows=17;
var cols=15;
var w;
var h;
var r=50;
var d=r*2;
var startX=100;
var startY=100;
var f1=0.77;
var f2=0.42;
var neighbours = [-1,7,8,1,-7,-8];
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

	//populating neighbours
	for(var i=0;i<grid.length;i++){

		for(var j=0;j< neighbours.length;j++){
			var n=grid[i+neighbours[j]];
			//console.log(n.x+" "+n.y+"  grid="+grid[i].x+" "+grid[i].y);
			if(n!=undefined )
			{
				var diffX=floor(grid[i].x-(n.x)-(nc[j].x));
				var diffY=floor(grid[i].y-(n.y)-(nc[j].y));
				console.log(j,diffX,diffY);
				if((diffX<10 && diffX>-10) && (diffY<10  && diffY>-10 ))
				grid[i].neighbours.push(i+neighbours[j]);
			}
			else
				grid[i].neighbours.push(null);
		}
		for(var k=0;k<6;k++){
			// if(grid[i].neighbours[k]!=null)
			// 	grid[i].walls.push(true);
			// else
			grid[i].walls.push(true);
		}
	}

	current=0;
	grid[current].visited=true;



}

function draw() {

	background(0);


	for(var i=0;i<grid.length;i++){
		grid[i].fill(i);
		grid[i].show(i);

	}

	var next = grid[current].checkNeighbours();
  if (next) {

		// STEP 1
    grid[next].visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else{
		noLoop();
	}

}
