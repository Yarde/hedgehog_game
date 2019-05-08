const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();
        this.keyStates.set("KeyW", 0);
        this.keyStates.set("KeyD", 0);
        this.keyStates.set("KeyA", 0);
        this.keyStates.set("ArrowUp", 0);
        this.keyStates.set("ArrowRight", 0);
        this.keyStates.set("ArrowLeft", 0);
        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                if((this.keyStates.get("KeyD") === 0 && this.keyStates.get("KeyA") === 0 && this.keyStates.get("ArrowRight") === 0 && this.keyStates.get("ArrowLeft") === 0)){
                    window.playerEnv.playerController.player.go.dir = 0;
                }
                this.handleEvent(event);
            });
        });
    }
    
}