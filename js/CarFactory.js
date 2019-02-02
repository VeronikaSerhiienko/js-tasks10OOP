function CarFactory(brand, yearRelease, mileage, color, isIgnition, amountPetrol) {
  this.brand = brand;
  this.yearRelease = yearRelease;
  this.mileage = mileage;
  this.color = color;
  this.isIgnition = isIgnition;
  this.amountPetrol = amountPetrol;
}

CarFactory.prototype = {
  constructor : CarFactory,

  ignition: function() {
    this.isIgnition = true;
  },

  start: function() {
    if (this.isIgnition) {
      console.log(this.color.slice(0,1).toUpperCase() + this.color.slice(1).toLowerCase()  + " car " + this.brand +" has run!");
    } else {
      console.log("Turn on ignition first!");
    }
  },

  stop: function() {
    if (this.isIgnition) {
      this.isIgnition = false;
      console.log("Car has stopped");
    } else {
      console.log("Ignition was turned off");
    }
  },
  
  isPetrol: function() {
    if (this.amountPetrol > 0) { 
      this.ignition(); 
    } else {
      console.log("Petrol tank is empty");
    }
  },

  toTankUp: function() {
    this.amountPetrol = 10;
    console.log("Car is tanked up");
  }
};

var car1 = new CarFactory('toyota', '1995','34000', 'red', false, '6');
console.log(car1);
var car2 = new CarFactory('bmw', '1990','374000', 'blue', true, '3');
console.log(car2);
var car3 = new CarFactory('audi', '1998','78900', 'green', true, '10');
console.log(car3);
car2.ignition();
car2.start();
car2.stop();
car2.isPetrol();
car2.toTankUp();