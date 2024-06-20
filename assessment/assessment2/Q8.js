//8. create an example showing usage of short hand and default param.

//short hand
let chicken="wings",
coca="cola"

let food = {chicken, coca}
console.log(food)

//defaultParam
function getDrink(bubble="tea", lemon="juice") {
  return {bubble, lemon}
}

console.log(getDrink())