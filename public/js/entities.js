import {loadHedgehog} from './entities/hedgehog.js';
import {loadEnemy1} from './entities/enemy1.js';
import {loadEnemy2} from './entities/enemy2.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadHedgehog().then(addAs('hedgehog')),
        loadEnemy1().then(addAs('enemy1')),
        loadEnemy2().then(addAs('enemy2')),
    ])
    .then(() => entityFactories);
}