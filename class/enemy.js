const {Character} = require('./character');


class Enemy extends Character {
  constructor(name,
    description,
    currentRoom,
    items = [],
    strength = 10,
    health = 100,
    cooldown = 3000,
    attackTarget = null) {
    super(name, description, currentRoom, items, strength, health);

    this.cooldown = cooldown;
    this.attackTarget = attackTarget;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    if (this.cooldown === 0) {
      const room = this.currentRoom;
      // get random exit
      const exits = room.getExits();
      const randomExit = Math.floor(Math.random() * (exits.length));

      // set currentRoom to new room
      this.currentRoom = room.getRoomInDirection(exits[randomExit]);

      // reset cooldown
      this.cooldown = 3000;
    }
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const doTheThing = () => {
      this.cooldown = 0;
      this.act();
    }
    setTimeout(doTheThing, this.cooldown);
  }

  attack() {
    const damage = 10;
    console.log(`${this.name} prepares to strike ...`);
    this.attackTarget.applyDamage(damage); // damage can be modified

    // reset cooldown
    this.cooldown += 3000;
  }

  applyDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} was hit for ${amount} damage!`);

    // check if dead
    if (this.health <= 0) {
      this.die();
    } else {
      // if not dead, target player
      this.attackTarget = this.player;
      this.act();
    }
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.scratchNose();
    } else {
      if (this.player && this.player.currentRoom === this.currentRoom) {
        this.attack();
      }
    }
  }


  scratchNose() {
    this.cooldown -= 1500;

    this.alert(`${this.name} scratches its nose`);

  }
}

module.exports = {
  Enemy,
};
