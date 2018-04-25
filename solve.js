var openSet=[];
var closedSet=[];
var start;
var end;
var path=[];


function solve(){

  	//solve();

  	console.log("solve");
  	  if(openSet.length>0){

  	    var winner=0;
  	    for(var i=0;i<openSet.length;i++){
  	      if(openSet[i].f < openSet[winner].f)
  	        winner=i;
  	    }
  	    curr=openSet[winner];
  			if(curr===end)
  	    {
  	      //noLoop();
  	      console.log("DONE!!");
  	    }

  	    removeFromArray(openSet,curr);
  	    closedSet.push(curr);

  	    var neighboursForCurrent=curr.neighbours;
  	    for(var j=0;j< neighboursForCurrent.length;j++){
  	      var neighbour=neighboursForCurrent[j];

  	      if(neighbour!=null){

  	        if(!closedSet.includes(grid[neighbour]) && !hasWall(curr,grid[neighbour],j) ){
  	          var tempG= curr.g+ heuristic(curr,grid[neighbour]);

  	          // Is this a better path than before?
  	          var newPath = false;

  	          if(openSet.includes(grid[neighbour])){
  	            if(tempG< grid[neighbour].g)
  	              grid[neighbour].g=tempG;
  								newPath = true;
  	          }
  	          else{
  	            grid[neighbour].g=tempG;
  	            newPath=true;
  	            openSet.push(grid[neighbour]);
  	          }


  	        // Yes, it's a better path
  	        if (newPath) {
  	        grid[neighbour].h=heuristic(grid[neighbour],end);
  	        grid[neighbour].f= grid[neighbour].h+grid[neighbour].g;
  	        grid[neighbour].previous = curr;
  	        }

  	        }
  	      }

  	    }
  	  }
  	  else{
  			console.log("No solution");
  	    noLoop();

  	  }

}

function removeFromArray(arr, e){
  for(var i=arr.length-1;i>=0;i--){
    var c=arr[i];
    if(c.x==e.x && c.y==e.y )
      arr.splice(i,1);    //winner=i;
  }
}

function checkInArray(arr, e){
  for(var i=arr.length-1;i>=0;i--){
    var c=arr[i];
    if(c.x==e.x && c.y==e.y )
      return true;    //winner=i;
  }
  return false;
}
function getDist(a,b){
  return dist(a.x,a.y,b.x,b.y);
}

function heuristic(a,b){

  var distance= abs(a.x-b.x) + abs(a.y-b.y);

  return dist(a.x,a.y,b.x,b.y);
}

function hasWall(a,b,i){

console.log(a.x,a.y,b.x,b.y,i);
var wallForA=a.walls[i];
var wallForB=b.walls[(i+3)%6];


if(wallForA== true && wallForB==true){
  return true;
}
else return false;

}
