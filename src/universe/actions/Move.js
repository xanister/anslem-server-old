/**
 * Move
 *
 * @method Move
 * @for Actions
 * @param {Object} params direction to move
 */
Actions.Move = function Move(params) {
    Move.description = "Move";
    Move.label = "Move";
    this.params = params;
    Move.prototype.run = function (params) {
        if ((this.xSpeed < this.stats.speed && params.dir === 1) || (this.xSpeed > -this.stats.speed && params.dir === -1))
            this.xSpeed += (params.dir * this.stats.accel);
    };
};