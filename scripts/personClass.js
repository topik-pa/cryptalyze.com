export default class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  printData () {
    console.log(`My name is ${this.name}, I have ${this.age} years old`)
  }
}
