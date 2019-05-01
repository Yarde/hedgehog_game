export function createAnimation(frames, framelen){
    return function resolveFrame(distance){
        const frameIndex = Math.floor(distance / framelen % frames.length);
        const frameName = frames[frameIndex];
        return frameName;
    }
}