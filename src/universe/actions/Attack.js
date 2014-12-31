/**
 * Attack with whatever I am holding
 *
 * @module Anslem.Universe.Actions
 * @class Attack
 * @constructor
 * @param {Object} params {dir: 1 || -1, target: {Idea}}
 * @param {Number} speed modifier
 */
function Attack(params, speed) {
    this.id = actionIdCounter++;
    this.description = "Attack";
    this.label = "Attack";
    this.params = params;
    this.progress = 0;
    this.speed = 30 * (speed || 1);
    Attack.prototype.run = function (params) {
        if (this.action.progress === 0) {
            this.facing = params.dir;
            this.xSpeed += (this.stats.strength / this.width) * params.dir * 5;
            this.ySpeed -= ((this.stats.strength / this.width) * params.dir * 15);
        }
        var hit = params.target ? (this.collides(params.target.bbox()) ? params.target : false) : this.instancePlace("physical", this.x + ((this.width / 2) * params.dir), this.y);
        if (hit && hit.immunityTimeout === 0) {
            hit.interrupt = true;
            hit.action = new Actions.Flinch({dir: params.dir, strength: this.stats.strength});
            hit.immunityTimeout = this.action.speed;
        }
    };
    Attack.prototype.updateAnimation = function () {
        this.setAnimation("attack");
        if (this.sprite.animation === "attack")
            this.sprite.frameSpeed = this.sprite.frameCount / this.action.speed;
    };
}
Actions.Attack = Attack;