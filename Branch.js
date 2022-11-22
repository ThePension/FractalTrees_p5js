class Branch extends Component {
  constructor(pos, depth, myColor, leafColor) {
    super(pos); // Call the parent constructor

    this.depth = depth;
    this.angle = 0;
    this.leafColor = leafColor;

    // Create empty array that will contains childrens
    this.childs = [];

    // Choose depth depending on depth
    this.len = map(this.depth, 0, maxDepth, maxLen, minLen);
    // Get random starting noise number (to avoid same movements pattern between differents branches)
    this.noise = random(-1000, 1000);
    
    // Set the color depending of the value of 'myColor'
    this.myColor = myColor;
    switch (myColor) {
      case 0:
        this.col = color(
          255,
          map(this.depth, 0, maxDepth, 0, 255),
          map(this.depth, 0, maxDepth, 0, 255)
        );
        break;
      case 1:
        this.col = color(
          map(this.depth, 0, maxDepth, 0, 255),
          255,
          map(this.depth, 0, maxDepth, 255, 0)
        );
        break;
      case 2:
        this.col = color(
          map(this.depth, 0, maxDepth, 128, 0),
          map(this.depth, 0, maxDepth, 0, 255),
          255
        );
        break;
    }

    // Set the strokeWeight depending on the depth
    this.strokeW = map(this.depth, 0, maxDepth, 4, 1);

    this.calculateEndPosition();

    // If the max depth is reached, create a Leaf
    if (this.depth >= maxDepth) this.childs.push(new Leaf(this.endPos, leafColor));
    // Else, create childrens
    else this.createChilds();

    this.update();
  }

  draw() {
    // Draw the line using the drawer instance (get with the singleton on the parent constructor)
    this.drawer.drawLine(this.pos, this.endPos, this.col, this.strokeW);

    // Draw every childs
    for (let child of this.childs) {
      child.draw();
    }
  }

  update() {
    // Get the noise
    this.noise += 0.003;
    this.angle = noise(this.noise) * -180;

    this.calculateEndPosition();

    // Foreach childs
    for (let child of this.childs) {
      // Update childs position
      child.pos = this.endPos;
      // Update childs
      child.update();
    }
  }

  createChilds() {
    for (let i = 0; i < maxChilds; i++) {
      if (random() > childProba) {
        this.childs.push(
          new Branch(
            this.endPos,
            this.depth + 1,
            this.myColor,
            this.leafColor
          )
        );
      }
    }

    // If there are no branches, create a leaf
    if (this.childs.length == 0) this.childs.push(new Leaf(this.endPos, this.leafColor));
  }

  calculateEndPosition() {
    this.endPos = createVector(
      this.pos.x + cos(this.angle) * this.len,
      this.pos.y + sin(this.angle) * this.len
    );
  }
}
