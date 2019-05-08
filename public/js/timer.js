export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;
            if(accumulatedTime > 1){
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                accumulatedTime -= deltaTime;
                if(this.update(deltaTime)){
                    return;
                }
            }
            lastTime = time;
            this.enqueue();
        }
    }

    stop(){

    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
