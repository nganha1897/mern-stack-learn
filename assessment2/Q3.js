//3. Print the last name through destructuring and add a contact number:9119119110 as well
const person = {
    userDetails :{
        first: "FirstName",
        last: "LastName"
    }
}

let { userDetails: {first, last}, contact = "9119119110" } = person
console.log("Last name: ", last, "; Contact: ", contact)
