//5. What is the difference between for-of and for-in show with examples
// for-in loop is used to iterate over json objects with key values

let student = {
  name: "A",
  grade: 10,
  age: 15
}

for (const key in student) {
  console.log(`${key}: ${student[key]}`)
}

// for-of is mainly used to loop through arrays (not recommended for array of objects)
let num = [1,2,3]

for (const n of num) {
  console.log(n)
}