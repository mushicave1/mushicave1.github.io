import * as THREE from "three"

const experiences = [
    { name: "c++" },
    { name: "go" },
    { name: "ts" },
    { name: "react" },
    { name: "bazel" },
    { name: "vulkan" },
    { name: "image-processing" },
    { name: "server" },
    { name: "yocto-linux" },
    { name: "qt" },
    { name: "c#" },
    { name: "wpf-gui" },
    { name: "visual-studio" },
    { name: "cmake" },
    { name: "directX" },
    { name: "networking" },
    { name: "scripting" },
    { name: "swift" },
    { name: "metal" },
    { name: "xcode" },
    { name: "c" },
    { name: "makefile" },
    { name: "cpu-graphics-pipeline" },
    { name: "cpu-raytracing" },
    { name: "rust" },
    { name: "stm32" }
]


class Application {
    constructor() {
        let canvas = document.getElementById("gl-canvas")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true})
        this.renderer.setClearColor(new THREE.Color(0x138f63), 1.0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 0.1, 10)

        this.scene = new THREE.Scene()

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
        const light = new THREE.PointLight(0xFFFFFF, 400.0, 0, 2.0)
        light.position.set(10, 10, 10)
        this.scene.add(light)
        this.scene.add(ambientLight)
        const geo = new THREE.BoxGeometry(50, 50, 50)
        const mat = new THREE.MeshStandardMaterial({ color: "red"})

        let projectsContainer = document.getElementById("projects-container")
        for (const [i, xp] of experiences.entries()) {
            const exp = document.createElement("div")
            exp.className = "xp"
            exp.textContent = xp.name
            projectsContainer.appendChild(exp)

            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.x = i * 20
            mesh.position.y = i * 20
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
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.process)
    }
}

const app = new Application()
