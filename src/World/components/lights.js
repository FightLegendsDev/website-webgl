import { AmbientLight, DirectionalLight } from "three";

export const createLights = () => {
    const directionalLight = new DirectionalLight("white", 1)
    const ambientLight = new AmbientLight("white", 0)

    directionalLight.position.set(-10, 0, 10);

    return { ambientLight, directionalLight };
}