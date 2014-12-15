/**
 * Entity
 *
 * @module Anslem.Universe
 */

/**
 * Entity
 *
 * @class Entity
 * @constructor
 * @extends Idea
 */
function Entity() {
    Idea.call(this);
    /**
     * Current action
     *
     * @property action
     * @type {Action}
     */
    this.action = false;

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
    this.categories.push('alive');
    this.categories.push('entity');
    this.categories.push('physical');
    this.categories.push('visible');

    /**
     * Entity's current focus
     *
     * @property focus
     * @type {Object}
     */
    this.focus = false;

    /**
     * Current goal
     *
     * @property goal
     * @type {Goal}
     */
    this.goal = false;

    /**
     * Falling speed
     *
     * @property gravity
     * @type {Number}
     */
    this.gravity = UniverseConfig.gravity;

    /**
     * Object in view
     *
     * @property inView
     * @type {Array}
     */
    this.inView = {0: {}};

    /**
     * In view update interval
     *
     * @property inViewUpdateDelay
     * @type {Number}
     */
    this.inViewUpdateDelay = this.id % UniverseConfig.inViewUpdateDelay;

    /**
     * Memories
     *
     * @property memory
     * @type {Array}
     */
    this.memory = [];

    /**
     * Objects just noticed
     *
     * @property inViewAdded
     * @type {Array}
     */
    this.inViewAdded = {0: {}};

    /**
     * Objects just lost track of
     *
     * @property inViewRemoved
     * @type {Array}
     */
    this.inViewRemoved = {0: {}};

    /**
     * Stats
     *
     * @property
     * @type {Object}
     */
    this.stats = JSON.parse(JSON.stringify(UniverseConfig.defaultEntityStats));

    /**
     * Entities default to higher depth
     *
     * @property z
     * @type {Number}
     */
    this.z = 200;

    /**
     * Generate packet of information required
     * to render the self to send to client
     *
     * @method getPacket
     * @return {Object}
     */
    Entity.prototype.getPacket = function () {
        var packet = Idea.prototype.getPacket.call(this);
        packet.shadow = false;
        return packet;
    };

    /**
     * Return idea closest to given point
     *
     * @method instanceNearest
     * @param {String} category
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} includeDistant search outside of view
     * @return {Idea}
     */
    Entity.prototype.instanceNearest = function (category, x, y, includeDistant) {
        category = category || 0;
        this.x = x || this.x;
        this.y = y || this.y;
        if (includeDistant)
            return Idea.prototype.instanceNearest.call(this, category, x, y);
        var nearest = false;
        var dist = 1000000;
        for (var id in this.inView[category]) {
            var e = this.inView[category][id];
            if (e.id !== this.id) {
                var thisDist = this.distanceTo(e.x, e.y);
                if (thisDist < dist) {
                    nearest = e;
                    dist = thisDist;
                }
            }
        }
        return nearest;
    };

    /**
     * Return savable object
     *
     * @method load
     * @param {Object} src
     */
    Entity.prototype.load = function (src) {
        Idea.prototype.load.call(this, src);
        this.baseGoal = Goals[src.baseGoal];
        this.goal = src.goal ? Goals[src.goal] : false;
        this.stats = src.stats;
        return this;
    };

    /**
     * Runs single frame
     *
     * @method run
     */
    Entity.prototype.run = function () {
        Idea.prototype.run.call(this);

        // Update in view periodically
        this.inViewAdded = [];
        this.inViewRemoved = [];
        if (--this.inViewUpdateDelay <= 0) {
            if (this.container) {
                var newInView = {0: {}};
                for (var id in this.container.contents.visible) {
                    var idea = this.container.contents.visible[id];
                    if (this.distanceTo(idea.x, idea.y) < this.stats.perception) {
                        if (!this.inView[0][idea.id])
                            this.inViewAdded.push[idea];
                        else
                            delete this.inView[0][idea.id];
                        newInView[0][idea.id] = idea;
                        for (var index in idea.categories) {
                            if (!newInView[idea.categories[index]])
                                newInView[idea.categories[index]] = {};
                            newInView[idea.categories[index]][idea.id] = idea;
                        }
                    }
                }
                for (var id in this.inView[0])
                    this.inViewRemoved.push(this.inView[0][id]);
                this.inView = newInView;
            }
            this.inViewUpdateDelay = UniverseConfig.inViewUpdateDelay;
        }

        // Handle interupts
        if (this.inViewAdded.length > 0 || this.inViewRemoved.length > 0)
            this.goal = false;

        // Die if needed
        if (this.stats.health <= 0) {
            this.action = false;
            this.goal = false;
            this.baseGoal = Goals.Dead;
        }

        // Get new action if needed
        if (!this.action || this.action.progress >= this.action.speed) {
            this.goal = this.goal || this.baseGoal;
            this.action = this.goal ? this.goal.getAction.call(this) : false;
        }

        // Run the action
        if (this.action) {
            this.action.run.call(this, this.action.params);
            this.action.updateAnimation.call(this);
            this.action.progress++;
        }
    };

    /**
     * Return savable object
     *
     * @method toSimple
     * @returns {Object}
     */
    Entity.prototype.toSimple = function () {
        var simple = Idea.prototype.toSimple.call(this);
        simple.baseGoal = this.baseGoal.id;
        simple.stats = JSON.parse(JSON.stringify(this.stats));
        return simple;
    };
}
Entity.prototype = new Idea();
Entity.prototype.constructor = Entity;

Anslem.Entity = Entity;