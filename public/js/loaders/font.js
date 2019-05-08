import {loadImage} from '../loaders.js';
import SpriteSheet from '../SpriteSheet.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.,;:$#\'!';

class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text, context, x, y) {
        [...text].forEach((char, pos) => {
            this.sprites.draw(char, context, x + pos * this.size, y);
        });
    }
}


export function loadFont() {
    return loadImage('./img/font.png')
    .then(image => {
        const fontSprite = new SpriteSheet(image);

        const size = 105;
        const rowLen = image.width;
        for (let [index, char] of [...CHARS].entries()) {
            const x = index * size % rowLen;
            const y = Math.floor(index * size / rowLen) * size;
            fontSprite.define(char, x, y, size, size);
        }

        return new Font(fontSprite, size);
    });
}