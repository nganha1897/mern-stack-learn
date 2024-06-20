function add(num1, num2, num3) {
  return num1 + num2 + num3
}

console.log(add(2,3,4)) // provide all three parameters as number - result is 9

console.log(add(2)) // does not provide all 3 parameters so parameter 2
// and parameter 3 are set to undefined, so result is NaN (Not a number)

console.log(add(2.3,3)) // does not provide all 3 parameters so
// parameter 3 are set to undefined, so result is NaN (Not a number)

console.log(add("first", 2, "three")) // we are adding string and number here, 
// so concatenation happens and each parameter is concatenated with one another
// based on order. So the result is first2three