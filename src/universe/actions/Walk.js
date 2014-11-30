/**
 * Walk
 *
 * @class Walk
 * @constructor
 * @for Actions
 * @param {Object} params direction to move, {dir: 1 || -1}
 */
Actions.Walk = function Walk(params) {
    this.description = "Walk";
    this.label = "Walk";
    this.params = params;
    this.progress = 0;
    this.speed = 1;
    Walk.prototype.run = function (params) {
        this.facing = params.dir;

        if ((this.xSpeed < this.stats.speed && params.dir === 1) || (this.xSpeed > -this.stats.speed && params.dir === -1))
            this.xSpeed += (params.dir * this.stats.accel);
    };
    Walk.prototype.updateAnimation = function () {
        if (this.ySpeed !== 0)
            this.setAnimation("jump");
        else
            this.setAnimation("walk", this.sprite.src["walk"].frameSpeed * (Math.abs(this.xSpeed) / this.stats.speed));
    };
};