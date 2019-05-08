import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 1600;
        this.deceleration = 600;
        this.dragFactor = 1/20000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        if(!entity.killable.dead){
            const absX = Math.abs(entity.vel.x);
            if(this.dir !== 0){
                entity.vel.x += this.acceleration * deltaTime * this.dir;
                if(entity.jump){
                    if(entity.jump.falling === false){
                        this.heading = this.dir;
                    }
                }else{
                    this.heading = this.dir;
                }
            }else if(entity.vel.x !== 0){
                const dec = Math.min(absX, this.deceleration*deltaTime);
                entity.vel.x += entity.vel.x > 0 ? -dec : dec;
            }else{
                this.distance = 0;
            }
            const drag = this.dragFactor * entity.vel.x * absX;
            entity.vel.x -= drag;
            this.distance += absX * deltaTime;
        }
    }
}
