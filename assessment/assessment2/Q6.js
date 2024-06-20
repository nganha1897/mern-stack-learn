//6. Give me an example of bind and write its usage, comparison with arrow function

// bind is used to set context of "this" to the passed argument at time of creating function, whereas arrow functions
//copy context of is parent as its own context

//Ex of bind:
var student = {
  name: "A",
  age: 15
}

function printStudent() {
  console.log(this.name)
}

printStudentWithContext = printStudent.bind(student)
printStudentWithContext()