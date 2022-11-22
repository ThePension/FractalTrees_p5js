// We use to module pattern to encapsulate private members on an object

// Sources : https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript

const Singleton = (function(){
  let drawerInstance = null; // Shared instance of Drawer
  
  return {
    getDrawer: () => {
      // If the Drawer's instance hasn't been instanciated yet
      if(drawerInstance == null){
        // Create a new Drawer as the shared instance
        drawerInstance = new Drawer();
      }
      return drawerInstance;
    }
  }
})();