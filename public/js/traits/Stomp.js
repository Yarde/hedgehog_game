import {Trait} from '../Entity.js';

export default class Stomp extends Trait {
    constructor() {
        super('stomp');
        this.bounceSpeed = 1200;

        this.onStomp = function(){}
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead){
            return;
        } 
        if (us.vel.y > them.vel.y && them.solid) {
            this.bounce(us, them);
            this.onStomp(us, them);
        }
    }
}