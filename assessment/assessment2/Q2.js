//2. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)

function multiply(...n) {
  let ans = 1
  ans = n.reduce((prevVal, curVal) => prevVal * curVal, 1)
  return ans
}

let numList = [1,2,3,4]
console.log(multiply(...numList))
