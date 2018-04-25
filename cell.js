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


25,-43
-25,-43
-50,0
-25,43
25,43
50,0

radius 25
{x:-13, y:-22},
{x:12,   y:-22},
{x:25,  y:0},
{x:12,  y:22},
{x:-12, y:22},
{x:-25,  y:0}


radius 45
{x:-23, y:-39},
{x:22,   y:-39},
{x:45,  y:0},
{x:22,  y:39},
{x:-22, y:39},
{x:-45,  y:0}
*/



function Cell(i,j){
  this.coordinates =
  [
    {x:-13, y:-22},
    {x:12,   y:-22},
    {x:25,  y:0},
    {x:12,  y:22},
    {x:-12, y:22},
    {x:-25,  y:0}

  ];
  this.offset=[
    {x:-10, y:-17},
    {x:10,   y:-17},
    {x:20,  y:0},
    {x:10,  y:17},
    {x:-10,  y:17},
    {x:-20, y:0}
  ]
  this.neighbours=[];
  this.walls = [];
  this.x=floor(i);
  this.y=floor(j);
  this.visited=false;

  this.f=Infinity;
  this.g=Infinity;
  this.h=0;
  this.previous=undefined;



}

Cell.prototype.getNotVisitedNeighbours=function() {
  var arr=[];
  for(var i=0; i<this.neighbours.length; i++){
    if(this.neighbours[i]!=null && grid[this.neighbours[i]].visited==false)
    {
      arr.push(this.neighbours[i]);
    }
  }

  //  console.log(arr);
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
    return n[num];
  }

}


Cell.prototype.show = function (count,color) {

  //  fill(200,100,100,3);

  stroke(color);
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

Cell.prototype.fill = function (c, color, strokeColor) {

  push();

  translate(this.x, this.y);
  if(this.visited)
  {
    //noFill();

    fill(color);
    if(strokeColor!=null)
    stroke(strokeColor)
    else
    stroke(color);
  }
  else {
    fill(67,59,103);
    stroke(67,59,103);
  }

  beginShape();
  for(var i=0; i<this.offset.length; i++)
  {
    vertex(this.offset[i].x,this.offset[i].y);
    //text((this.coordinates[i].x)+", "+(this.coordinates[i].y),this.coordinates[i].x,(this.coordinates[i].y));
  }
  endShape(CLOSE);

  pop();


};
