import { Datapad } from './components/datapad/datapad';
import { createCamera } from './components/camera';
import { createLights } from './components/lights'
import { createScene } from './components/scene';
import { getEnvmap } from "./components/envmap";
import { Loop } from './systems/Loop';

import { Controls } from "./systems/controls";
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

let camera;
let renderer;
let scene;
let loop;
let envMap;

export class World {
    constructor(container) {
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
    
        const resizer = new Resizer(container, camera, renderer);
    }

    async init(container) {
        const { ambientLight, directionalLight } = createLights();
        const datapad = new Datapad();
        this.datapad = datapad;
        await datapad.init();
        envMap = await getEnvmap(renderer);
        scene.environment = envMap;

        const controls = new Controls(container, datapad);

        loop.updatables.push(datapad.get());
        scene.add(datapad.get(), ambientLight, directionalLight);
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    open() {
        this.datapad.open();
    }

    close() {
        this.datapad.close();
    }
}