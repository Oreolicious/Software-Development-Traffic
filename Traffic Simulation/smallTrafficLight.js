import {
    brakeBlock
} from "./brakeBlock.js"

function rotateAroundPoint(center, point, angle) {
    angle = angle * (Math.PI / 180);
    return new Vector2D(Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x,
        Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y)
}

class smallTLight {
    constructor(offColor, onColor, x, y, zRotation, scene) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.05);
        this.light = new THREE.Mesh(geometry, offColor);
        this.light.position.x = x;
        this.light.position.y = y;
        this.light.position.z = 0.25
        this.light.rotation.z = zRotation * (Math.PI / 180);
        scene.add(this.light)
        this.onColor = onColor;
        this.offColor = offColor;
    }
    turnOn() {
        this.light.material = this.onColor;
    }
    turnOff() {
        this.light.material = this.offColor;
    }
}

class smallTrafficLight {
    constructor(name, x, y, zRotation, scene) {
        this.isOn = false;
        this.name = name;
        this.lightBlock = this.createSmallTrafficLight(x, y, zRotation, scene)
        const greenLightPoint = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x, y + 0.3), zRotation);
        const redLightPoint = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x, y - 0.3), zRotation);
        this.greenLight = new smallTLight(new THREE.MeshBasicMaterial({
            color: 0x002800
        }), new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }), greenLightPoint.x, greenLightPoint.y, zRotation, scene);
        this.yellowLight = new smallTLight(new THREE.MeshBasicMaterial({
            color: 0x282800
        }), new THREE.MeshBasicMaterial({
            color: 0xffff00
        }), x, y, zRotation, scene);
        this.redLight = new smallTLight(new THREE.MeshBasicMaterial({
            color: 0x280000
        }), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }), redLightPoint.x, redLightPoint.y, zRotation, scene);
        this.redLight.turnOn();
        this.brakeZone = new brakeBlock(this.lightBlock, 0, -0.5, 0.8, 1, scene);
        this.brakeZone.update();
    }
    createSmallTrafficLight(x, y, zRotation, scene) {

        const geometry = new THREE.BoxGeometry(0.375, 1, 0.125);
        const material = new THREE.MeshBasicMaterial({
            color: 0x292929
        });
        let light = new THREE.Mesh(geometry, material);
        scene.add(light);
        light.position.x = x;
        light.position.y = y;
        light.position.z = 0.125
        light.rotation.z = zRotation * (Math.PI / 180);
        return light;
    }
    createSmallLights(x, y, zRotation, scene) {
        let lights = [];
        const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.10);
        const material = new THREE.MeshBasicMaterial({
            color: 0x484800
        });
        let light = new THREE.Mesh(geometry, material);
        light.position.x = x;
        light.position.y = y;
        light.position.z = 0.25
        scene.add(light)
    }
    update(num) {
        const newState = Boolean(num);
        if (this.isOn === true && newState === false) {
            this.isOn = false;
            this.greenLight.turnOff();
            this.yellowLight.turnOn();
            setTimeout(() => {
                this.yellowLight.turnOff();
                this.redLight.turnOn();
            }, 3000)
        } else if (this.isOn === false && newState === true) {
            this.isOn = true;
            this.greenLight.turnOn();
            this.redLight.turnOff();
        }
    }
}

export {
    smallTrafficLight
}