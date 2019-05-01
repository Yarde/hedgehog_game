import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Stomp from '../traits/Stomp.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1000;

export function loadHedgehog() {
    return loadSpriteSheet('hedgehog')
    .then(createHedgehogFactory);
}

function createHedgehogFactory(sprite){
    const runAnimation = sprite.animations.get('run');
    const jumpAnimation = sprite.animations.get('jump');
    function routeFrame(hedgehog){
        if (hedgehog.pos.y > 1000) {
            hedgehog.killable.kill();
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
    
    function setTurboState(turboOn){
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
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
        hedgehog.killable.removeAfter = 0;
        hedgehog.turbo = setTurboState;
        hedgehog.draw = drawHedgehog;
    
        return hedgehog;
    }
}
