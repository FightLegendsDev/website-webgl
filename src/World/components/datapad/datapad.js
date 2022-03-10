import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel';
import { MathUtils, LoopOnce } from "three";

const gltfLoader = new GLTFLoader();

const defaultRotationY = MathUtils.degToRad(10);

export class Datapad {
    constructor(pmremGenerator) {
        this.count = 0;
        this.pmremGenerator = pmremGenerator;
    }

    async init() {
        this.padData = await gltfLoader.loadAsync("/src/assets/models/FL_Datapad_Fresh.glb");
        const { model, openingAction } = setupModel(this.padData);
        this.datapad = model;
        this.openingAction = openingAction;
        this.datapad.rotation.y = defaultRotationY;
    }

    get() {
        return this.datapad;
    }

    setRotation(x, y) {
        this.datapad.rotation.x = y;
        this.datapad.rotation.y = defaultRotationY + x;
    }

    open() {
        this.openingAction.reset();
        this.openingAction.clampWhenFinished = true;
        this.openingAction.timeScale = 1;
        this.openingAction.setLoop(LoopOnce, 1);
        this.openingAction.play();
    }

    close() {
        this.openingAction.timeScale = -1;
        this.openingAction.paused = false;
    }
}