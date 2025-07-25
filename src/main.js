import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

class Application {
    constructor() {
        let canvas = document.getElementById("gl-canvas")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            100
        )
        this.camera.position.set(0, 0, 20)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.scene = new THREE.Scene()

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
        const light = new THREE.PointLight(0xFFFFFF, 400.0, 0, 2.0)
        light.position.set(10, 10, 10)
        this.scene.add(light)
        this.scene.add(ambientLight)


        const geo = new THREE.BoxGeometry(7, 5, 0.1, 10, 10, 10)
        const mat = new THREE.MeshStandardMaterial({ color: "red"})
        for (let i = -5; i < 5; ++i) {
            const mesh = new THREE.Mesh(geo, mat)
            mesh.rotation.y = 20
            mesh.position.x = i*2
            this.scene.add(mesh)
        }


        window.addEventListener("resize", this.onResize)

        this.process()
    }

    onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    process = () => {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.process)
    }
}

const app = new Application()
