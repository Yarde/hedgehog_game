import {Sides, Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.drowning = false;
        this.deadTime = 0;
        this.removeAfter = 4;
        this.scoreForKill = function(){}
    }

    kill(){
        this.queue(() => this.dead = true);
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
        window.playerEnv.playerController.score = 0;
    }

    drown(){
        this.kill();
        this.drowning = true;
    }

    update(entity, deltaTime, level){
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity)
                });
            }
        }
    }
}
