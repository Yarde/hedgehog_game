import {Sides, Trait} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor() {
        super('pendulumMove');
        this.enabled = true;
        this.speed = -100;
        this.dir = 1;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
            this.dir = -this.dir;
        }
    }

    update(entity, deltaTime) {
        if (this.enabled) {
            entity.vel.x = this.speed;
        }
    }
}
