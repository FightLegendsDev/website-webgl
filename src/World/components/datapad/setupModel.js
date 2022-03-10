import {
    AnimationMixer,
    AnimationClip,
    VectorKeyframeTrack,
} from "three";

let count = 0;

const bounceAnimation = () => {
    const times = [0, 2, 4];
    const values = [
        0, 0, 0,
        0, 0.2, 0,
        0, 0, 0
    ];

    const bounceKF = new VectorKeyframeTrack("mesh.position", times, values);

    const clip = new AnimationClip("pad.bounce", -1, [bounceKF]);

    return clip;
};

export const setupModel = (data) => {
    const model = data.scene;
    const openingClip = data.animations[0];
    const bouncingClip = bounceAnimation();

    const mixer = new AnimationMixer(model);
    const openingAction = mixer.clipAction(openingClip);
    const bouncingAction = mixer.clipAction(bouncingClip);
    
    bouncingAction.play();

    model.tick = (delta) => {
        mixer.update(delta);
    };

    return { model, openingAction };
}