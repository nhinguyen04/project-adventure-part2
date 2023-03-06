const {Room} = require("../class/room.js");

class DarkRoom extends Room {
    constructor(name, description = "You cannot see anything") {
        super(name, description);
    }

    isLit() {
        this.description = "The room is lit up";
    }

    isDark() {
        this.description = "You cannot see anything";
    }
}


// -----
module.exports = {
    DarkRoom,
  };
