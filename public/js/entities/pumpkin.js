import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import {loadSpriteSheet} from '../loaders.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadPumpkin() {
    return loadSpriteSheet('pumpkin')
    .then(createPumpkinFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (us.pos.y > 1000) {
            us.killable.kill();
        }
        if (them.stomp) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
                window.playerEnv.playerController.givePoints(100);
            } else {
                them.killable.kill();
            }
        }
    }
}


function createPumpkinFactory(sprite) {
    const moveAnimation = sprite.animations.get('walk');

    function routeAnimation(pumpkin) {
        if (pumpkin.killable.dead) {
            return 'flat';
        }

        return moveAnimation(pumpkin.lifetime);
    }

    function drawPumpkin(context) {
        sprite.draw(routeAnimation(this), context, 0, 0);
    }

    return function createPumpkin() {
        const pumpkin = new Entity();
        pumpkin.size.set(128, 128);

        pumpkin.addTrait(new PendulumMove());
        pumpkin.addTrait(new Behavior());
        pumpkin.addTrait(new Killable());
        pumpkin.addTrait(new Solid());
        pumpkin.addTrait(new Physics());

        pumpkin.draw = drawPumpkin;

        return pumpkin;
    };
}
