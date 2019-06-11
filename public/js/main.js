import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import {createLevelLoader} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {createCollisionLayer} from './layers/collision.js';


function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(16, 600);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas){
    const context = canvas.getContext('2d');
    const camera = new Camera();
    load(context, camera);
}

async function load(context, camera){
    const [entityFactory] = await Promise.all([
        loadEntities(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    var level = await loadLevel(lvl);

    var hedgehog = entityFactory.hedgehog();
    window.playerEnv = createPlayerEnv(hedgehog);
    level.entities.add(playerEnv);
    window.playerEnv.playerController.addPlayer(level);
    var input = setupKeyboard(hedgehog);
    input.listenTo(window);
    
    level.comp.layers.push(createDashboardLayer(context, playerEnv));
    //level.comp.layers.push(createCollisionLayer(level));

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        if(level !== null){
            if (!level.entities.has(window.playerEnv.playerController.player)) {
                load(context, camera);
                return true;
            }
            level.update(deltaTime);
            camera.pos.x = Math.max(0, hedgehog.pos.x - 500);
            level.comp.draw(context, camera);
            return false;
        }     
    }

    timer.start();
}

var canvas = document.getElementById('screen');
window.lvl = '1-1';

main(canvas);