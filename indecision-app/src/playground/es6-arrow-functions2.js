//arguments objects - no longer bound with arrow function
// this keyword also no longer bound with arrow function

const add = function(x, y){
  console.log(arguments);
  return x + y;
}

//arguments cannot be used with es6 arrow function
const arrowadd = (x, y) => {
  return x+y;
}

console.log(add(50, 1));

const user = {
  name: "Ryan",
  cities: ["london", "swiss", "paris"],
  printPlacesLives: function(){
    const name = this.name;
    this.cities.forEach(function(city){
      //console.log(this.name + '' + "has lived in" + city);
      console.log(name + ' ' + "has lived in " + city);
    });
  },
  arrowFuncPlaceLives: function(){
    this.cities.forEach((city) => {
      console.log(this.name + ' has lived in ' + city);
    });
  },
  // es6 function methods
  printPlacesLivesMap(){
    return this.cities.map((city) => (this.name + ' has lived in ' + city));
  }
}

user.printPlacesLives()
user.arrowFuncPlaceLives();
console.log(user.printPlacesLivesMap());
