// Abstract class based on : https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript

class Component {
  constructor(pos) {
    if (this.constructor == Component) {
      throw new TypeError(
        'Abtract class "Component" cannot be instantiated directly.'
      );
    }

    if (this.draw === undefined) {
      throw new TypeError(
        'Classes extending the abstract class "Component" must contain "draw()"'
      );
    }

    if (this.update === undefined) {
      throw new TypeError(
        'Classes extending the abstract class "Component" must contain "update()"'
      );
    }

    this.pos = pos;
        
    // Get drawer instance with singleton
    this.drawer = Singleton.getDrawer();
  }
}
