console.log('destructuring');

const person = {
  name: 'Andrew',
  age: 25,
  location: {
    city: 'London',
    temp: 92
  }
};

const {name = 'Anonymous', age} = person;

console.log(`${name} is ${age}`);

const {city, temp: temperature} = person.location;
console.log(`It is ${temperature} in ${city}`);

const book = {
  title: 'Ego is the enemy',
  author: 'Ryan Holidays',
  publisher: {
    name: 'Penguin'
  }
};

const {name:publisherName='self-published'} = book.publisher;
console.log(publisherName);

//array destructuring

const address = ['26, Jalan Kenanga', 'Malaysia', 'Selangor', '52200'];
const [stressName, country, state] = address;

console.log(`You are in ${country}, ${state}`);

const [, itemTwo, itemThree, itemFour='Default'] = ['This is item one', 'This is item 2', 'This is item 3'];

console.log(`${itemThree}, ${itemTwo}, ${itemFour}`);
