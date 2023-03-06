const {Item} = require("./item.js");

class Light extends Item {
    constructor(name, description) {
        super(name, description);
    }
}


// -----
module.exports = {
  Light,
};
