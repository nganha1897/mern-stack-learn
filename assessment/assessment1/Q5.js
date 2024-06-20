// Example on closure 
// Inner function getAddress can access variable address from outer function getHouse,
// restricting outsiders from accessing private information
function getHouse() {
  var address = "abc st"
  var keyPin = 1234 // private and cannot be accessed from outside

  var getAddress = function() {
    console.log("Address is ", address)
  }
  return getAddress;
}

var getAddress = getHouse()
getAddress();

//  Example on object
// object school 
const school = {
  address: "abc st",
  headmaster: "John Doe",
  level: "High School"
}

console.log(school)

// Example on prototype
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function() {
  console.log("Woof Woof")
}

const dog = new Dog('Sebastian')
dog.bark()