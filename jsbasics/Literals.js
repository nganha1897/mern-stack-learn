//literals represent memory allocation of some/few values
//User1
var name = "Bryan"
var age = 99
var address = "Somewhere on earth"

//User2
var name2 = "Gauri"
var age2 = 98
var address2 = "Somewhere in US"

//Using Object Literals

var User = {
    name : "Wanda",
    age : 26,
    address : "Somewhere in Canada"
}

//when we need to read
var readName = User.name; 

//when we need to update
User.name = "David"

var User2 = User;

var User2 = {
    name : "David",
    age : 26,
    address : "Somewhere in Canada"
}