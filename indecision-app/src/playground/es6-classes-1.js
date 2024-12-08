class Person{
  constructor(name = 'Anonymous', age = 0){
    this.name = name;
    this.age = age;
  }

  getGreeting(){
    //return 'Hi, I am ' + this.name;
    return `Hi. I am ${this.name}. `;
  }

  getDescription(){
    return `${this.name} is ${this.age} Years Old. `;
  }
}

class Student extends Person{
  constructor(name, age , major){
    super(name, age);
    this.major = major;
  }

  hasMajor(){
    return !!this.major;
  }

  getMajor(){
    return `${this.name} is major in ${this.major}`;
  }

  getDescription(){
    let description = super.getDescription(); //link to parent method

    if (this.hasMajor()){
      description += `Their major is ${this.major}`;
    }

    return description;
  }
}

class Traveler extends Person{
  constructor(name, age, location){
    super(name, age);
    this.location = location;
  }

  getGreeting(){
    let greeting = super.getGreeting();

    if(this.location){
      greeting += `I'm visiting from ${this.location}`;
    }

    return greeting;
  }
}

const me = new Person('Ryan', 26);
console.log(me.getDescription());

const random = new Person();
console.log(random.getDescription());

const friend = new Student('Hen', 30, 'Computer Science');
console.log(friend.getMajor());
console.log(friend.getDescription());

const stranger = new Traveler('James', 25, 'Netherland');

console.log(stranger.getGreeting());
