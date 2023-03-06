const { expect } = require('chai');

const { DarkRoom } = require("../class/darkroom.js");
const { Light } = require("../class/light.js");
const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");

const {World} = require("../class/world.js");

const {Character} = require("../class/character.js");
const {Enemy} = require("../class/enemy.js");

describe("DarkRoom", function () {

    let character;
    let darkRoom;
    let light;

    beforeEach(function() {
        darkRoom =  new DarkRoom("Test DarkRoom");
        light = new Light("light", "just a simple fire");
        character = new Character('Character', 'an ordinary character', darkRoom);
        // character.items.push(light);
    });

    it("should have a name and description should default to 'You cannot see anything'", function () {
        expect(darkRoom.name).to.equal("Test DarkRoom");
        expect(darkRoom.description).to.equal("You cannot see anything");
    });

    // inherits from room
    it("should be an instance of room", function () {
        expect(darkRoom instanceof Room).to.be.true;
    });

    it("should change description upon having light in the room", function () {
        character.items.push(light);
        character.die();

        expect(darkRoom.description).to.equal("The room is lit up");
    });
});

describe("Light", function () {

    let light;

    beforeEach(function () {
        light = new Light("light", "just a simple fire");
    });

    it("should have a name and description attributes", function () {
        expect(light.name).to.equal("light");
        expect(light.description).to.equal("just a simple fire");
    });

   // inherits from item
    it("should be an instance of item", function () {
        expect(light instanceof Item).to.be.true;
    });
});
