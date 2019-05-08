import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import {loadSpriteSheet} from '../loaders.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadPirania() {
    return loadSpriteSheet('pirania')
    .then(createPiraniaFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }
        if (them.stomp) {
            them.killable.drown();
        }
    }

    update(us, deltaTime) {
    }
}


function createPiraniaFactory(sprite) { 
    function routeAnim(pirania) {

        if(pirania.pos.y > 900){
            pirania.vel.y = 0;
        }

        if (Math.floor(pirania.lifetime % pirania.i) === 0) {
            if(pirania.pendulumMove.dir === 1){
                pirania.pendulumMove.speed = 1;
            }else{
                pirania.pendulumMove.speed = -1;
            }
            pirania.vel.y = -400;  
        }else if(pirania.pos.y > 800){
            if(pirania.pendulumMove.dir === 1){
                pirania.pendulumMove.speed = 100;
            }else{
                pirania.pendulumMove.speed = -100;
            }
        }
        if(pirania.pos.y < 800){
            if(pirania.vel.y > 0){
                return 'jump-3';
            }
            if(pirania.vel.y < 0){
                return 'jump-1';
            }
        }else{
            return 'swim';
        }
    }

    function drawPirania(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createPirania() {
        const pirania = new Entity();
        pirania.size.set(90, 90);
        pirania.offset.y = 25;
        pirania.offset.x = 25;

        pirania.addTrait(new PendulumMove());
        pirania.addTrait(new Behavior());
        pirania.addTrait(new Solid());
        pirania.addTrait(new Physics());
        pirania.i = Math.floor(Math.random() * 8) + 3;
        

        pirania.draw = drawPirania;

        return pirania;
    };
}
