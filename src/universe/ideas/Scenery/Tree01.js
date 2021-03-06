/**
 * Tree01
 *
 * @module Anslem.Universe
 */

/**
 * Tree01
 *
 * @class Tree01
 * @constructor
 * @extends Idea
 */
function Tree01() {
    Landscape.call(this);

    /**
     * Categories
     *
     * @property categories
     * @type {Array}
     */
    this.categories.push('tree');

    /**
     * Depth
     *
     * @property z
     * @type {Number}
     */
    this.z = 250;

    /*
     * Tree01 defaults
     */
    this.setSprite("tree02");
}
Tree01.prototype = new Landscape();
Tree01.prototype.constructor = Tree01;

Anslem.Tree01 = Tree01;