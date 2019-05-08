import Keyboard from './KeyboardState.js';

export function setupKeyboard(hedgehog) {
    const input = new Keyboard();

    input.addMapping('KeyW', keyState => {
        if (keyState) {
            hedgehog.jump.start();
        } else {
            hedgehog.jump.cancel();
        }
    });

    input.addMapping('KeyD', keyState => {
        hedgehog.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('KeyA', keyState => {
        hedgehog.go.dir += -keyState ? -1 : 1;
    });

    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            hedgehog.jump.start();
        } else {
            hedgehog.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        hedgehog.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        hedgehog.go.dir += -keyState ? -1 : 1;
    });


    return input;
}
