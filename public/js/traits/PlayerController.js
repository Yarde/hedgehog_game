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

    addPlayer(level){
        this.player.killable.revive();
        this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
        level.entities.add(this.player);
    }

    update(entity, deltaTime, level) {
        this.time += deltaTime;
    }
}
