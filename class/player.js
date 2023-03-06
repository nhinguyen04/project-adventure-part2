const {Character} = require('./character');
const { DarkRoom } = require('./darkroom');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const {Light} = require('./light');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // check if item in room
    let item = this.currentRoom.getItemByName(itemName);
    // if yes, pick up item
    if (item !== undefined) {
      // put in inventory
      this.items.push(item);
    }
    // if not, say item doesn't exist
    else {
      console.log("No such item in room.");
    }
  }

  dropItem(itemName) {
    const item = this.getItemByName(itemName);

    if (item !== undefined) {
      // drop into room
      this.currentRoom.items.push(item);
    }

    // if not, say doesn't exist
    else {
      console.log("No such item in room.");
    }
  }

  eatItem(itemName) {
    const item = this.getItemByName(itemName);

    // check if item is food
    if (item instanceof Food) {
      // eat yum yum
      // do nothing in code
    } else {
      // return to inventory
      this.items.push(item);
      console.log("Definitely not edible.");
    }

  }

  getItemByName(name) {
    let itemIndex;

    for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.name === name) { itemIndex = i; }
    }

    const item = this.items.splice(itemIndex, 1);
    return item[0];

  }

  hit(name) {
    const enemy = this.currentRoom.getEnemyByName(name);
    const damage = 20;
    // check if enemy (name) is in room
    if (enemy) {
      // apply hit
      enemy.applyDamage(damage); // will be modified
    } else {
      console.log("No such enemy in room.");
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
