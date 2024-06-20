// 1. How to preserve the immutability on my heroes list? Solve below problems using the same
// a. Get heroes who are not evils
// b. Print Unique family names
// c. Print Hero Names from given objects, and append sir in each of them before printing
// d. Do we have any hero in Marvel Family who is not evil

//Filter, map, some, reduce do not change the original list so it preserves immutability of heroes list
const heroes = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
]

//1a
let nonEvilHeroes = heroes.filter(hero => hero.isEvil===false)
console.log(nonEvilHeroes)

//1b
let uniqueName = heroes.reduce((prevVal, curVal, index, arr) => {
    prevVal[curVal.family] = prevVal[curVal.family] ? prevVal[curVal.family] + 1 : 1
    return prevVal
}, [])

console.log("Unique names: ", uniqueName)
//1c
let name = heroes.map(hero => {
  console.log("Sir " + hero.name)
}).filter(names => names != undefined)

//1d
let nonEvil = heroes.some(hero => hero.isEvil === false)
console.log("Do we have non-evil heroes: ", nonEvil)