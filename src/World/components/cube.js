import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
} from 'three';

export class Cube {
    constructor() {
        const geometry = new BoxBufferGeometry(2, 2, 2);
        const material = new MeshStandardMaterial({color: "purple", roughness: 100}); 

        this.cube = new Mesh(geometry, material);
    
        this.cube.rotation.set(-0.5, -0.1, 0.8);
    }

    get() {
        return this.cube;
    }

    setRotation(x, y) {
        this.cube.rotation.x = y;
        this.cube.rotation.y = x;
    }
}