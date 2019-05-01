import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import {loadSpriteSheet} from '../loaders.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadEnemy1() {
    return loadSpriteSheet('enemy1')
    .then(createEnemy1Factory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
        this.id = 1;
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (us.pos.y > 200) {
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


function createEnemy1Factory(sprite) {
    const moveAnimation = sprite.animations.get('walk');

    function routeAnimation(enemy1) {
        if (enemy1.killable.dead) {
            return 'flat';
        }

        return moveAnimation(enemy1.lifetime);
    }

    function drawEnemy1(context) {
        sprite.draw(routeAnimation(this), context, 0, 0);
    }

    return function createEnemy1() {
        const enemy1 = new Entity();
        enemy1.size.set(16, 16);

        enemy1.addTrait(new PendulumMove());
        enemy1.addTrait(new Behavior());
        enemy1.addTrait(new Killable());
        enemy1.addTrait(new Solid());
        enemy1.addTrait(new Physics());

        enemy1.draw = drawEnemy1;

        return enemy1;
    };
}
