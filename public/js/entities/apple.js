import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadApple() {
    return loadSpriteSheet('apple')
    .then(createAppleFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (them.stomp) {
            us.killable.kill();
            window.playerEnv.playerController.givePoints(200);
        }
    }
}


function createAppleFactory(sprite) {
    function drawApple(context) {
        sprite.draw('apple', context, 0, 0);
    }

    return function createApple() {
        const apple = new Entity();
        apple.size.set(64, 64);
        
        apple.addTrait(new Behavior());
        apple.addTrait(new Killable());
        apple.killable.removeAfter = 0;
        apple.draw = drawApple;

        return apple;
    };
}
