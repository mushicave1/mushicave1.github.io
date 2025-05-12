import * as THREE from "three"


class Application {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.geo = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
        this.mat = new THREE.MeshBasicMaterial({color: 'cornflowerblue'})
        this.cube = new THREE.Mesh(this.geo, this.mat);
        this.scene.add(this.cube);
        this.camera.position.z = 5;
        this.run = this.run.bind(this);
        this.run();
    }

    run() {
        requestAnimationFrame(this.run);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}

app = new Application()