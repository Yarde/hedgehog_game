import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {createCollisionLayer} from './layers/collision.js';


function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(16, 800);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas){
    const context = canvas.getContext('2d');
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel(lvl);
    const camera = new Camera();

    var hedgehog = entityFactory.hedgehog();
    window.playerEnv = createPlayerEnv(hedgehog);
    level.entities.add(playerEnv);

    //level.comp.layers.push(createDashboardLayer(font, playerEnv));
    //level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(hedgehog);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        camera.pos.x = Math.max(0, hedgehog.pos.x - 500);
        level.comp.draw(context, camera);
    }

    timer.start();
}

const canvas = document.getElementById('screen');
var lvl = '1-2';

main(canvas);