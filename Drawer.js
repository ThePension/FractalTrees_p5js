class Drawer {
  drawLine(pos1, pos2, color, strokeW){
    fill(color);
    stroke(color);
    strokeWeight(strokeW);
    line(pos1.x, pos1.y, pos2.x, pos2.y);
  }
    
  drawCircle(pos, diameter, color){
    stroke(color);
    fill(color);
    circle(pos.x, pos.y, diameter);
  }
}