import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Stomp from '../traits/Stomp.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadHedgehog() {
    return loadSpriteSheet('hedgehog')
    .then(createHedgehogFactory);
}

function createHedgehogFactory(sprite){
    const runAnimation = sprite.animations.get('run');
    const jumpAnimation = sprite.animations.get('jump');
    const drownAnimation = sprite.animations.get('drown');
    function routeFrame(hedgehog){
        console.log(hedgehog.pos.x);
        if (hedgehog.pos.y > 848){
            hedgehog.killable.drown();
        }
        if (hedgehog.killable.drowning) {
            hedgehog.vel.x = 0;
            if(hedgehog.pos.y > 848){
                hedgehog.dir = 0;
                hedgehog.vel.y = 150;
                hedgehog.friction = 10;
                return drownAnimation(hedgehog.pos.y);
            }
            return 'drown-3';
        }
        if(hedgehog.killable.dead){
            hedgehog.vel.y = 0;
            hedgehog.vel.x = 0;
            hedgehog.dir = 0;
            return 'dead';
        }
        if(hedgehog.jump.falling){
            return jumpAnimation(hedgehog.go.distance);            
        }
        if(hedgehog.go.distance > 0){
            if((hedgehog.vel.x > 0 && hedgehog.go.dir < 0) || (hedgehog.vel.x < 0 && hedgehog.go.dir > 0)){
                return 'break';
            }
            return runAnimation(hedgehog.go.distance);
        }
        return 'idle';
    }    

    function drawHedgehog(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createHedgehog(){
        const hedgehog = new Entity();
        hedgehog.size.set(100, 100);
        hedgehog.offset.x = 14;
        hedgehog.offset.y = 28;
    
        hedgehog.addTrait(new Go());
        hedgehog.addTrait(new Jump());
        hedgehog.addTrait(new Stomp());
        hedgehog.addTrait(new Killable());
        hedgehog.addTrait(new Solid());
        hedgehog.addTrait(new Physics());
        hedgehog.killable.removeAfter = 2;
        hedgehog.draw = drawHedgehog;
    
        return hedgehog;
    }
}