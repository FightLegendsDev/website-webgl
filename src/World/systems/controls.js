import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MathUtils } from "three";

export const createControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;

    controls.tick = () => controls.update();

    return controls;
};

export class Controls {
    constructor(container, cube) {
        window.addEventListener("mousemove", (e) => {
            const res = this.calculateRotate(container, e.offsetX, e.offsetY);

            cube.setRotation(res.x, res.y);
        });
    }

    calculateRotate(container, x, y) {
        let width = container.clientWidth,
            height = container.clientHeight;
        
        let scale = 10;

        width = x * scale / width;
        height = y * scale / height;

        return {
            x: MathUtils.degToRad(width),
            y: MathUtils.degToRad(height)
        }
    }
}