/**
 * Goals.js
 * Compile all actions and goals and return Goals module
 *
 * Author: Nicholas Frees
 * Date: 11/23/2014
 *
 * @module Anslem.scripts
 * @requires compileActions
 */
var Actions = require('./compileActions');

/**
 * Goals
 *
 * @class Goals
 * @static
 */
var Goals = {};
/**
 * EatBrains.js
 * Eat Brains
 *
 * @property EatBrains
 * @for Goals
 * @type {Object}
 */
Goals.EatBrains = {
    description: "Eat brains",
    label: "Eat brains",
    getAction: function () {
        return false;
    }
};
/**
 * PlayerInput
 *
 * @property PlayerInput
 * @for Goals
 * @type {Object}
 */
Goals.PlayerInput = {
    description: "PlayerInput",
    label: "Player Goal",
    getAction: function () {
        // Desktop Controls
        if (this.ySpeed === 0 && this.inputs.events.keydown.W) {
            return new Actions.Jump();
        } else if (this.inputs.keyboard.A) {
            return new Actions.Move({dir: -1});
        } else if (this.inputs.keyboard.D) {
            return new Actions.Move({dir: 1});
        }

        // Mobile controls
        if (this.ySpeed === 0 && this.inputs.events.swipe.up) {
            return new Actions.Jump();
        } else if (this.inputs.touches[0]) {
            if ((this.inputs.touches[0].x * this.view.scale) + this.view.x > this.x) {
                return new Actions.Move({dir: 1});
            } else if ((this.inputs.touches[0].x * this.view.scale) + this.view.x < this.x) {
                return new Actions.Move({dir: -1});
            }
        }

        // No action
        return false;
    }
};
module.exports = Goals;