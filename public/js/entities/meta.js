import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadMeta() {
    return loadSpriteSheet('meta')
    .then(createMetaFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (them.stomp) {
            them.killable.kill();
            them.killable.removeAfter = 0;
            if(window.lvl === '1-1'){
                window.lvl = '1-2';
                return;
            }
            if(window.lvl === '1-2'){
                //window.lvl = '1-3';
                return;
            }
            
        }
    }
}


function createMetaFactory(sprite) {
    const moveAnimation = sprite.animations.get('walk');

    function routeAnimation() {
        return 'bottom';
        return moveAnimation();
    }


    function drawMeta(context) {
        sprite.draw(routeAnimation(), context, 0, 0);
    }

    return function createMeta() {
        const meta = new Entity();
        meta.size.set(64, 64);
        
        meta.addTrait(new Behavior());
        meta.draw = drawMeta;

        return meta;
    };
}
