/*
radius 20
{x:-10, y:-17},
{x:10,   y:-17},
{x:20,  y:0},
{x:10,  y:17},
{x:-10,  y:17},
{x:-20, y:0}
*/
/*
radius 50
{x:-25, y:-43},
{x:25,   y:-43},
{x:50,  y:0},
{x:25,  y:43},
{x:-25,  y:43},
{x:-50, y:0}
*/

function Cell(i,j){
  this.coordinates =
  [
    {x:-25, y:-43},
    {x:25,   y:-43},
    {x:50,  y:0},
    {x:25,  y:43},
    {x:-25,  y:43},
    {x:-50, y:0}
  ];
  this.neighbours=[];
  this.walls = [];
  this.x=i;
  this.y=j;
  this.visited=false;



}

Cell.prototype.getNotVisitedNeighbours=function() {
  var arr=[];
  for(var i=0; i<this.neighbours.length; i++){
      if(this.neighbours[i]!=null && grid[this.neighbours[i]].visited==false)
      {
        arr.push(this.neighbours[i]);
      }
    }

    console.log(arr);
    if(arr.length==0)
      return null;
    else {
      return arr;
    }

}
Cell.prototype.checkNeighbours= function(){

var n=this.getNotVisitedNeighbours();
var num;
if(n==null)
  return null;
else{
    num=floor(random(n.length));
    //console.log(num);
    return n[num];
}

}


Cell.prototype.show = function (count) {

//  fill(200,100,100,3);

  stroke(255);
  strokeWeight(2);

  for(var i=0; i<this.coordinates.length; i++)
  {

    if(i!=(this.coordinates.length-1))
    {
    //  console.log(this.x+this.coordinates[i].x,this.y+this.coordinates[i].y,this.x+this.coordinates[i+1].x,this.y+this.coordinates[i+1].y);
      if(this.walls[i]!=null && this.walls[i]==true)
        line(this.x+this.coordinates[i].x,this.y+this.coordinates[i].y,this.x+this.coordinates[i+1].x,this.y+this.coordinates[i+1].y);
    }
    else {
      if(this.walls[i]!=null && this.walls[i]==true)
        line(this.x+this.coordinates[i].x,this.y+this.coordinates[i].y,this.x+this.coordinates[0].x,this.y+this.coordinates[0].y);
  }
  }

};

Cell.prototype.fill = function (c) {

  push();

  translate(this.x, this.y);
  if(this.visited)
    {
      fill(100,127,156);
      stroke(100,127,156);

     //stroke(255);
    }
  else {
    //noFill();
    fill(67,59,103);
    stroke(67,59,103);
//   stroke(255);
  }

  beginShape();
  for(var i=0; i<this.coordinates.length; i++)
  {
    vertex(this.coordinates[i].x,this.coordinates[i].y);
    //text((this.coordinates[i].x)+", "+(this.coordinates[i].y),this.coordinates[i].x,(this.coordinates[i].y));
  }
  endShape(CLOSE);
  //console.log((this.x)+", "+(this.y));
  //textSize(10);
  //text(c,-15,0);
  pop();

};
