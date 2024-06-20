//9. Create two objects with some properties and merge them using Object method and ES6 way

const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 30
}

const person2 = {
  occupation: "Software Engineer",
  city: "New York"
};

// Using Object.assign()
const mergedObject1 = Object.assign(person1, person2);
console.log("Merged object using Object.assign():", mergedObject1);

// Using the spread operator
const mergedObject2 = { ...person1, ...person2 };
console.log("Merged object using spread operator:", mergedObject2);