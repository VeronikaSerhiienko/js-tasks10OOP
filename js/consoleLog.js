var transport = {
  stop: null
};
var car = {
  stop: true
};
car.__proto__ = transport;

console.log(car.stop); // ? (1)
console.log('true, take stop method from car');
delete car.stop;
console.log('delete car  stop method');
console.log(car.stop); // ? (2)
console.log('null, car take  stop method from transport');
delete transport.stop;
console.log('delete transport  stop method');
console.log(car.stop); // ? (3)
console.log('underfined, nobody has stop method');