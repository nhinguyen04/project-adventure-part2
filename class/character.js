const { Room } = require("./room");

class Character {

  constructor(name, description, currentRoom, items = [], strength = 10, health = 100) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = items;
    this.strength = strength;
    this.health = health;
  }

  applyDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} was hit for ${amount} damage!`);

    // check if dead
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log(`${this.name} has been slain.`);
    // drop all held items
    this.items.forEach((ele) => {
      this.currentRoom.items.push(ele);
      console.log(`${ele} drops onto the floor.`);
    })
    this.items = [];

    // currentRoom set to null
    this.currentRoom = null;
  }

}



// -----
module.exports = {
  Character,
};
