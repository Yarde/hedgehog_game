import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.time = 0;
        this.score = 0;
    }

    setPlayer(entity) {
        this.player = entity;
        this.player.killable.deadTime = 3;
    }

    givePoints(n){
        this.score += n;
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.deadTime += deltaTime;
            if(this.player.killable.deadTime > 2){
                this.player.killable.revive();
                this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
                level.entities.add(this.player);
            }   
        }else{
            this.time += deltaTime;
        }
    }
}
