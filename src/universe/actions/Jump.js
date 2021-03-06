/**
 * Jump
 *
 * @module Anslem.Universe.Actions
 * @class Jump
 * @constructor
 * @param {Object} params {dir: 1|-1|-}
 */
function Jump(params) {
    this.id = actionIdCounter++;
    this.description = "Jump";
    this.label = "Jump";
    this.params = params;
    this.progress = 0;
    this.speed = 5;
    Jump.prototype.run = function (params) {
        if (Math.abs(this.xSpeed) < this.stats.speed)
            this.xSpeed += ((this.stats.accel + this.linearDampening) * params.dir * 0.75);
        this.ySpeed -= (this.onSolid ? this.stats.jump : this.gravity * 0.5);
    };
    Jump.prototype.updateAnimation = function () {
        this.setAnimation("jump");
    };
}
Actions.Jump = Jump;