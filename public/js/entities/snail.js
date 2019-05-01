import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import {loadSpriteSheet} from '../loaders.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadSnail() {
    return loadSpriteSheet('snail')
    .then(createSnailFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behavior extends Trait {
    constructor() {
        super('behavior');
        this.hideTime = 0;
        this.hideDuration = 5;
        this.walkSpeed = null;
        this.panicSpeed = 800;
        this.state = STATE_WALKING;
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (them.killable.dead) {
            return;
        }
        if (us.pos.y > 1000) {
            us.killable.kill();
        }
        if (them.stomp) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }
        }   
        if(this.state === STATE_PANIC && them.killable && them.pendulumMove){
            them.killable.kill();
            them.pendulumMove.speed = 0;
            them.vel.set(100, -200);
            them.solid.obstructs = false;
            window.playerEnv.playerController.givePoints(50);
        }
    }

    handleNudge(us, them) {
        if (this.state === STATE_WALKING) {
            them.killable.kill();
        } else if (this.state === STATE_HIDING) {
            this.panic(us, them);
        } else if (this.state === STATE_PANIC) {
            const travelDir = Math.sign(us.vel.x);
            const impactDir = Math.sign(us.pos.x - them.pos.x);
            if (travelDir !== 0 && travelDir !== impactDir) {
                them.killable.kill();
            }
        }
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if (this.state === STATE_HIDING) {
            this.hide(us);
            // us.killable.kill();
            // us.vel.set(100, -200);
            // us.solid.obstructs = false;
        } else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }

    hide(us) {
        us.vel.x = 0;
        us.pendulumMove.enabled = false;
        if (this.walkSpeed === null) {
            this.walkSpeed = us.pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING
    }

    unhide(us) {
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.walkSpeed;
        this.state = STATE_WALKING;
    }

    panic(us, them) {
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
    }
}


function createSnailFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    const wakeAnim = sprite.animations.get('wake');

    function routeAnim(snail) {
        if (snail.behavior.state === STATE_HIDING) {
            if (snail.behavior.hideTime > 3) {
                return wakeAnim(snail.behavior.hideTime);
            }
            return 'hiding';
        }

        if (snail.behavior.state === STATE_PANIC) {
            return 'hiding';
        }

        return walkAnim(snail.lifetime);
    }

    function drawSnail(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createSnail() {
        const snail = new Entity();
        snail.size.set(128, 128);
        snail.offset.y = 0;

        snail.addTrait(new PendulumMove());
        snail.addTrait(new Killable());
        snail.addTrait(new Behavior());
        snail.addTrait(new Solid());
        snail.addTrait(new Physics());

        snail.draw = drawSnail;

        return snail;
    };
}
