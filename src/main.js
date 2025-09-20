import * as THREE from "three"
import experiences from "./xp.js"

class Application {
    constructor() {
        let canvas = document.getElementById("gl-canvas")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true})
        this.renderer.setClearColor(new THREE.Color(0xCCCCCC), 1.0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 100)
        this.camera.position.z = 20.0
        this.scene = new THREE.Scene()
        this.mouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()
 
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
        const light = new THREE.PointLight(0xFFFFFF, 400.0, 0, 2.0)
        light.position.set(10, 10, 10)
        this.scene.add(light)
        this.scene.add(ambientLight)
        const geo = new THREE.BoxGeometry(0.1, 3, 3)

        for (const [i, xp] of experiences.entries()) {
            const mat = new THREE.MeshPhysicalMaterial({ color: xp.color })
            const mesh = new THREE.Mesh(geo, mat)
            mesh.name = xp.name
            mesh.rotation.setFromVector3(new THREE.Vector3(0, -0.5, 0))
            mesh.position.x = (i * 2) - (experiences.length * 1.5)
            this.scene.add(mesh)
        }


        window.addEventListener("wheel", (event) => {
            event.preventDefault();

            this.scene.children
                .filter(child => child instanceof THREE.Mesh)
                .forEach(mesh => {
                    const distanceFromCenter = Math.abs(mesh.position.x);
                    const fadeDistance = 5.0;
                    const minOpacity = 0.2;
                    const opacity = Math.max(minOpacity, 1.0 - (distanceFromCenter / fadeDistance));
                }
            )

            const minX = Math.min(
                ...this.scene.children
                    .filter(child => child instanceof THREE.Mesh)
                    .map(mesh => mesh.position.x)
            )

            const maxX = Math.max(...this.scene.children.filter(child => child instanceof THREE.Mesh).map(mesh => mesh.position.x))

            const delta = event.deltaY;

            if (minX < 0.5 && minX > -0.5) {
                if (delta > 0) {
                    return
                }
            }

            if (maxX < 0.5 && maxX > -0.5) {
                if (delta < 0) {
                    return
                }
            }

            for (const child of this.scene.children) {
                if (child instanceof THREE.Mesh) {
                    child.position.x += delta * 0.01
                }
            }
        }, { passive: false });

        window.addEventListener("resize", this.onResize)
        window.addEventListener("mousemove", this.onMouseMove)

        this.process()
    }

    checkIntersection = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children, true);



        intersects.forEach(obj => {
            this.scene.children
                .filter(child => child instanceof THREE.Mesh)
                .forEach(mesh => {
                    if (obj.object.name == mesh.name) {
                        obj.object.material.color = new THREE.Color('limegreen')
                    } else {
                        experiences.forEach(xp => {
                            if (xp.name == mesh.name) {
                                mesh.material.color = new THREE.Color(xp.color)
                                console.log(mesh.material.color)
                            }
                        })
                    }
                })
        })
    }

    onMouseMove = () => {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.checkIntersection();
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
