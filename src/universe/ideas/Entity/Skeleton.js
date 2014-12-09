/**
 * Skeleton
 *
 * @module Anslem.Universe
 */

/**
 * Player
 *
 * @class Skeleton
 * @constructor
 * @extends Entity
 */
function Skeleton() {
    Entity.call(this);
    /**
     * Basic driving goal
     *
     * @property baseGoal
     * @type {Goal}
     */
    this.baseGoal = Goals.EatBrains;

    /**
     * Categories
     *
     * @property categories
     * @type {Array}
     */
    this.categories.push('undead');

    /*
     * Skeleton defaults
     */
    this.setSprite("skeleton");
    this.stats.speed *= 0.25;
}
Skeleton.prototype = new Entity();
Skeleton.prototype.constructor = Entity;

Anslem.Skeleton = Skeleton;