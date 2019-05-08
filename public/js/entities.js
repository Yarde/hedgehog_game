import {loadHedgehog} from './entities/hedgehog.js';
import {loadPumpkin} from './entities/pumpkin.js';
import {loadSnail} from './entities/snail.js';
import {loadApple} from './entities/apple.js';
import {loadMeta} from './entities/meta.js';
import {loadPirania} from './entities/pirania.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadHedgehog().then(addAs('hedgehog')),
        loadPumpkin().then(addAs('pumpkin')),
        loadSnail().then(addAs('snail')),
        loadApple().then(addAs('apple')),
        loadMeta().then(addAs('meta')),
        loadPirania().then(addAs('pirania')),
    ])
    .then(() => entityFactories);
}