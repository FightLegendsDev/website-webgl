import { PMREMGenerator } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export const getEnvmap = async (renderer) => {
    const rgbeLoader = new RGBELoader();
    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const texture = await rgbeLoader.loadAsync('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr');
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    return envMap;
};